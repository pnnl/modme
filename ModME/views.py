from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
import sqlite3
import shutil
from django.http import Http404, HttpResponseForbidden, HttpResponseRedirect, HttpResponse, HttpResponseNotFound

from ModME.models import (
    Experiment,
    Condition,
    Session,
    Participant,
    Metadata,
    Event,
    ResourceTank,
    ResourceSwitch,
    Tracking,
    MouseTracking,
    Task,
    TableAdd,
    NasaTlx,
    RemoteSession,
    remoteExperiment,
    remoteParticipant,
    # End of model imports
)
import json
import string
import random
import os
from collections import OrderedDict

# Loads ModME experimentation setup page
# Sends parameter object, Participant ID, session number, and condition to Experiment page


def index(request):

    if request.POST.get('tableName'):
        survey = request.POST.get('survey')
        uString = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(30))
        os.makedirs("ModME/tableAdditions/" + uString)
        f = open("ModME/tableAdditions/" + uString + "/models.txt", "w")
        f.write(request.POST.get('modelString') + '\n')
        f.close()
        f = open("ModME/tableAdditions/" + uString + "/admin.txt", "w")
        f.write(request.POST.get('adminString') + '\n')
        f.close()
        f = open("ModME/tableAdditions/" + uString + "/views.txt", "w")
        f.write(survey + '\n')
        f.write(request.POST.get('viewSave') + '\n')
        f.write(request.POST.get('viewArray') + '\n')
        f.write(request.POST.get('viewParse') + '\n')
        f.close()
        t = TableAdd(
                tableName=request.POST.get('tableName'),
                uniqueString=uString,
                applyed=False
        )
        t.save()

    return render(request, 'ModME/index.html', {'experiment_list': Experiment.objects.order_by('name'), 'meta_list': Metadata.objects.order_by('id')})

def instructions(request):


    experimentId = request.POST['experimentId']
    participantAlias = request.POST['participantAlias']
    sessionName = request.POST['sessionName']
    studyName = request.POST['studyName']
    metadataId = None
    if ('metadata_id' in request.POST):
        metadataId = request.POST['metadata_id']

    conditionList = ""
    if ('conditionList' in request.POST):
        conditionList = request.POST['conditionList']

    experimentModel = Experiment.objects.get(id=experimentId)

    parameters = {
        'experimentId': experimentId,
        'conditionList': conditionList,
        'participantAlias': participantAlias,
        'sessionName': sessionName,
        'studyName': studyName,
        'metadataId': metadataId,
        'pdf': experimentModel.instructional_pdf,
        'instructionText': experimentModel.instructional_text,
        'skipInstructions': experimentModel.skip_instructions,
    }


    return render(request, 'ModME/instructions.html', parameters)


def conditionInstructions(request):

    experimentModel = Experiment.objects.get(pk=request.POST['experimentId'])
    conditionList = experimentModel.conditions

    experimentId = request.POST['experimentId']
    participantAlias = request.POST['participantAlias']
    sessionName = request.POST['sessionName']
    studyName = request.POST['studyName']

    metadataId = None
    if ('metadata_id' in request.POST):
        metadataId = request.POST['metadata_id']

    splitList = conditionList.split(',')

    if (conditionList == ""):
        conditionList = experimentModel.conditions
        splitList = conditionList.split(',')
        if (experimentModel.random):
            random.shuffle(splitList)

    conditionIndex = 0
    if ('conditionIndex' in request.POST):
        conditionIndex = int(request.POST['conditionIndex']) + 1

    conditionID = splitList[conditionIndex]
    conditionModel = Condition.objects.get(id=str(conditionID))

    pdf = conditionModel.instructional_pdf

    if conditionModel.skip_instructions is None or conditionModel.skip_instructions is True:
        skipInstructions = True
    else:
        skipInstructions = False

    context = {
        'experimentId': experimentId,
        'conditionIndex': conditionIndex,
        'sessionName': sessionName,
        'studyName': studyName,
        'metadataId': metadataId,
        'participantAlias': participantAlias,
        'conditionList': ','.join(map(str, splitList)),
        'pdf': pdf,
        'skipInstructions': skipInstructions,
        'eventReuseMetadataId': request.POST.get('metadataId'),

    }
    return render(request, 'ModME/conditionInstructions.html', context)


