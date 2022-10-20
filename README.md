# ModME



This project provides a modular multi-tasking experiment environment.



## Motivation



## Prerequisites



|prerequisite||notes|

|----|----|----|

|MacPorts|required| port installation|(https://www.macports.org/install.php)|

|Python 3.7 or 3.9|required|[beginner's guide](https://wiki.python.org/moin/BeginnersGuide/Download)|

|pip|required|Recent versions of Python include [pip](https://pip.pypa.io/en/stable/).|

|tar|required|Many alternatives exist, such as [7-zip](http://www.7-zip.org/).|

|virtualenv|optional|Recent versions of Python include [virtualenv](https://virtualenv.pypa.io/en/stable/).|\
Virtualenv allows you create little virtual environments each with its own set of python packages installed. \
Using a virtual environment is considered good practice, when working with python, because it prevents programs with different dependencies from interfering with one another. 


### Windows prerequisite installation

Note that for individuals with both python 2 and python 3 installed, use of python3 commands ensures use of python3, where python may fall back to python2.
Go to the python download page and download the latest 3.9 version of the python installer. You can also python 3.7. other versions of python may work but we have only tested with 3.7 and 3.9. 
When the download is complete, run the installer. Make sure to check the box to add python to your PATH
After the installer completes, make sure that python installed successfully. Open a command prompt window and verify the python version

```bash
python --version
//Or 
python3 --version
//or 
py --version
```

If none of those work, than python was probably installed but not added to your systems PATH variable. You can to try adding it to your path manually: On the Windows start menue search for “system variable” then click on “Edit the system environment variables”.
Click on the button at the bottom that says “Environment Variables…”.
In the list of environment variables for your user name click on “Path” then click the edit button.
Click new and add the following location (replacing your username): C:\Users\YOUR_USERNAME\AppData\Local\Programs\Python\Python39\Scripts\
Also click new and add this other location:
C:\Users\YOUR_USERNAME\AppData\Local\Programs\Python\Python39\
Then click on these locations and click the move up button until they are on the top of the list. Click “OK” to close all the control panel windows. 

You should now be able to check your python version with one of the commands given above.

Pip is installed with python. You can verify that it is installed with the following command. To verify your pip version enter he following command:


```bash
pip3 -V
```

Note: Just as you can have multiple versions of python installed, you can have multiple versions of pip. Each associated with different python installs. If you are having problems with the wrong pip running then you can call the pip associated with a python install directly:

```bash
python3 -m pip -V
```

To install virtalenv: 
```bash
pip3 install virtualenv

//to verify install
virtualenv –-version
``` 


### Mac prerequisite installation (macports)

Note that for individuals with both python 2 and python 3 installed, use of python3 commands ensures use of python3, where python may fall back to python2.



Be sure to install macports before the following additional installations.



```bash

sudo port install python37 py37-virtualenv py37-pip

sudo port select python3 python37

sudo port select pip3 pip37

sudo port select virtualenv virtualenv37

```



### Linux prerequisite installation (Ubuntu 16.04)



```bash

sudo apt install python python-pip python-virtualenv tar

```



### verify prerequisites



Ensure you are using python verision 3.7 or 3.9, and that everything is installed and available from the command line. ex.



>$ python3 --version

>Python 3.7.7

>$ pip3 --version

>pip3 20.0.2 from c:\users\bobt\appdata\local\programs\python\python37\lib\site-packages\pip (python 3.7)

>$ tar --version

>bsdtar 3.3.2 - libarchive 3.3.2 zlib/1.2.5.f-ipp

>$ virtualenv --version

>virtualenv 20.0.16



## Installation

2. Create a virtual environment to contain the server (optional but recommended)

  ```bash

  virtualenv virtmodme

  //for Mac and linux
  source virtmodme/bin/activate

  //for windows
  virtmodme\Scripts\activate
  ```

  __tips__

  * make sure virtualenv is on your PATH

3. Install Python library dependencies

  ```bash

  pip3 install Django==2.2

  pip3 install tornado==6.1

  ```

4. Install and configure the ModME server locally

```bash

unzip ~/Downloads/modme.zip

cd modme/

python3 ./Tornado.py

```



  If you need to build the sql database, use the following:

  _replace admin_name email address, password, and download location as appropriate_



  ```bash

  unzip ~/Downloads/modme.zip

  cd modme/

  python3 ./manage.py migrate

  python3 ./manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('admin_name', 'admin_name@example.com', 'admin_password')"

  python3 ./Tornado.py

  ```

5. Verify the server is running

  * Open a browser to http://localhost:9000

  * You will see a large banner proclaiming 'INDEX' and links to ModME, Administration, Conditions, and "Add a New Table"

  

6. To quit the server, use CONTROL-C in the command window. Then to exit the virtual environment, type exit followed by enter.



## Launch ModME after Installation

1. MAC: In the terminal

```bash
//start virtual environment if it is not allready running
 source virtmodme/bin/activate

 cd modme/

 python3 ./Tornado.py

```
2. Windows: In Command Prompt
```bash
//start virtual environment if it is not allready running
virtmodme\Scripts\activate

cd modme
python3 ./Tornado.py
```


Verify the server is running

* Open a browser to http://localhost:9000

* You will see a large banner proclaiming 'INDEX' and links to ModME, Administration, Conditions, and "Add a New Table"



## Configuration of a Condition

1. Create a condition

  * Open a browser to http://localhost:9000/admin/ModME/condition

  * Enter the username and password you created earlier to sign in

  * Click on "Add Condition +"

  * Give your condition a Name and Length, then press "Save"

2. Configure your condition

  * Browse to http://localhost:9000/admin/ModME/condition

  * Find the condition you're interested in and click "Configure"

  * Use the drop-downs under "Included Tasks" to select the tasks for your experiment

  * Click on the element you want to configure to open the properties dialog for it

  * Press "Submit Changes" when you are done



## Repeatable Event Sequences

1. Record a session

  * Browse to the ModME experiment initiation page http://localhost:9000/ModME/

  * Select a condition from the drop-down, enter a participant, session, and study id, and press the Begin button

  * Press the space bar when prompted

  * Wait for the experiment to finish.  You do not need to respond to alerts or otherwise while the experiment is running.

  * Once the session is complete, browse to http://localhost:9000/admin/ModME/metadata/

  * Find the entry for your recorded session and click the link

  * Check the AllowEventReuse box and press Save

2. Record an experiment session with a recordable sequence of events

  * Browse to http://localhost:9000/ModME/

  * After selecting the condition from the uppermost drop-down, the "Reuse Session Data" dropdown will be populated

  * Check the "Reuse Session Data" box and select your previously-recorded session

  * Enter the participant, session, and study IDs and press Begin

  * When the participant initiates the session on the next page, their session will reuse the previously-recorded alerts

3. Modifying a sequence of reusable events

  * find the id for the session you want to modify  

    _find the id at http://localhost:9000/admin/ModME/metadata_

  * grab previously-recorded alerts from the database _using the right metadata_id_

    ```bash

    echo $'.mode csv

    select time, eventType, chart, domid, arg

      from modme_event

      where metadata_id=6 and eventtype="alert"

      order by id desc

      ;'   | sqlite3 db.sqlite3 > repeatableAlerts.csv

    ```

  * modify the alerts in your favorite csv editor

  * load the alerts using the command-line tools for site management  

    _Correct the condition name as appropriate_

    ```python

    python3 manage.py load_events -c demoCondition ./repeatableAlerts.csv

    ```

## Additional Documentation
Additional documentation is available on the git page wiki.

## Tests



## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.



## Versioning



We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/pnnl/modme/tags).



## Authors



## License

[MIT](LICENSE.md)



## Acknowledgments
