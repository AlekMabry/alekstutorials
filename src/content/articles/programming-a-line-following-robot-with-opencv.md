---
title: Programming a Line Following Robot with OpenCV
slug: line-following-robot-with-opencv
date: '2016.09'
keywords: ['OpenCV', 'Robot', 'Line']
tags: ['BeagleBone', 'OpenCV', 'Python']
description: Learn how to use UDP through the robot’s network to communicate
  with the BeagleBone from the RoboRIO.
thumb: images/uploads/line_following_robot_thumb.jpg
collection: articles
---
# Supplies
- A BeagleBone running Debian
- Mini USB cable
- USB Webcam
- L293D motor driver IC
- 7805 voltage regulator
- Breadboard
- Power switch
- Battery pack greater than 7 volts
- Lots of wires

# Connecting to the BeagleBone
For these next steps you need access to the BeagleBone’s terminal. This is commonly done through the Cloud9 or SSH interface. Cloud9 is a web interface that provides an IDE and terminal. Alternatively if you have X server installed on your computer, you can X forward through SSH to view live OpenCV output from the BeagleBone, which is what I will use for this tutorial.

Plug in the webcam before you power on the BeagleBone, then connect the BeagleBone to your computer. On Windows you will need to use PuTTY to X forward through SSH, however on MacOS and Linux you can use the following command:
```
you@your-computer:~$ ssh -X debian@192.168.7.2
```

The default BeagleBone username is `debian` and the password is `temppwd`.

# Writing the Line Tracking Program
Make a new directory for the project:
```
debian@192.168.7.2:~$ mkdir lineFollower
```

To enter the directory use:
```
debian@192.168.7.2:~$ cd lineFollower
```

Now make the python file `lineTracker.py`:
```
debian@192.168.7.2:~/lineFollower$ nano lineTracker.py
```

Face your camera at a white background, then wave a black object in front of the screen. It should show the largest black blob detected with it's center coordinates shown by two blue lines. In the terminal it should be outputting `Turn Left` or `Turn Right` depending on the horizontal offset of the "line" from the center.

You can end the program by pressing `q` or holding `ctrl+c`.

# How the Program Works
Let's break it down.

Start by importing required libraries. `numpy` is the math library and `cv2` is OpenCV.
```
import numpy as np
import cv2
```

Next, setup the video feed. A particular camera can be selected, but in this tutorial `-1` will be used to select the first available camera. To decrease the computation required, a resolution of `160 x 120` will be used.
```
video_capture = cv2.VideoCapture(-1)
video_capture.set(3, 160)
video_capture.set(4, 120)
```

Start a loop:
```
while (True):
```

Now capture the current frame and crop it. This is so that the program is only analyzing the segment of line closest to the camera.
```
    # Capture the frames
    ret, frame = video_capture.read()

    # Crop the image to the bottom half of the initial frame
    crop_img = frame[60:120, 0:160]
```

Since we are looking for black lines on a white surface, the image can be converted to grayscale. Next a gaussian blur is applied to eliminate noise from the image.
```
    # Convert to grayscale
    gray = cv2.cvtColor(crop_img, cv2.COLOR_BGR2GRAY)

    # Gaussian blur
    blur = cv2.GaussianBlur(gray,(5,5),0)
```

Next we will threshold the image to create a binary image. Any pixel below a value of 60 (dark) will become white (true), and any color above that will become black (false).
```
    # Color thresholding
    ret,thresh = cv2.threshold(blur,60,255,cv2.THRESH_BINARY_INV)
```

Now we need to detect the continuous blobs of white pixels to find their center. This can be done with `cv2.findContours()`. This operation can be destructive to the image, so a copy of the image will be given instead.
```
    # Find the contours of the frame
    contours, hierarchy = cv2.findContours(thresh.copy(), 1, cv2.CHAIN_APPROX_NONE)
```

Now we sort the contours to find the largest blob which should be our line, then calculate the coordinate of it's center.
```
    # Find the biggest contour (if detected)
    if len(contours) > 0:
    c = max(contours, key=cv2.contourArea)
    M = cv2.moments(c)

    cx = int(M['m10']/M['m00'])
    cy = int(M['m01']/M['m00'])
```