def begin(request):
    
    experimentId = request.POST['experimentId']
    participantAlias = request.POST['participantAlias']
    sessionName = request.POST['sessionName']
    studyName = request.POST['studyName']
    metadataId = None
    if ('metadata_id' in request.POST):
        metadataId = request.POST['metadata_id']
    conditionIndex = 0
    if ('conditionIndex' in request.POST):
        conditionIndex = request.POST['conditionIndex']
    conditionList = ""
    if ('conditionList' in request.POST):
        conditionList = request.POST['conditionList']
    parameters = {
        'experimentId': experimentId,
        'conditionIndex': conditionIndex,
        'conditionList': conditionList,
        'participantAlias': participantAlias,
        'sessionName': sessionName,
        'studyName': studyName,
        'metadataId': metadataId,
    }
    return render(request, 'ModME/begin.html', parameters)

# Loads ModME experiment
# Receives parameter object, Participant ID, session number, and condition from Index page
# Sends Data at the end of experiment to intermediate Done page


def experiment(request):
    
    experimentModel = Experiment.objects.get(pk=request.POST['experimentId'])
    conditionList = request.POST['conditionList']
    splitList = conditionList.split(',')
    if (conditionList == ""):
        conditionList = experimentModel.conditions
        splitList = conditionList.split(',')
        if (experimentModel.random):
            random.shuffle(splitList)

    conditionIndex = int(request.POST['conditionIndex'])
    conditionID = splitList[conditionIndex]

    condition = Condition.objects.get(pk=conditionID)
    nominalTaskIds = [condition.task1, condition.task2, condition.task3, condition.task4]
    tasks = list(Task.objects.filter(pk__in=nominalTaskIds))
    taskFiles = set([taskFile.name for task in tasks for taskFile in task.file_set.all()])
    cssFiles = [filename for filename in taskFiles if filename.endswith(".css")]
    baseFiles = ["d3/d3.v3.min.js", "d3/d3.chart.min.js"]
    jsTaskFiles = [filename for filename in taskFiles if not filename.endswith(".css")]
    requiredFiles = OrderedDict.fromkeys(baseFiles + jsTaskFiles)  # no duplicates
    taskNames = []
    for (index, nominalTaskId) in enumerate(nominalTaskIds):
        if nominalTaskId == -1:
            taskNames.append("blank" + str(index))
        elif nominalTaskId == -2:
            # TODO placeholder should be a task in the database
            taskNames.append("placeholder" + str(index))
        else:
            taskNames.append(Task.objects.get(pk=nominalTaskId))
    participantAlias = request.POST['participantAlias']
    sessionName = request.POST['sessionName']
    studyName = request.POST['studyName']
    context = {
        'experimentId': experimentModel.id,
        'conditionIndex': conditionIndex,
        'conditionList': ','.join(map(str, splitList)),
        'parameters': condition,
        'participantAlias': participantAlias,
        'sessionName': sessionName,
        'studyName': studyName,
        'fileList': requiredFiles,
        'taskList': tasks,
        'taskNames': taskNames,
        'cssList': cssFiles,
        'eventReuseMetadataId': request.POST.get('metadataId'),
    }
    renderedPage = render(request, 'ModME/experiment.html', context)
    return renderedPage

# Loads intermediate page
# Purpose of intermediate page is to give a visual cue that the experiment is done while saving data in case data save takes a long time
# Receives data stringified array from Experiment page
# Sends unchanged data array to Complete page


def done(request):
    experimentId = request.POST.get('experimentId')
    conditionIndex = request.POST.get('conditionIndex')
    conditionList = request.POST.get('conditionList')
    participantAlias = request.POST.get('participantAlias')
    sessionName = request.POST.get('sessionName')
    studyName = request.POST.get('studyName')

    data = request.POST.get('data')
    tasks = request.POST.get('tasks')
    myId = request.POST.get('id')
    return render(request, 'ModME/done.html', {'experimentId': experimentId, 'conditionIndex': conditionIndex, 'conditionList': conditionList, 'data': data, 'participantAlias': participantAlias, 'sessionName': sessionName, 'studyName': studyName, 'tasks': tasks, 'id': myId})


