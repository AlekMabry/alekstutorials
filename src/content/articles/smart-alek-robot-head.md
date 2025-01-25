---
title: Smart Alek Robot Head
slug: robot-head
date: "2017.06"
keywords: ['Rabbit', 'Colony', 'Tractor']
tags: ['BeagleBone', 'Java', 'Python']
description: Open source robot head.
thumb: images/uploads/smart_alek_robot_head_thumb.jpg
collection: articles
---
The Smart Alek Robot Head is an open-source robot head that I’ve been developing for most of my life, however, it took its current form in the 8th grade (2015). Since it’s original cardboard design in the spring of 2015, it has gone through many iterations of laser-cut designs, including smaller versions that I intended to sell as kits, and a life-sized version with a body. It became the platform that I used to learn, develop, and test computer vision programs, and was the inspiration and source for many of my initial tutorials.

## First Prototypes

I originally developed robot heads using Lego Mindstorms throughout the 3rd and 4th grade. However, Lego Mindstorms had significant limitations, such as only having three servo motors and a basic programming interface. I would often try to imitate robots like Kismet by taping on non-Lego decorations like Halloween eyeball props, and I used primitive methods of voice recognition, such as checking for changes in the pitch and amplitude heard through the microphone to detect certain key phrases.

![](images/uploads/robot_head_3rd_grade.png)

By the 8th grade, I had plenty of experience using Arduinos, and I was fascinated by the capabilities of Linux-powered development boards such as the Raspberry Pi and BeagleBone. These development boards would allow users to develop robots that I had previously thought to be impossibly difficult in the 4th grade. I realized that they were fairly easy to program, and could run computer vision algorithms, speech recognition, and do machine learning. To develop a new robot head, I acquired a BeagleBone (as it could control more servo motors and outputs than a Raspberry Pi) and created two subsequent robots over a month.

![](images/uploads/robot_head_firsts.png)

I created the robots using cardboard and hot glue. The first robot head was small and used ultrasound sensors for the eyes, and stepper motors for movement. I later created a new version that was much larger and used a webcam for the eyes (Logitech C270) and servo motors for articulation. The webcam was too large to fit two into the head for stereo vision, so I stylized the other side of the face to have a glowing cybernetic eye. It could look left-right and up-down. It could also rotate its jaw and eyebrows.

![](images/uploads/robot_head_evil.jpg)
![](images/uploads/robot_head_exited.jpg)
![](images/uploads/robot_head_question.jpg)

## Programming and Early Tutorials

Through BeagleBone meetups at my makerspace (i3 Detroit), I met Jason Kridner, the co-founder of BeagleBoard.org. He taught me how to use the BeagleBone, got me started with OpenCV (a computer vision library), and also showed me general Linux and programming tips. Over the years he has provided invaluable help and without him, I probably would not be where I am today. With his help, the code was completed in time for Makerfaire Detroit 2015, and the robot could track a ball. I was also lucky enough to meet Ben Heck, who was also one of the inspirations for this project. He made weekly youtube videos usually focused on electronic projects. From my experiences that year, I started posting tutorials on my website, einsteiniumstudios.com (youtube: Einsteinium Studios) to help inspire and teach others in the same way Jason Kridner and Ben Heck inspired me.

![](images/uploads/robot_head_makerfaire.png)

## Early Lasercut/3D Printed Version

The first machine fabricated version of the robot head was designed using Adobe Illustrator and Fusion 360. The shell of the head was designed in Illustrator and laser-cut, while the mounts were 3D printed. This had the downside of taking significantly longer to fabricate, as the 3D printed parts took several hours to print. The 3D printed brackets occasionally suffered warping and required additional screws or glue to mount the motors. This also made it difficult to remove bad motors from the head.

![](images/uploads/robot_head_first_laser_cut.png)
![](images/uploads/robot_head_jaw_brackets.png)
![](images/uploads/robot_head_eyebrow_brackets.png)

## Completely Lasercut Version

This version was designed entirely in Solidworks, which helped me confirm the range of motion and prevent overlapping parts, which were issues with the 2D design process I used previously. Learning from mistakes of the original 3D printed brackets, I redesigned the servo mounts to be entirely laser cut and interlocking without the use of glue or screws. The eyebrow brackets fit into slots on the head, and the servos are held in place by an inserted laser cut pin. It also had mounting spots so that the circuit board and camera could be removed from the webcam and mounted directly, for more accurate positioning and stability. This version was completed in the 10th grade (2017).

![](images/uploads/robot_head_laser_cut_arcrylic.png)
![](images/uploads/robot_head_cad_0.png)
![](images/uploads/robot_head_cad_1.png)
![](images/uploads/robot_head_cad_2.png)
![](images/uploads/robot_head_cad_3.png)

## Life Sized Version

For my senior year in high school, I created a life-sized version with a body to greet students entering the design-tech lab. My design-tech teacher, Roger Bodary, taught me a lot about woodworking, and would often come into school for the weekends so that I could complete this version and the previous version of the robot. This version was completed in the 12th grade (2019).

![](images/uploads/robot_head_4.png)
![](images/uploads/robot_head_pitch.png)
![](images/uploads/robot_head_leg_assembly.png)
![](images/uploads/robot_head_shoulder.png)

## Beagle Animate

Beagle Animate is a program I made to create animations for the robot head. It exports animations in a JSON format. It was programmed in the GM:S 1.4 game engine and can be easily modified to animate other robots by switching out the 3D model.

![Beagle Animate Screenshot](images/uploads/robot_head_beagle_animate.png)

