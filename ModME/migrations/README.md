# ModME

This project provides a modular multi-tasking experiment environment.

## Motivation

## Prerequisites
The details of installation and configuration of prerequisites is outside the scope of this document.

|prerequisite||notes|
|----|----|----|
|Python 2.7|required|[beginner's guide](https://wiki.python.org/moin/BeginnersGuide/Download)|
|pip|required|Recent versions of Python include [pip](https://pip.pypa.io/en/stable/).|
|tar|required|Many alternatives exist, such as [7-zip](http://www.7-zip.org/).|
|virtualenv|optional|Recent versions of Python include [virtualenv](https://virtualenv.pypa.io/en/stable/).|

### Mac prerequisite installation (macports)

```bash
sudo port install python27 py27-virtualenv py27-pip
sudo port select python python27
sudo port select pip pip27
sudo port select virtualenv virtualenv27
```

### Linux prerequisite installation (Ubuntu 16.04)

```bash
sudo apt install python python-pip python-virtualenv tar
```

### verify prerequisites

Ensure everything is 3.7 installed and available from the command line. ex.

>$ python3 --version
>Python 3.7.7
>$ pip3 --version
>pip 20.0.2 from c:\users\bobt\appdata\local\programs\python\python37\lib\site-packages\pip (python 3.7)
>$ tar --version
>bsdtar 3.3.2 - libarchive 3.3.2 zlib/1.2.5.f-ipp
>$ virtualenv --version
>virtualenv 20.0.16

## Installation
2. Create a virtual environment to contain the server (optional)
  ```bash
  virtualenv modme
  cd modme/
  source bin/activate
  ```
  __tips__
  * make sure virtualenv is on your PATH
3. Install Python library dependencies
  ```bash
  pip3 install Django==2.2.12
  pip3 install tornado==6.0.3
  ```
4. Install and configure the ModME server locally  
  _replace the email address, password, and download location as appropriate_
  ```bash
  tar -xzvf ~/Downloads/modme.tgz
  cd modme/
  python3 ./manage.py migrate
  python3 ./manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'admin')"
  python3 ./Tornado.py
  ```
5. Verify the server is running
  * Open a browser to http://localhost:9000
  * You will see a large banner proclaiming 'INDEX' and links to ModME, Administration, Conditions, and "Add a New Table"

## Configuration
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

## Tests

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/pnnl/modme/tags).

## Authors

## License
[MIT](LICENSE.md)

## Acknowledgments