# Loads single parameter object that can be configured
# Receives parameter object
# Sends updated object to Save page
def configuration(request, condition_id):
    
    condition = Condition.objects.get(pk=condition_id)
    cssList = []
    requiredFiles = ["d3/d3.v3.min.js", "d3/d3.chart.min.js"]
    for taskID in Task.objects.order_by('fileName'):  # TODO refactor down to (two?) lines of code after model changes
        for resourceFile in taskID.file_set.all():
            if resourceFile.name[-3:] == "css":
                if resourceFile.name not in cssList:
                    cssList.append(resourceFile.name)
            else:
                if resourceFile.name not in requiredFiles:
                    requiredFiles.append(resourceFile.name)

    ids = [condition.task1, condition.task2, condition.task3, condition.task4]
    taskNames = []
    for index in range(len(ids)):
        taskID = ids[index]
        if taskID != -1 and taskID != -2:
            currentTask = Task.objects.get(pk=taskID)
            taskNames.append(currentTask.taskName)
            for resourceFile in currentTask.file_set.all():
                if resourceFile.name[-3:] == "css":
                    if resourceFile.name not in cssList:
                        cssList.append(resourceFile.name)
                else:
                    if resourceFile.name not in requiredFiles:
                        requiredFiles.append(resourceFile.name)
        elif taskID != -1:
            taskNames.append("placeholder" + str(index))
        else:
            taskNames.append("blank" + str(index))
    context = {
        'parameters': condition,
        'taskList': Task.objects.order_by('fileName'),
        'fileList': requiredFiles,
        'taskNames': taskNames,
        'cssList': cssList,
    }
    renderedPage = render(request, 'ModME/configuration.html', context)
    return renderedPage

# Loads list of all current parameter objects
# Purpose updates or creates new object based on passed in information
# Receives parameter object
# Sends single parameter object to Configuration page


def save(request):
    
    condition = Condition.objects.get(pk=request.POST.get('experimentId'))

    if condition.Name == request.POST.get('name'):
        condition.task1 = int(request.POST.get('task1'))
        condition.task1Data = request.POST.get('task1Data')
        condition.task1GUI = request.POST.get('task1GUI') == "true"
        condition.task2 = int(request.POST.get('task2'))
        condition.task2Data = request.POST.get('task2Data')
        condition.task2GUI = request.POST.get('task2GUI') == "true"
        condition.task3 = int(request.POST.get('task3'))
        condition.task3Data = request.POST.get('task3Data')
        condition.task3GUI = request.POST.get('task3GUI') == "true"
        condition.task4 = int(request.POST.get('task4'))
        condition.task4Data = request.POST.get('task4Data')
        condition.task4GUI = request.POST.get('task4GUI') == "true"

        condition.experimentDuration = request.POST.get('duration')
        condition.save()

    else:
        condition = Condition(
            task1=int(request.POST.get('task1')),
            task1Data=request.POST.get('task1Data'),
            task1GUI=request.POST.get('task1GUI') == "true",
            task2=int(request.POST.get('task2')),
            task2Data=request.POST.get('task2Data'),
            task2GUI=request.POST.get('task1GUI') == "true",
            task3=int(request.POST.get('task3')),
            task3Data=request.POST.get('task3Data'),
            task3GUI=request.POST.get('task1GUI') == "true",
            task4=int(request.POST.get('task4')),
            task4Data=request.POST.get('task4Data'),
            task4GUI=request.POST.get('task1GUI') == "true",
            experimentDuration=request.POST.get('duration'),
            Name=request.POST.get('name')
        )
        condition.save()
    return HttpResponseRedirect("/admin/ModME/condition/")

# Loads default parameter object that can be configured
# Sends parameter object to Save page


