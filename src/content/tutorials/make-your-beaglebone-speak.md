---
title: Make your BeagleBone Speak
slug: make-your-beaglebone-speak
date: '2015.08'
keywords: ['BeagleBone', 'Flite', 'Speak']
tags: ['BeagleBone', 'Python']
description: Learn how to use Flite, a text-to-speech program, to make your
  BeagleBone speak.
thumb: images/uploads/tutorial_speaker_thumb.svg
collection: tutorials
---

## Supplies
* BeagleBone running Debian.
* Mini USB cable.
* USB to audio converter. It must support ALSA (Advanced Linux Sound Architecture)
* Headphones/Speaker

## Connecting to the BeagleBone
First plug in the USB to audio dongle before powering on the BeagleBone. Then connect the BeagleBone to your computer with the Mini USB cable.

For these next steps you need access to the BeagleBone’s terminal. This is commonly done through the Cloud9 or SSH interface. Cloud9 is a web interface that provides an IDE and a terminal, while SSH only gives access to the terminal.

To use the Cloud9 IDE, navigate to [192.168.7.2:3000](192.168.7.2:3000) in your web browser.

To use SSH instead, run the following command in your terminal/command prompt. The `ssh` command is supported on all modern operating systems. The default BeagleBone username is `debian` and the password is `temppwd`.
```shell{outputLines: 2-10,12}{promptUser: you}{promptHost: 192.168.7.2}
you@yourcomputer:ssh debian@192.168.7.2
```

You can disconnect later from the SSH connection with:
```
debian@192.168.7.2:~$ exit
```

## Audio Configuration
To output audio from your BeagleBone, you can use a USB to audio dongle. Drivers for the Advanced Linux Sound Architecture are already installed on the BeagleBone. You can view all recording and playing devices connected to the board with:
```
debian@192.168.7.2:~$ aplay -l
**** List of PLAYBACK Hardware Devices ****
card 0: Black [TI BeagleBone Black], device 0: HDMI nxp-hdmi-hifi-0 []
    Subdevices: 1/1
    Subdevice #0: subdevice #0
card 1: Set [C-Media USB Headphone Set], device 0: USB Audio [USB Audio]
    Subdevices: 1/1
    Subdevice #0: subdevice #0
```

Now to configure the BeagleBone to use the dongle to output audio, create a file called `./asoundrc`.
```
debian@192.168.7.2:~$ nano ~/.asoundrc
```

In this file write:
```
pcm.!default {
    type plug
    slave {
        pcm "hw:1,0"
    }
}
ctl.!default {
    type hw
    card 1
}
```

You can exit the Nano editor by pressing `ctrl+x`, then `y`.

## Installing Flite
Now install Flite, a text-to-speech program.
```
debian@192.168.7.2:~$ sudo apt install flite
```

## Basic Flite Commands
Now it’s time to test Flite! The `-t` argument speaks the string entered.
```
debian@192.168.7.2:~$ flite -t Hello!
```

Flite can speak from a file with the `-f` argument.
```
debian@192.168.7.2:~$ flite -f hello.txt
```

You can also save the Flite output to a file with the `-o` argument.
```
debian@192.168.7.2:~$ flite -t "Shall we play a game?" -o WOPR.wav
```

## Using Different Voices
Time for some variety! Flite comes with multiple voices already installed. To view the available voices use:
```
debian@192.168.7.2:~$ flite -lv
```

You can use one of these voices with the `-voice` argument.
```
debian@192.168.7.2:~$ flite -voice rms -t "This is rms voice!"
```

## Using Flite with Python
Create a new python file called `speak.py`.
```
debian@192.168.7.2:~$ nano speak.py
```

You can run terminal commands within Python using `call()`:
```python
from subprocess import call
import os

call(["flite", "voice", "rms", "-t", "Shall we play a game?"])
```

You can exit the Nano editor by pressing `ctrl+x`, then `y`.

To execute this program enter:
```
debian@192.168.7.2:~$ python speak.py
```

Flite can be used to enhance a chatbot program, such as in this program from my robot head:
```python
from subprocess import call
import os

# Preferred voice.
voice = "rms"

# All the ways to ask a question.
qHi = ["hi","hi!","hello","hello!"]
cQuit = ["quit","exit"]

def speak(output):
        print "[Robot Head]: " + output
        call(["flite", "-voice", voice, "-t", output])

speak("Ask a question or say a command to begin!")
while True:
    command = raw_input()

    if command.lower() in qHi:
        speak("Hello!")

    if command.lower() in cQuit:
        speak("Good Bye!")
        break
```

## Using Flite with Node.js (BoneScript)
You can use Flite from within your BoneScript programs in a similar method to Python. Start by creating a new Node.js file called `speak.js`.
```
debian@192.168.7.2:~$ nano speak.js
```

Like the `call()` function in Python, terminal commands can be run in Node.js with `exec()`:
```js
#!/usr/bin/env node
var exec = require('child_process').exec;

function speak(phrase) {
    exec('flite -t "' + phrase + '"', function (error, stdout, stderr) {
        console.log(stdout);
        if(error) {
            console.log('error: '+ error);
        }
        if(stderr) {
            console.log('stderr: '+ stderr);
        }
    });
}

speak("Hello, My name is Borris. "+
"I am BeagleBone Black, " +
"A true open hardware, " +
"community-supported embedded computer for developers and hobbyists. " +
"I am powered by a 1 Giga Hertz Sitara ARM Cortex-A8 processor. " +
"I boot Linux in under 10 seconds. " +
"You can get started on development in " +
"less than 5 minutes with just a single USB cable. " +
"Bark, Bark!");
```

You can exit the Nano editor by pressing `ctrl+x`, then `y`.

To execute this program enter:
```
debian@192.168.7.2:~$ node speak.py
```

Have fun using Flite in your projects!