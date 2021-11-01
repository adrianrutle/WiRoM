# Webots Setup for DAT160
Here is an installation updated installation guide, because certain versions of of the tools are needed for the system to work. The original guide is still here, but everything you need is in the first part of the README.  
Note: On some of the installation steps, you might encounter some issues on Windows. See the alternative solutions. 

### Pre-requirements

Don't install the latest version of Webots, but the Webots R2019b revision 1 version.  
Link to installation can be found here: https://github.com/cyberbotics/webots/releases/tag/R2019b-rev1


You also need to have Python and Node.js installed, with their respective package commands pip and npm.

Node.js / npm : https://nodejs.org/en/

Python / pip : https://www.python.org/downloads/

It is highly highly recommended to have a bash-like terminal installed if you use Windows. A good example is the Windows Terminal (not the default), which can be downloaded directly from the Windows Store. Either [follow this link](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab), or search for "Windows Terminal" in the Microsoft Store.


### Running the system
Clone the repository to your local machine using the command: 
```
git clone https://github.com/adrianrutle/WiRoM.git
```
This system is a web application, and uses a server-client setup for communicating between the browser and the simulation. This means we need to run the server and the client in order to run the system.

### Running the client
First you start by running the web-client.
Open a new terminal and navigate into the repository folder, then the robot-mission-planner folder, then the src folder: 
```
cd WiRoM/web_interface
```
First run the following command to install all packages:
```
npm install
```
Then run the following command to start the client: 
```
npm start
```
The client is now running at localhost:3000 (a new window should open automatically in you browser). 

### Running the server
After the client is started, you can start the server. Open another new terminal window and navigate into the repository folder, then the backend folder:
```
cd WiRoM/backend
```
First run the following command to install all packages (listed in requirements.txt): 
```
pip install -r requirements.txt
```
There is an issue where the installation of the requirements does not work properly (especially on Windows). You might not notice this error before trying to run the system. If that's the case, the libraries from requirements.txt can be installed "manually" by using three commands instead:
```
pip install flask 
```
```
pip install flask_cors
```
```
pip install requests
```
Then run the following command to start the server: 
```
flask run
```
If you get the error that Windows can't detect the command "flask", try executing this command instead:
```
python -m flask run
```
This should start the server of the system and it should say it is running on the local ip at port 5000.

### Running Webots
The third thing we have to do is start Webots, either normally or in streaming mode (streaming has to be run via terminal).
Opening normally is simply opening the program using the executable file (link to webots docs below). 
However it is strongly recommended to open in streaming mode, such that the simulation can be viewed directly from the browser, which gives the best experience of the system.

To open in streaming mode on Mac, open a new terminal and navigate to the installation folder, which typically is Applications/Webots.app and run it using the command :
```
./webots --stream
```

The location on Windows can differ, depending on if you installed the program for all users on your system, or just your user. If you installed it on your user, it should typically be found here: *C:\Users\\"username"\AppData\Local\Programs\Webots\msys64\mingw64\bin*. On the other hand, if you installed it for all users, it was most likely installed here: *\Program Files\Webots\msys64\mingw64\bin*. Run the program from the terminal using the command:
```
./webots.exe --stream
```
This should open a new Webots instance, and it might ask for permission to access the web.

For the official documentation on how to start Webots normally and in streaming mode for Windows, Mac and Linux go to: https://cyberbotics.com/doc/guide/starting-webots

After Webots is running, simply click File -> Open world and navigate to backend/worlds and select the the file called 
```
delivery-mission.wbt
```

When you have completed all the steps, the system is ready to be used.


# ----- Original -----
# WiRoM: heterogeneous multi-robot mission planning
This project is a part of a master thesis. The purpose of this project is to create a system for planning missions for heterogeneous multi-robot setups, letting the user create missions directly from the browser and execute them in a simulated environment. 