def new(request):
   
    return render(request, 'ModME/new.html')

# Loads save complete page
# Purpose is to give visual cue that the users is done with the experiment and surveys


def complete(request):
    
    experimentId = request.POST.get('experimentId')
    experimentModel = Experiment.objects.get(pk=experimentId)
    conditionIndex = request.POST.get('conditionIndex')
    conditionList = request.POST.get('conditionList')

    data = json.loads(request.POST.get('data'))
    conditionID = request.POST.get('id')
    condition = Condition.objects.get(pk=conditionID)
    sessionName = data[0]["sessionName"]
    studyName = data[0]["studyName"]
    (session, sessionIsNew) = Session.objects.get_or_create(name=sessionName, study=studyName)
    participantAlias = data[0]["participantAlias"]
    (participant, participantIsNew) = Participant.objects.get_or_create(alias=participantAlias)
    metadata = Metadata(
        startTime=data[0]["time"],
        session=session,
        duration=data[0]["duration"],
        participant=participant,
        condition=condition,
        experiment=experimentModel,
        conditionIndex=conditionIndex,
    )

    metadata.save()

    #################
    #  Array Setup  #
    #################
    events = []
    tracking = []
    switches = []
    tanks = []
    mouse = []

######ArrayUniqueString3m3n4h5g6c6c3n3id8fg7o3n033hn########

    ################
    #  Parse Data  #
    ################
    for info in data:

        if info["table"] == "Event":
            events.append(
                Event(
                    time=info["time"],
                    metadata=metadata,
                    eventType=info["eventType"],
                    chart=info["chart"],
                    arg=json.dumps(info["arg"]),
                    domID=info["id"]
                )
            )
        elif info["table"] == "Tracking":
            tracking.append(
                Tracking(
                    time=info["time"],
                    metadata=metadata,
                    x=info["x"],
                    y=info["y"],
                    domID=info["domID"],
                    state=info["state"],
                    mouseX=info["mouseX"],
                    mouseY=info["mouseY"]
                )
            )
        elif info["table"] == "Switch":
            switches.append(
                ResourceSwitch(
                    time=info["time"],
                    metadata=metadata,
                    switchNumber=info["switchNumber"],
                    state=info["state"]
                )
            )
        elif info["table"] == "Tank":
            tanks.append(
                ResourceTank(
                    time=info["time"],
                    metadata=metadata,
                    tankNumber=info["tankNumber"],
                    state=info["state"]
                )
            )
        elif info["table"] == "Mouse":
            try:
                mouse.append(
                    MouseTracking(
                        time=info["time"],
                        metadata=metadata,
                        x=info["x"],
                        y=info["y"],
                        domID=info["domID"],
                        targetX=info["targetX"],
                        targetY=info["targetY"]
                    )
                )
            except KeyError:
                print("Error in mouse:")
                print(info)


######ParseUniqueString3m3n4h5g6c6c3n3id8fg7o3n033hn########

    ###############
    #  Save Data  #
    ###############
    Event.objects.bulk_create(events)
    Tracking.objects.bulk_create(tracking)
    ResourceSwitch.objects.bulk_create(switches)
    ResourceTank.objects.bulk_create(tanks)
    MouseTracking.objects.bulk_create(mouse)

######SaveUniqueString3m3n4h5g6c6c3n3id8fg7o3n033hn########

    conditions = condition.surveys.all()

    template = 'ModME/complete.html'
    context = None

    #context = None
    if condition.surveys.all():
        requiredFiles = ["d3/d3.v3.min.js", "d3/d3.chart.min.js"]
        for j in condition.surveys.all()[0].surveyfile_set.all():
            if j.name not in requiredFiles:
                requiredFiles.append(j.name)
        template = 'ModME/survey.html'
        context = {
            'experimentId': experimentId,
            'conditionIndex': conditionIndex,
            'conditionList': conditionList,
            'participantAlias': participantAlias,
            'sessionName': sessionName,
            'studyName': studyName,
            'surveyIndex': 0,
            'fileList': requiredFiles,
            'metadata': metadata,
            'survey': condition.surveys.all()[0].fileName
        }
    elif int(conditionIndex) < len(conditionList.split(",")) - 1:

        return conditionInstructions(request)

    renderedPage = render(request, template, context)
    return renderedPage


