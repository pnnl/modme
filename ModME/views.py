from django.shortcuts import render
from django.http import HttpResponseRedirect
from ModME.models import (
    Condition,
    Metadata,
    Event,
    ResourceTank,
    ResourceSwitch,
    Tracking,
    MouseTracking,
    Task,
    TableAdd,
    NasaTlx,
# End of model imports
)
import json
import string
import random
import os

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

    return render(request, 'ModME/index.html', {'parameters_list': Condition.objects.order_by('Name'), 'meta_list': Metadata.objects.order_by('id')})

# Loads ModME experiment
# Receives parameter object, Participant ID, session number, and condition from Index page
# Sends Data at the end of experiment to intermediate Done page


def experiment(request):
    condition = Condition.objects.get(pk=request.POST['parameter_id'])
    taskFiles = [condition.task1, condition.task2, condition.task3, condition.task4]
    requiredFiles = ["d3/d3.v3.min.js", "d3/d3.chart.min.js"]
    tasks = []
    taskNames = []
    cssList = []
    for i in range(len(taskFiles)):
        k = taskFiles[i]
        if k != -1 and k != -2:
            tempTask = Task.objects.get(pk=k)
            tasks.append(tempTask)
            taskNames.append(tempTask.taskName)
            for j in tempTask.file_set.all():
                if j.name[-3:] == "css":
                    if j.name not in cssList:
                        cssList.append(j.name)
                else:
                    if j.name not in requiredFiles:
                        requiredFiles.append(j.name)
        elif k != -1:
            taskNames.append("placeholder" + str(i))
        else:
            taskNames.append("blank" + str(i))
    partID = request.POST['participant_id']
    sess = request.POST['sessionNumber']
    context = {
        'parameters': condition,
        'participant_id': partID,
        'sessionNumber': sess,
        'fileList': requiredFiles,
        'taskList': tasks,
        'taskNames': taskNames,
        'cssList': cssList,
    }
    renderedPage = render(request, 'ModME/experiment.html', context)
    return renderedPage

# Loads intermediate page
# Purpose of intermediate page is to give a visual cue that the experiment is done while saving data in case data save takes a long time
# Receives data stringified array from Experiment page
# Sends unchanged data array to Complete page


def done(request):
    data = request.POST.get('data')
    tasks = request.POST.get('tasks')
    myId = request.POST.get('id')
    return render(request, 'ModME/done.html', {'data': data, 'tasks': tasks, 'id': myId})


# Loads single parameter object that can be configured
# Receives parameter object
# Sends updated object to Save page
def configuration(request, parameter_id):
    condition = Condition.objects.get(pk=parameter_id)
    cssList = []
    requiredFiles = ["d3/d3.v3.min.js", "d3/d3.chart.min.js"]
    for taskID in Task.objects.order_by('fileName'): # TODO refactor down to (two?) lines of code after model changes
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
    condition = Condition.objects.get(pk=request.POST.get('parameterId'))

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

        condition.experiment_duration = request.POST.get('duration')
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
            experiment_duration=request.POST.get('duration'),
            param_name=request.POST.get('name')
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
    data = json.loads(request.POST.get('data'))
    conditionID = request.POST.get('id')
    condition = Condition.objects.get(pk=conditionID)
    metadata = Metadata(
        startTime=data[0]["time"],
        sessionID=data[0]["sessionID"],
        duration=data[0]["duration"],
        task1=data[0]["task1"],
        task2=data[0]["task2"],
        task3=data[0]["task3"],
        task4=data[0]["task4"],
        participantID=data[0]["participantID"],
        sessionNumber=data[0]["sessionNumber"],
        condition=condition,
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
                    arg=info["arg"],
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
                    sessionID=info["sessionID"],
                    switchNumber=info["switchNumber"],
                    state=info["state"]
                )
            )
        elif info["table"] == "Tank":
            tanks.append(
                ResourceTank(
                    time=info["time"],
                    sessionID=info["sessionID"],
                    tankNumber=info["tankNumber"],
                    state=info["state"]
                )
            )
        elif info["table"] == "Mouse":
            mouse.append(
                MouseTracking(
                    time=info["time"],
                    sessionID=info["sessionID"],
                    x=info["x"],
                    y=info["y"],
                    domID=info["domID"],
                    targetX=info["targetX"],
                    targetY=info["targetY"]
                )
            )


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

    print condition
    print condition.surveys.all()[0].fileName

    template = 'ModME/complete.html'
    context = None
    if not condition.surveys.all():
        requiredFiles = ["d3/d3.v3.min.js", "d3/d3.chart.min.js"]
        for j in condition.surveys.all()[0].surveyfile_set.all():
            if j.name not in requiredFiles:
                requiredFiles.append(j.name)
        template = 'ModME/survey.html'
        context = {
            'condition': condition,
            'ind': 0,
            'fileList': requiredFiles,
            "sessionID": data[0]["sessionID"],
            'survey': condition.surveys.all()[0].fileName
        }
    renderedPage = render(request, template, context)
    return renderedPage


def survey(request):
    data = json.loads(request.POST.get('data'))
    ind = int(request.POST.get('ind'))
    condId = request.POST.get('condId')
    surveyName = Condition.objects.get(pk=condId).surveys.all()[ind].name
    sessionID = request.POST.get('sessionID')

    if surveyName == "NasaTlx" or surveyName == "NasaTlx2":
        s = NasaTlx(
            sessionID=sessionID,
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
    if ind + 1 < len(Condition.objects.get(pk=condId).surveys.all()):
        ind = ind + 1
        requiredFiles = ["d3/d3.v3.min.js", "d3/d3.chart.min.js"]
        for j in Condition.objects.get(pk=condId).surveys.all()[0].surveyfile_set.all():
            if j.name not in requiredFiles:
                requiredFiles.append(j.name)
        context = {
            'condition': Condition.objects.get(pk=condId),
            'ind': ind,
            'fileList': requiredFiles,
            'sessionID': sessionID,
            'survey': Condition.objects.get(pk=condId).surveys.all()[ind].fileName
        }
        template = 'ModME/survey.html'
    renderedPage = render(request, template, context)
    return renderedPage


def begin(request):
    para = request.POST['parameter_id']
    partID = request.POST['participant_id']
    sess = request.POST['sessionNumber']
    return render(request, 'ModME/begin.html', {'parameters': para, 'participant_id': partID, 'sessionNumber': sess})


def explanation(request):
    return render(request, 'ModME/explanation.html')


def tableAdd(request):
    return render(request, 'ModME/autoGen.html')
