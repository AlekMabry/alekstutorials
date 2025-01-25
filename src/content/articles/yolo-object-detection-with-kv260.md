---
title: YOLO Object Detection with Vitis-AI
slug: yolo-object-detection-with-vitis-ai
date: '2025.01'
keywords: ['Kria', 'KV260', 'yolo']
tags: ['Kria', 'KV260', 'yolo']
description: DarkNet YOLO Object Detection on the Kria KV260
thumb: images/uploads/vitis_ai_inference.jpg
collection: articles
---
![Inference with Vitis-AI](images/uploads/vitis_ai_inference.jpg)

I recently developed an object detection model that runs on a Kria KV260
for a senior design project. The KV260 supports the AMD Deep Learning Processor
Unit (DPU), which is a programmable engine dedicated for convolutional neural
networks. It runs on the Kria's FPGA to accelerate neural networks.

This tutorial demonstrates how to adapt a YOLO (You Only Look Once) object
detection model to run on the DPU using Vitis-AI tools.

## Training the Model
YOLOv3-tiny and YOLOv4-tiny are excellent object detection models for embedded
systems that require fast inference time. I annotated the training set and 
trained the model in WSL, which comes pre-installed with CUDA support.

Install the following tools:
* [hank-ai/DarkNet](https://github.com/hank-ai/darknet) - Open source neural network framework written in C, C++, and CUDA.
* [stephanecharette/DarkMark](https://github.com/stephanecharette/DarkMark) - GUI tool used to annotate images for use in neural networks.
* [stephanecharette/DarkHelp](https://github.com/stephanecharette/DarkHelp) - C++ API is a wrapper to make it easier to use the Darknet neural network framework within a C++ application.

Detailed model training instructions are available on [Stephane Charette's YouTube Channel](https://www.youtube.com/@StephaneCharette) and the [DarkMark documentation website](https://www.ccoderun.ca/darkmark/).

## Vitis-AI Container
I use the Docker container provided by Xilinx to prepare the model for the DPU.

```bash
$ docker pull xilinx/vitis-ai-tensorflow2-cpu:ubuntu2004-3.5.0.300
$ sudo docker run -it -v ./:/workspace/ xilinx/vitis-ai-tensorflow2-cpu:ubuntu2004-3.5.0.300
```
* This `docker run` command is configured to mount the current directory (`./`) to
  `/workspace/` in the container.
* The Vitis-AI Docker container does not come with command-line file editing tools.
  However, you can use an IDE of your choice to edit files in the mounted directory
  while the Docker container is running.

## Convert DarkNet to Keras Weights
Download the DarkNet to Keras converter:

```bash
$ git clone https://github.com/david8862/keras-YOLOv3-model-set
```

In the Vitis-AI Docker container, run the conversion script:

```bash
vitis-ai-user@7f8a6ed89601:/workspace$ cd keras-YOLOv3-model-set
vitis-ai-user@7f8a6ed89601:/workspace/keras-YOLOv3-model-set$ conda activate vitis-ai-tensorflow2
(vitis-ai-tensorflow2) vitis-ai-user@7f8a6ed89601:/workspace/keras-YOLOv3-model-set$ python tools/model_converter/convert.py --yolo4_reorder ../model.cfg ../model.weights ../model.h5
```

If it is a YOLOv3 model, remove the `--yolo4_reorder` argument.

## Quantization
The weights must be converted from floating-point to fixed point to run on
the DPU ([Vitis AI User Guide UG141 - Quantizing with Float Scale](https://docs.amd.com/r/en-US/ug1414-vitis-ai/Quantizing-with-Float-Scale)).
The quantizer requires an unlabelled set of verification images to refine the
weights. The image set should have the same preprocessing as the preprocessing
used to train the model. This means that RGB values should be scaled from `[0, 255]`
to `[0.0, 1.0]`.

`Quantize.py`:
```python
import os
import sys
import tensorflow as tf
import numpy as np
from tensorflow import keras

calib_dataset_raw = keras.utils.image_dataset_from_directory(
    '/darknet_project_path/darkmark_image_cache/resize',
    labels=None,
    label_mode=None,
    class_names=None,
    color_mode="rgb",
    batch_size=32,
    image_size=(96, 160),    # Height, Width
    shuffle=True,
    seed=None,
    validation_split=None,
    subset=None,
    interpolation="bilinear",
    follow_links=False,
    crop_to_aspect_ratio=False
)

# Normalize inputs
normalization_layer = tf.keras.layers.Rescaling(1./255)
normalized_ds = calib_dataset_raw.map(lambda x: normalization_layer(x))

model = tf.keras.models.load_model('model.h5')

from tensorflow_model_optimization.quantization.keras import vitis_quantize

quantizer = vitis_quantize.VitisQuantizer(
	model,
	quantize_strategy='pof2s',
	custom_quantize_strategy=None,
	custom_objects={})

quantized_model = quantizer.quantize_model(
	calib_dataset=calib_dataset, 
        calib_steps=100, 
        calib_batch_size=10) 

quantized_model.save('model_quantized.h5')
```

To run `Quantize.py` in the Docker container:
```
vitis-ai-user@7f8a6ed89601:/workspace$ conda activate vitis-ai-tensorflow2
(vitis-ai-tensorflow2) vitis-ai-user@7f8a6ed89601:/workspace$ python Quantize.py
```

## Determine DPU Target Architecture
The Vitis-AI compiler expects an `arch.json` file describing the target
DPU. The Vitis-AI container comes with the `arch.json` for various
development boards:

```
vitis-ai-user@7f8a6ed89601$ ls /opt/vitis_ai/compiler/arch/
```

These `arch.json` files are for the Vitis-AI 3.5 DPU architectures, however you
may be running an older DPU on your development board. To determine the
DPU on my KV260, I first loaded the DPU bitstream onto the FPGA with:

```
ubuntu@kria:~/$ sudo xmutil unloadapp
ubuntu@kria:~/$ sudo xmutil loadapp kv260-smartcam
```
(See [Setting Up the Board and Application Deployment](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/docs/app_deployment.html)
for installing the KV260 smartcam firmware).

Then to determine the DPU fingerprint:
```
ubuntu@kria:~/$ xdputil query
```

```
WARNING: Logging before InitGoogleLogging() is written to STDERR
E0124 21:15:15.030138  9836 xdputil_query.cpp:182] Unsupported platform fingerprint: 0, cu_idx: 1
{
    "DPU IP Spec":{
        "DPU Core Count":2,
        "IP version":"v4.0.0",
        "generation timestamp":"2022-05-11 13-30-00",
        "git commit id":"9bf4ccf",
        "git commit time":2022051113,
        "regmap":"1to1 version"
    },
    "VAI Version":{
        "libvart-runner.so":"Xilinx vart-runner Version: 2.5.0-  2022-07-20-17:13:58 ",
        "libvitis_ai_library-dpu_task.so":"Xilinx vitis_ai_library dpu_task Version: 2.5.0-  2022-07-15 16:21:46 [UTC] ",
        "libxir.so":"Xilinx xir Version: xir- 2022-07-20-17:06:45",
        "target_factory":"target-factory.2.5.0 d02dcb6041663dbc7ecbc0c6af9fafa087a789de"
    },
    "kernels":[
        {
            "DPU Arch":"DPUCZDX8G_ISA1_B3136",
            "DPU Frequency (MHz)":300,
            "IP Type":"DPU",
            "Load Parallel":2,
            "Load augmentation":"enable",
            "Load minus mean":"disable",
            "Save Parallel":2,
            "XRT Frequency (MHz)":300,
            "cu_addr":"0xa0010000",
            "cu_handle":"0xaaaadc900900",
            "cu_idx":0,
            "cu_mask":2,
            "cu_name":"DPUCZDX8G:DPUCZDX8G_1",
            "device_id":0,
            "fingerprint":"0x101000016010406",
            "name":"DPU Core 0"
        },
        {
            "DPU Arch":"",
            "cu_addr":"0xa0020000",
            "cu_handle":"0xaaaadc928400",
            "cu_idx":1,
            "cu_mask":1,
            "cu_name":"pp_pipeline_accel:pp_pipeline_accel_1",
            "device_id":0,
            "fingerprint":"0x0",
            "name":"DPU Core 1"
        }
    ]
}
```

The `arch.json` for this platform would be:
```
{
    "fingerprint":"0x101000016010406"
}
```

## Compile
The model can then be compiled with:
```
vitis-ai-user@7f8a6ed89601$ vai_c_tensorflow2 -m model_quantized.h5 --options '{"input_shape":"1,<height>,<width>,3"}' --arch arch.json --output_dir model_name --net_name model_name
```

## Model Configuration
A configuration file needs to be created for Vitis runtime.

`model_name.prototxt` template:
```
model {
  name: "model_name"
  kernel {
     name: "model_name"
     mean: 0.0
     mean: 0.0
     mean: 0.0
     scale: 0.00390625
     scale: 0.00390625
     scale: 0.00390625
  }
  model_type : YOLOv3
  yolo_v3_param {
    num_classes: 1
    anchorCnt: 3
    layer_name: "9"
    layer_name: "12"
    layer_name: "15"
    conf_threshold: 0.3
    nms_threshold: 0.45
    biases: 48
    biases: 10
    biases: 20
    biases: 29
    biases: 11
    biases: 64
    biases: 26
    biases: 39
    biases: 34
    biases: 46
    biases: 65
    biases: 36
    biases: 43
    biases: 63
    biases: 66
    biases: 78
    biases: 119
    biases: 83
    test_mAP: false
  }
  is_tf : true
}
```
The `model_type` should be YOLOv3 for both YOLOv3 and YOLOv4 models.

The mean/scale is for image preprocessing. To convert input 8-bit BGR to
`[0.0, 1.0]` range, the scale would be `1.0/255.0 = 0.00390625`.

The layer names are the output layer names. These can be found with:

```
vitis-ai-user@7f8a6ed89601$ xir subgraph model_name.xmodel | grep DPU
```

The results will look something like:

```
subgraph_quant_concatenate [device=DPU,fingerprint=0x101000016010406,DPU=DPUCZDX8G_ISA1_B3136_0101000016010406,
I=[xir_tensor{quant_image_input:(1,128,224,3), fixpos=6 # of elements= 86016}],
O=[xir_tensor{quant_conv2d_9_fix:(1,4,7,18), fixpos=2 # of elements= 504},
xir_tensor{quant_conv2d_12_fix:(1,8,14,18), fixpos=2 # of elements= 2016},
xir_tensor{quant_conv2d_15_fix:(1,16,28,18), fixpos=2 # of elements= 8064}]]
```

In this example, the output layers would be `"9"`, `"12"`, and `"15"`.

## Run Inference on the KV260
Copy `model_name.prototxt` and `model_name.xmodel` to
`/usr/share/vitis_ai_library/models/model_name/` on your development board.

Install the following:

```
ubuntu@kria$ sudo apt-get install libopencv-dev cmake
```

`inference.cpp`:
```cpp
#include <opencv2/core.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/imgcodecs.hpp>

#include <vitis/ai/yolov3.hpp>
#include <vitis/ai/nnpp/yolov3.hpp>

#include <chrono>
#include <string>
#include <stdio.h>

int main(int argc, const char* argv[])
{
    auto model = vitis::ai::YOLOv3::create(argv[1]);
    auto image = cv::imread(argv[2]);

    auto start = std::chrono::high_resolution_clock::now();
    auto results = model->run(image);
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double, std::milli> elapsed = end - start;

    for(auto &box : results.bboxes)
    {
        int label = box.label;
        float xmin = box.x * image.cols + 1;
        float ymin = box.y * image.rows + 1;
        float xmax = xmin + box.width * image.cols;
        float ymax = ymin + box.height * image.rows;
        if(xmin < 0.) xmin = 1.;
        if(ymin < 0.) ymin = 1.;
        if(xmax > image.cols) xmax = image.cols;
        if(ymax > image.rows) ymax = image.rows;
        float confidence = box.score;
        if (label > -1)
        {
             cv::rectangle(image, cv::Point(xmin, ymin), cv::Point(xmax, ymax), cv::Scalar(0, 0, 255), 2, 2, 0);
             char buffer[50];
             sprintf(buffer, "Class: %d, Conf: %.2f", label, confidence);
             cv::putText(image, buffer, cv::Point(xmin, ymin-10), cv::FONT_HERSHEY_DUPLEX, 1.0, cv::Scalar(0, 0, 255), 2);
        }
    }

    char buffer[50];
    sprintf(buffer, "%.2fms", elapsed.count());
    cv::putText(image, buffer, cv::Point(64, 64), cv::FONT_HERSHEY_DUPLEX, 1.0, cv::Scalar(0, 0, 255), 2);

    cv::imwrite("out.jpg", image);
}
```

`CMakeLists.txt`:
```cmake
cmake_minimum_required(VERSION 3.10)
project(Inference)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(OpenCV REQUIRED)

include_directories(${OpenCV_INCLUDE_DIRS} include)

add_executable(${PROJECT_NAME} inference.cpp)

target_link_libraries(${PROJECT_NAME}
    vitis_ai_library-yolov3
    vitis_ai_library-dpu_task
    vitis_ai_library-xnnpp
    vitis_ai_library-model_config
    vitis_ai_library-math
    vart-util
    xir
    pthread
    ${OpenCV_LIBS}
)
```

To build:

```bash
ubuntu@kria:~/$ mkdir build
ubuntu@kria:~/$ cd build
ubuntu@kria:~/build/$ cmake ..
ubuntu@kria:~/build/$ make -j4
```

To run inference on a test image:

```bash
ubuntu@kria:~/build/$ sudo xmutil unloadapps
ubuntu@kria:~/build/$ sudo xmutil loadapp kv260-smartcam
ubuntu@kria:~/build/$ ./Inference model_name input.jpg
```

The program will output `out.jpg`.