[Link to web interface instructions](https://youtu.be/Va9vNV0tj0c)

[Link to quarantine delivery mission](http://www.youtube.com/watch?v=TE_qN2Zqp8E)

Instructions for testing the system and a questionnaire that can be answered after testing the system is provided at the bottom of this readme file. This data will be used to evaluate the system for the master thesis.

## Pre-requirements
To use the system as-is, one needs to download and install the LATEST VERSION of the robot simulaton tool Webots. Webots is a powerful and open-source robot simulation tool that provides a big robot repository and possibilty for having multi-robot setups and create controllers for different robots, as well as streaming to a web platform.

Go to Cyberbotics website to find instructions on how to download and install Webots: https://cyberbotics.com/

One could use another simulation if desired, but then one would need to program the controllers and add simpleactions for that simulation tool, in order for it to work.

You also need to have Python and Node.js installed, with their respective package commands pip and npm.

Node.js / npm : https://nodejs.org/en/

Python / pip : https://www.python.org/downloads/

It is also highly recommended to have some bash-like terminal (e.g. https://gitforwindows.org/) installed if you use Windows, because the commands given in this readme will be compatible with those types of terminals.

## How to run the system from the GitHub repository
Clone the repository to your local machine using the command: 
```
git clone https://github.com/joakimgrutle/Multi-robot-mission-planner.git
```

This system is a web application, and uses a server-client setup for communicating between the browser and the simulation.
This means we need to run the server and the client in order to run the system.


### Running the client
First you start by running the web-client.
Open a new terminal and navigate into the repository folder, then the robot-mission-planner folder, then the src folder: 
```
cd WiRoM/web_interface
```
First run the following command to install all packages:
```
npm install
```
Then run the following command to start the client: 
```
npm start
```
The client is now running at localhost:3000 (a new window should open automatically in you browser)

### Running the server
After the client is started, you can start the server.
Open another new terminal window and navigate into the repository folder, then the scouting missions folder, then the controllers folder:
```
cd WiRoM/backend
```
First run the following command to install all packages (listed in requirements.txt): 
```
pip install -r requirements.txt
```
Then run the following command to start the server: 
```
flask run
```
This should start the server of the system and it should say it is running on the local ip at port 5000

### Running Webots
The third thing we have to do is start Webots, either normally or in streaming mode (streaming has to be run via terminal).
Opening normally is simply opening the program using the executable file (link to webots docs below). 
However it is strongly recommended to open in streaming mode, such that the simulation can be viewed directly from the browser, which gives the best experience of the system.

To open in streaming mode on Mac, open a new terminal and navigate to the installation folder, which typically is Applications/Webots.app and run it using the command :
```
./webots --stream
```

To open in streaming mode on Windows, also navigate to the bin folder in the installation folder, typically *C:\Users\\"username"\AppData\Local\Programs\Webots\msys64\mingw64\bin* and run the program from a terminal using the command:
```
./webots.exe --stream
```
This should open a new Webots instance, and it might ask for permission to access the web.

For the official documentation on how to start Webots normally and in streaming mode for Windows, Mac and Linux go to: https://cyberbotics.com/doc/guide/starting-webots

After Webots is running, simply click File -> Open world and navigate to Multi-robot-mission-planner/scouting-mission/worlds and select the the file called 
```
scouting-mission.wbt
```

When you have completed all the steps, the system is ready to be used.

### System instructions and questionnaire
Follow these links to the instructions for testing the system, and then when you are done with this, go to the questionnaire and answer the questions.

[Link to web interface quick instructions](https://youtu.be/Va9vNV0tj0c)

[Written instructions for testing the system](https://github.com/joakimgrutle/Multi-robot-mission-planner/blob/master/Mission%20planning%20instructions.pdf)

[Questionnaire for after testing the system](https://docs.google.com/forms/d/e/1FAIpQLSciykaeCi5p2Nm09FnBMVxAytmdXgIIT2nBaX4pZkyQ40FsxA/viewform?usp=sf_link)