def survey(request):
    
    experimentId = request.POST.get('experimentId')
    experimentModel = Experiment.objects.get(pk=experimentId)
    conditionIndex = request.POST.get('conditionIndex')
    conditionList = request.POST.get('conditionList')
    participantAlias = request.POST.get('participantAlias')
    sessionName = request.POST.get('sessionName')
    studyName = request.POST.get('studyName')

    data = json.loads(request.POST.get('data'))
    surveyIndex = int(request.POST.get('surveyIndex'))
    metadataId = int(request.POST.get('metadataID'))
    metadata = Metadata.objects.get(pk=metadataId)
    relatedSurveys = metadata.condition.surveys.all()
    surveyName = relatedSurveys[surveyIndex].name

    if surveyName == "NasaTlx" or surveyName == "NasaTlx2":
        s = NasaTlx(
            metadata=metadata,
            time=12,
            mental=data['mental'],
            physical=data['physical'],
            temporal=data['temporal'],
            performance=data['performance'],
            effort=data['effort'],
            frustration=data['frustration'],
            fatigue=data['fatigue'],
            boredom=data['boredom'],
        )
        s.save()

    context = None

    template = 'ModME/complete.html'

    if surveyIndex + 1 < len(relatedSurveys):
        surveyIndex = surveyIndex + 1
        requiredFiles = ["d3/d3.v3.min.js", "d3/d3.chart.min.js"]
        for j in relatedSurveys[0].surveyfile_set.all():
            if j.name not in requiredFiles:
                requiredFiles.append(j.name)
        context = {
            'conditionIndex': conditionIndex,
            'conditionList': conditionList,
            'surveyIndex': surveyIndex,
            'fileList': requiredFiles,
            'participantAlias': participantAlias,
            'sessionName': sessionName,
            'studyName': studyName,
            'metadata': metadata,
            'survey': relatedSurveys[surveyIndex].fileName
        }
        template = 'ModME/survey.html'

    elif int(conditionIndex) < len(conditionList.split(",")) - 1:

        return conditionInstructions(request)

    renderedPage = render(request, template, context)
    return renderedPage





def explanation(request):
    
    return render(request, 'ModME/explanation.html')


def tableAdd(request):
    
    return render(request, 'ModME/autoGen.html')


def remotelink(request, experiment_id, session_id, study_id):

    participant_id = RemoteSession.objects.first()

    if request.POST.get('tableName'):
        survey = request.POST.get('survey')
        uString = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(30))
        os.makedirs("ModME/tableAdditions/" + uString)
        f = open("ModME/tableAdditions/" + uString + "/models.txt", "w")
        f.write(request.POST.get('modelString') + '\n')
        f.close()
        f = open("ModME/tableAdditions/" + uString + "/admin.txt", "w")
        f.write(request.POST.get('adminString') + '\n')
        f.close()
        f = open("ModME/tableAdditions/" + uString + "/views.txt", "w")
        f.write(survey + '\n')
        f.write(request.POST.get('viewSave') + '\n')
        f.write(request.POST.get('viewArray') + '\n')
        f.write(request.POST.get('viewParse') + '\n')
        f.close()
        t = TableAdd(
                tableName=request.POST.get('tableName'),
                uniqueString=uString,
                applyed=False
        )
        t.save()

    return render(request, 'ModME/index2.html',
    {'parameters_list': Experiment.objects.order_by('name'),
    'meta_list': Metadata.objects.order_by('id'),
    'experiment_id': experiment_id,
    'session_id': session_id,
    'study_id': study_id,
    'participant_id': RemoteSession.objects.last()})


