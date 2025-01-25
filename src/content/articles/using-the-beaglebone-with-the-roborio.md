---
title: Using the BeagleBone with the RoboRIO
slug: beaglebone-communicate-with-roborio
date: '2017.02'
keywords: ['RoboRIO', 'BeagleBone', 'UDP']
tags: ['BeagleBone', 'Java', 'Python']
description: Learn how to use UDP through the robot’s network to communicate
  with the BeagleBone from the RoboRIO.
thumb: images/uploads/beaglebone_with_roborio_thumb.jpg
collection: articles
---
Embedded devices such as BeagleBones are often used in FRC to handle computer vision while the RoboRIO controls the robot. In this tutorial we will create a framework for a RoboRIO to request data from a BeagleBone through the robot’s onboard router. While this tutorial covers the programming aspects, please be sure to check the yearly documentation on how to correctly setup these devices, as the router may act differently when connected to the competition network.

# Setup

Connect both the RoboRIO and the BeagleBone to the router with ethernet cables. If you are using the BeagleBone for computer vision applications be sure that the USB webcam is connected the BeagleBone before powering on the system. To program and control the devices, connect your computer to the router through WIFI or tether in with an ethernet cable. I prefer using ethernet so that I can still access the internet over WIFI while programming.

# Sending Requests from the RoboRIO to the BeagleBone with UDP

Let’s create a RoboRIO program that sends a request to the BeagleBone, then receives the returned message. The BeagleBone will always have an IP of `beaglebone.local`, and the RoboRIO will use `RoboRIO-####-FRC.local`, where `####` is your team number.

Let's start with the imports:

```java
import java.io.*;
import java.net.*;
```

In the Robot class:

```java
// Buffers
DatagramSocket serverSocket;
byte[] receiveData;
byte[] sendData;
```

In robotInit():

```java
// Setup the BeagleBone Communications
try {
    serverSocket = new DatagramSocket(3641);    //Choose a port for your BeagleBone to send packets to!
} catch (SocketException e) {
    e.printStackTrace();
}
receiveData = new byte[256];
sendData = new byte[256];
```

To send data:

```java
// Send Data
InetAddress IPAddress = InetAddress.getByName("beaglebone.local");
int port = 3641;
String requestValue = "0";
sendData = requestValue.getBytes();
DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, IPAddress, port);
try {
    serverSocket.send(sendPacket);
} catch (IOException e) {
    e.printStackTrace();
}
```

To receive data:

```java
// Receive Data
DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
try {
    serverSocket.receive(receivePacket);
} catch (IOException e) {
    e.printStackTrace();
}
String incoming = new String(receivePacket.getData());
String[] parts = sentence.split(" ");
String part1_raw = parts[0];
double part1_double = Double.parseDouble(part1_raw);
System.out.println("RECEIVED: " + part1_raw);
```

This receiving code splits the incoming message by spaces. This is useful for sending several different variable values at a time (just add spaces!).

Occasionally the UDP packets will contain the message but with extra filler characters to fill the set buffer size. Programs like PyCharm and IntelliJ will show these characters when the message output is printed, however the driver station will not show them. These filler characters make it impossible to do a string compare. By adding a space to the end of the message, the split() function can then separate the content from these filler characters.

![Received UDP message with null characters after.](images/uploads/garbled_udp.jpg)

# Connecting to the BeagleBone

For these next steps you need access to the BeagleBone’s terminal. This is commonly done through the Cloud9 or SSH interface. Cloud9 is a web interface that provides an IDE and terminal. Alternatively if you have X server installed on your computer, you can SSH with X to view live OpenCV output from the BeagleBone.

To use the Cloud9 IDE, make sure you are connected to the router and visit this URL in your browser:
```bash
beaglebone.local:3000
```
On MacOS and Linux you can connect with SSH using the following command. Remove the `-X` option for a regular SSH connection without X window viewing capabilities. The password for the default user `debian` is `temppwd`.
```bash
you@your-computer:~$ ssh -X debian@beaglebone.local
```

# Responding to Requests from the RoboRIO over UDP
The BeagleBone program will be written in Python. This code will wait for a request packet from the RoboRIO, then runs the associated OpenCV algorithm and returns it’s output over UDP.

Python, NumPy, and OpenCV should be installed by default.

Create `VisionCore.py`, either through the terminal or with the Cloud9 IDE.
```
debian@beaglebone.local:~$ nano VisionCore.py
```
To exit the Nano editor you hold `ctrl+x`, then press `y` to save the file.

This program is fairly simple:
```python
import numpy as np
import cv2
import sys
import time
import socket

import LineFollower  #This would be the file with the openCV function you would like to run
video_capture = cv2.VideoCapture(-1)
video_capture.set(3, 160)
video_capture.set(4, 120)

#OpenCV takes some time to turn on the camera when taking the first frame, so we do this before the UDP code starts so that your robot doesn't spend precious autonomous time starting the video feed
ret, frame = video_capture.read()

#Set this to 1 if you would like to see the video feed
showVideo = 0

UDP_IP = "0.0.0.0"
UDP_PORT = 3641

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((UDP_IP, UDP_PORT))

while(True):
    data, addr = sock.recvfrom(256)
    #data = data.split(" ") (use this if you expect to get multiple arguments at a time)
    print "Incoming: " + data

    if data == "0":
        ret, frame = video_capture.read()
        sendData = LineFollower.lineOffset(ret, frame)

    if data == "1":
        ret, frame = video_capture.read()
        #sendData = moreOpenCVCode.function(ret, frame)

    if data == "2":
        ret, frame = video_capture.read()
        #sendData = moreOpenCVCode.function(ret, frame)

    sock.sendto(str(sendData)+" ", ("roboRIO-3641-FRC.local", 3641))

    #Show Window
    if showVideo == 1:
        cv2.imshow("frame",frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```
You can create a function for each OpenCV algorithm your robot will need. Below is an example function that returns how much the robot must turn to follow a line seen through the webcam. This particular algorithm is further explained in the line following tutorial.
```python
import numpy as np
import cv2

def lineOffset(ret, frame):
    # Crop the image
    crop_img = frame[60:120, 0:160]

    # Gaussian blur
    blur = cv2.GaussianBlur(crop_img,(5,5),0)

    #Convert to Hue, Saturation, and Value colorspace
    hsv = cv2.cvtColor(blur, cv2.COLOR_BGR2HSV)

    # define range of red color in HSV
    lower_red = np.array([0, 40, 0])
    upper_red = np.array([10, 255, 255])

    # Threshold the HSV image to get only red colors
    thresh = cv2.inRange(hsv, lower_red, upper_red)

    # Find the contours of the frame
    contours,hierarchy = cv2.findContours(thresh.copy(), 1, cv2.CHAIN_APPROX_NONE)

    # Find the biggest contour (if detected)
    if len(contours) > 0:
        c = max(contours, key=cv2.contourArea)
        M = cv2.moments(c)

        if M['m00'] != 0:
            cx = int(M['m10']/M['m00'])
            cy = int(M['m01']/M['m00'])
        else:
            cx = 0
            cy = 0

        cv2.line(crop_img, (cx, 0), (cx, 720), (255, 0, 0), 1)
        cv2.line(crop_img, (0, cy), (1280, cy), (255, 0, 0), 1)

        cv2.drawContours(crop_img, contours, -1, (0, 255, 0), 1)

        return cx-80   # Offset in pixels from center of the screen
    else:
        return 999
```
To run this program from the terminal run:
```bash
debian@beaglebone.local:~$ python VisionCore.py
```

You can quit the program with `ctrl+c`.

Good luck using this to expand the capabilties of your FRC robot!
