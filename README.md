# ModME

This project provides a modular multi-tasking experiment environment.

## Motivation

## Contributing

## License

## Installation
1. Make sure you have Python 2.7 installed and available from the command line. ex.
  ```bash
  $ python --version
  Python 2.7.13
  ```
2. Create a virtual environment to contain the server (optional)
  ```bash
  virtualenv wright # using macports?  Try virtualenv-2.7
  cd wright/
  source bin/activate
  ```
3. Install prerequisite libraries for Python
  ```bash
  pip install Django==1.11
  pip install tornado==4.3
  ```
4. Install and configure the ModME server locally  
  _replace the email address and password as appropriate_
  ```bash
  tar -xzvf ~/Downloads/modme.tgz
  cd modme/
  python ./manage.py migrate
  python ./manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'hunter2')"
  python ./Tornado.py
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
    python manage.py load_events -c demoCondition ./repeatableAlerts.csv
    ```
## Tests
