# vim: set fileencoding=utf-8 :


from django.db import migrations
from ModME.models import (
    Condition,
    Survey,
    Experiment,
)


def addExampleTasks(apps, schema_editor):
    if not schema_editor.connection.alias == 'default':
        return

    exampleCondition = Condition(id='1', Name='ExampleCondition',experimentDuration='1',instructional_pdf='static/PDF/empty.pdf',condition_ending_message='Condition Ending Message', notes='Testing notes', task1='1', task1Data='{"channels":[{"name":"OPS 1","avalibleFrequency":[1173,1231,1123,1131],"differential":6,"prob":1,"frequency":1463},{"name":"OPS 2","avalibl_eFrequency":[1235,1231,1123,1131],"differential":6,"prob":1,"frequency":1199},{"name":"INT 1","avalibleFrequency":[1141,1231,1123,1131],"differential":6,"prob":1,"frequency":1525},{"name":"INT 2","avalibleFrequency":[1259,1231,1123,1131],"differential":6,"prob":1,"frequency":1213}],"target":{"name":"INT 2","frequency":1217},"distractor":false,"mouseVersion":true,"response":8000,"startFunction":5000,"absoluteMin":1100,"absoluteMax":1600,"eventFunction":"(Math.random()*(comm_param.max-comm_param.min))+comm_param.min;","parameters":{"min":8000,"max":14000},"controller":{"indexUp":40,"indexDown":38,"frequencyDown":37,"frequencyUp":39,"accept":13},"currentAlert":{"domID":"comm_channel_3_name","channel":3,"target":1217,"current":1213}}',task1GUI='1', task2='3', task2Data='{"orbits":[{"points":[{"x":0.643,"y":0.848},{"x":0.658,"y":0.821},{"x":0.357,"y":0.152},{"x":0.342,"y":0.179}],"interval":30000,"radius":13,"prob":1,"width":"3px"},{"points":[{"x":0.28,"y":0.402},{"x":0.277,"y":0.442},{"x":0.72,"y":0.598},{"x":0.723,"y":0.558}],"interval":30000,"radius":13,"prob":1,"width":"3px"},{"points":[{"x":0.285,"y":0.636},{"x":0.72,"y":0.403},{"x":0.715,"y":0.364},{"x":0.28,"y":0.597}],"interval":30000,"radius":13,"prob":1,"width":"3px"}],"parameters":{"min":8000,"max":14000},"eventFunction":"(Math.random()*(track_param.max-track_param.min))+track_param.min;","startFunction":5000,"refresh":100,"distractor":false}',task2GUI='1',task3='2', task3Data='{"scales":[{"button":112,"key":"F1","slider_interval":2000,"prob":1,"i":17,"y":5,"x":1.5,"alert":4,"correct":0,"event":false,"index":2},{"button":113,"key":"F2","slider_interval":1400,"prob":1,"i":24,"y":3,"x":4,"alert":4,"correct":0,"event":false,"index":3},{"button":114,"key":"F3","slider_interval":1000,"prob":1,"i":34,"y":3,"x":6.5,"alert":4,"correct":0,"event":false,"index":4},{"button":115,"key":"F4","slider_interval":1600,"prob":1,"i":21,"y":5,"x":9,"alert":4,"correct":0,"event":false,"index":5}],"buttons":[{"color":"lightgreen","button":116,"key":"F5","alert_color":"black","autoCorrect":8000,"prob":1,"alert":false},{"color":"black","button":117,"key":"F6","alert_color":"red","autoCorrect":8000,"prob":1,"alert":false}],"range":[3,5],"ticks":7,"distractor":false,"parameters":{"min":8000,"max":14000},"eventFunction":"(Math.random()*(monitor_param.max-monitor_param.min))+monitor_param.min;","startFunction":5000,"event_range":[1,7]}',task3GUI='1', task4='4', task4Data='{"tanks":[{"label":"A","x":3,"y":8.75,"width":4,"height":3.75,"decayRate":0.0125,"startingResource":2400,"maxResource":4000,"targetRangeMax":2800,"targetRangeMin":2100,"index":0,"resource":1722.5,"delta":-1.25},{"label":"B","x":11,"y":8.75,"width":4,"height":3.75,"decayRate":0.0125,"startingResource":2400,"maxResource":4000,"targetRangeMax":2800,"targetRangeMin":2100,"index":1,"resource":1722.5,"delta":-1.25},{"label":"C","x":2,"y":3,"width":2,"height":2,"decayRate":0,"startingResource":1000,"maxResource":2000,"index":2,"resource":1000,"delta":0},{"label":"D","x":10,"y":3,"width":2,"height":2,"decayRate":0,"startingResource":1000,"maxResource":2000,"index":3,"resource":1000,"delta":0}],"generators":[{"label":"S1","resource":null,"cx":7,"cy":2,"r":1,"index":100,"delta":0},{"label":"S2","resource":null,"cx":15,"cy":2,"r":1,"index":101,"delta":0}],"switches":[{"source":2,"target":0,"transferRate":0.008,"x1":3.5,"y1":5,"x2":3.5,"y2":3,"textX":2.5,"textY":3.9,"rotation":-90,"on":0,"key":49,"keyboard":"1","repairTime":4000,"prob":1,"alert":false},{"source":100,"target":0,"transferRate":0.008,"x1":6.5,"y1":5,"x2":6.5,"y2":2.85,"textX":5.5,"textY":3.9,"rotation":-90,"on":0,"key":50,"keyboard":"2","repairTime":4000,"prob":1,"alert":false},{"source":3,"target":1,"transferRate":0.008,"x1":11.5,"y1":5,"x2":11.5,"y2":3,"textX":10.5,"textY":3.9,"rotation":-90,"on":0,"key":51,"keyboard":"3","repairTime":4000,"prob":1,"alert":false},{"source":101,"target":1,"transferRate":0.008,"x1":14.5,"y1":5,"x2":14.5,"y2":2.85,"textX":13.5,"textY":3.9,"rotation":-90,"on":0,"key":52,"keyboard":"4","repairTime":4000,"prob":1,"alert":false},{"source":100,"target":2,"transferRate":0.0133,"x1":4,"y1":2,"x2":6,"y2":2,"on":0,"textX":4.9,"textY":1,"rotation":180,"key":53,"keyboard":"5","repairTime":4000,"prob":1,"alert":false},{"source":101,"target":3,"transferRate":0.0133,"x1":12,"y1":2,"x2":14,"y2":2,"on":false,"textX":12.9,"textY":1,"rotation":180,"key":54,"keyboard":"6","repairTime":4000,"prob":1,"alert":false,"count":4000},{"source":0,"target":1,"transferRate":0.00833,"x1":7,"y1":7.75,"x2":11,"y2":7.75,"on":0,"textX":8.85,"textY":8.5,"rotation":0,"key":55,"keyboard":"7","repairTime":4000,"prob":1,"alert":false},{"source":1,"target":0,"transferRate":0.00833,"x1":7,"y1":6.25,"x2":11,"y2":6.25,"on":false,"textX":8.85,"textY":5.25,"rotation":180,"key":56,"keyboard":"8","repairTime":4000,"prob":1,"alert":false,"count":4000}],"eventFunction":"(Math.random()*(resource_param.max-resource_param.min))+resource_param.min;","startFunction":5000,"parameters":{"min":8000,"max":14000},"refresh":100,"distractor":false,"currentAlert":{"domID":"resource_switch_5","channel":5}}',task4GUI='1', skip_instructions='0')
    exampleCondition.save()
    nasaSurvey = Survey.objects.filter(name='NasaTlx').first()
    exampleCondition.surveys.add(nasaSurvey)
    
def removeExampleTasks(apps, schema_editor):
    if not schema_editor.connection.alias == 'default':
        return
    Condition.objects.filter(conditionName__in=['ExampleCondition']).delete()

def addExampleExperiment(apps, schema_editor):
    if not schema_editor.connection.alias == 'default':
        return
      
    exampleExperiment = Experiment.objects.get_or_create(id='1', name='ExampleExperiment', irb_pdf='static/PDF/Test_PDF.pdf', skip_irb='0', icd_confirmation_text='By clicking the \'Next\' button below, I confirm that I have read the above information, meet the eligibility criteria for participating, and agree to participate in this study.', instructional_pdf='static/PDF/Test_PDF2.pdf', skip_instructions=0, instructional_text='Instructional Confirmation Text', random='0', conditions='1', experiment_ending_message='Experiment Ending Message', notes='Example Experiment')

def removeExampleExperiment(apps, schema_editor):
    if not schema_editor.connection.alias == 'default':
        return
    
    Experiment.objects.filter(conditionName__in=['ExampleExperiment']).delete()
    
class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0005_auto_20211118_1142'),
    ]

    operations = [
        migrations.RunPython(addExampleTasks, reverse_code=removeExampleTasks),
        migrations.RunPython(addExampleExperiment, reverse_code=removeExampleExperiment),
    ]