def remotelink2(request, remote_code):

    remote_experiment = remoteExperiment.objects.get(remote_code=remote_code)

    experiment_id = remote_experiment.experiment_id

    session_id = remote_experiment.session_id.replace(" ", "nbsp;")
    study_id = remote_experiment.study_id

    remote_participant_list = remoteParticipant.objects.filter(study=remote_experiment.id, id_hold=False)

    remote_participant = remote_participant_list.first()
    remote_participant_id = remote_participant.participant_id
    remote_participant.id_hold = True
    remote_participant.save()

    if request.POST.get('tableName'):
        survey = request.POST.get('survey')
        uString = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(30))
        os.makedirs("ModME/tableAdditions/" + uString)
        f = open("ModME/tableAdditions/" + uString + "/models.txt", "w")
        f.write(request.POST.get('modelString') + '\n')
        f.close()
        f = open("ModME/tableAdditions/" + uString + "/admin.txt", "w")
        f.write(request.POST.get('adminString') + '\n')
        f.close()
        f = open("ModME/tableAdditions/" + uString + "/views.txt", "w")
        f.write(survey + '\n')
        f.write(request.POST.get('viewSave') + '\n')
        f.write(request.POST.get('viewArray') + '\n')
        f.write(request.POST.get('viewParse') + '\n')
        f.close()
        t = TableAdd(
                tableName=request.POST.get('tableName'),
                uniqueString=uString,
                applyed=False
        )
        t.save()

    return render(request, 'ModME/index3.html',
    {'parameters_list': Experiment.objects.order_by('name'),
    'meta_list': Metadata.objects.order_by('id'),
    'experiment_id': experiment_id,
    'session_id': session_id,
    'study_id': study_id,
    'participant_id': remote_participant_id})


def icd(request):

    experimentId = request.POST['experimentId']
    participantAlias = request.POST['participantAlias']
    sessionName = request.POST['sessionName']
    studyName = request.POST['studyName']
    metadataId = None
    if ('metadata_id' in request.POST):
        metadataId = request.POST['metadata_id']
    conditionIndex = 0

    conditionList = ""
    if ('conditionList' in request.POST):
        conditionList = request.POST['conditionList']

    experimentModel = Experiment.objects.get(id=experimentId)

    parameters = {
        'experimentId': experimentId,
        'conditionList': conditionList,
        'participantAlias': participantAlias,
        'sessionName': sessionName,
        'studyName': studyName,
        'metadataId': metadataId,
        'pdf': experimentModel.irb_pdf,
        'icdText': experimentModel.icd_confirmation_text,
        'skipICD': experimentModel.skip_irb,
    }

    return render(request, 'ModME/ICD.html', parameters)

def downloadDatabase(request):
    #test that the request is from a user who is logged in and is allowed to view the database
    if (not request.user.is_authenticated) or (not request.user.has_perm('auth.view_user')):
        return HttpResponseForbidden()

    

    filePath = os.path.join(os.getcwd(), "db.sqlite3")
    print(filePath)
    if os.path.exists(filePath):
        #output = open("dbDump.sqlite3",'w') # Point stdout at a file for dumping data to.
        #call_command('dumpdata',format='sqlite3',indent=3,stdout=output)
        #output.close()
        shutil.copyfile("db.sqlite3", "dump.sqlite3")
        con = sqlite3.connect("dump.sqlite3")
        cursor = con.cursor()
        cursor.execute("DROP TABLE auth_group")
        cursor.execute("DROP TABLE auth_group_permissions")
        cursor.execute("DROP TABLE auth_permission")
        cursor.execute("DROP TABLE auth_user")
        cursor.execute("DROP TABLE auth_user_groups")
        cursor.execute("DROP TABLE auth_user_user_permissions")
        cursor.execute("DROP TABLE django_admin_log")
        cursor.execute("DROP TABLE django_content_type")
        cursor.execute("DROP TABLE django_migrations")
        cursor.execute("DROP TABLE django_session")
        con.commit()
        con.close()
        with open(os.path.join(os.getcwd(), "dump.sqlite3"), 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/vnd.sqlite3")
            response['Content-Disposition'] = 'attachment; filename=db.sqlite3'
        os.remove("dump.sqlite3")
        return response
    raise HttpResponseNotFound()