For debugging purposes, draw the contours and crosshair onto the initial cropped image:
```
        cv2.line(crop_img,(cx,0),(cx,720),(255,0,0),1)
        cv2.line(crop_img,(0,cy),(1280,cy),(255,0,0),1)
        cv2.drawContours(crop_img, contours, -1, (0,255,0), 1)
```

Now the robot calculates if it should turn to remain on track with the line:
```
        if cx >= 120:
            print("Turn Left!")

        if cx < 120 and cx > 50:
            print("On Track!")

        if cx <= 50:
            print("Turn Right")
```

And if the robot does not see the line:
```
    else:
        print("I don't see the line!")
```

Last but not least, display the resulting frame:
```
    # Display the resulting frame
    cv2.imshow('frame',crop_img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```

# Wiring the Robot
Start by setting up the power source. Use a `7805` voltage regulator to regulate the voltage to 5V. The `7805` requires an input voltage greater than 7V to regulate down to 5V, so be sure to use a battery pack of appropriate size.



This robot will use a `L293D` motor driver chip, here are the pinouts of the chip:

Next attach the motors and `L293D` motor driver:

Then add the BeagleBone:

# Assembling the Robot
## Adding Motor Control to the Tracking Program
Create `lineFollower_withMotors.py`:
```
debian@192.168.7.2:~/lineFollower$ nano lineFollower_withMotors.py
```

Paste this code into the editor `ctrl+shift+v`.
```
import numpy as np
import cv2
import Adafruit_BBIO.GPIO as GPIO

video_capture = cv2.VideoCapture(-1)
video_capture.set(3, 160)
video_capture.set(4, 120)

# Setup Output Pins

#Left Forward
GPIO.setup("P8_10", GPIO.OUT)

#Right Forward
GPIO.setup("P9_11", GPIO.OUT)

GPIO.output("P8_10", GPIO.HIGH)
GPIO.output("P9_11", GPIO.HIGH)

while (True):
    # Capture the frames
    ret, frame = video_capture.read()

    # Crop the image
    crop_img = frame[60:120, 0:160]

    # Convert to grayscale
    gray = cv2.cvtColor(crop_img, cv2.COLOR_BGR2GRAY)

    # Gaussian blur
    blur = cv2.GaussianBlur(gray,(5,5),0)

    # Color thresholding
    ret,thresh1 = cv2.threshold(blur,60,255,cv2.THRESH_BINARY_INV)

    # Find the contours of the frame
    contours,hierarchy = cv2.findContours(mask.copy(), 1, cv2.CHAIN_APPROX_NONE)

    # Find the biggest contour (if detected)
   if len(contours) > 0:
        c = max(contours, key=cv2.contourArea)
        M = cv2.moments(c)

        cx = int(M['m10']/M['m00'])
        cy = int(M['m01']/M['m00'])

        cv2.line(crop_img,(cx,0),(cx,720),(255,0,0),1)
        cv2.line(crop_img,(0,cy),(1280,cy),(255,0,0),1)

        cv2.drawContours(crop_img, contours, -1, (0,255,0), 1)

        if cx >= 120:
            GPIO.output("P8_10", GPIO.HIGH)
            GPIO.output("P9_11", GPIO.LOW)

        if cx < 120 and cx > 50:
            GPIO.output("P8_10", GPIO.LOW)
            GPIO.output("P9_11", GPIO.LOW)

        if cx <= 50:
            GPIO.output("P8_10", GPIO.LOW)
            GPIO.output("P9_11", GPIO.HIGH)

    else:
        GPIO.output("P8_10", GPIO.HIGH)
        GPIO.output("P9_11", GPIO.HIGH)

    #Display the resulting frame
    cv2.imshow('frame',crop_img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```

You can exit the Nano editor by pressing `ctrl+x` then `y`.

Now you can run the program with:
```
debian@192.168.7.2:~/lineFollower$ python lineFollower_withMotors.py
```

Now put your robot on the test track and watch it go! If you find that your robot is spinning circles then simply flip the polarity of your motor wires. Here is some footage of my robot following a track:
