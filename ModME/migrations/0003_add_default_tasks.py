# vim: set fileencoding=utf-8 :


from django.db import migrations
from ModME.models import (
    Task,
    File,
)


def addDefaultTasks(apps, schema_editor):
    if not schema_editor.connection.alias == 'default':
        return
    communication = Task.objects.get_or_create(fileName='ModME/communication.js', taskName='Communication', configurator='ModME/communicationConfigurator.js')[0]
    monitoring = Task.objects.get_or_create(fileName='ModME/monitoring.js', taskName='Monitoring', configurator='ModME/monitoringConfigurator.js')[0]
    tracking = Task.objects.get_or_create(fileName='ModME/tracking.js', taskName='Tracking', configurator='ModME/trackingConfigurator.js')[0]
    resource = Task.objects.get_or_create(fileName='ModME/resource.js', taskName='Resource', configurator='ModME/resourceConfigurator.js')[0]
    audiocommunication = Task.objects.get_or_create(fileName='ModME/AudioCommunication.js', taskName='AudioCommunication', configurator='ModME/audiocommunicationConfigurator.js')[0]
    crosstracking = Task.objects.get_or_create(fileName='ModME/crossHairTracking.js', taskName='CrossHairTracking', configurator='ModME/crosshairtrackingConfigurator.js')[0]
    aircraftCoordination = Task.objects.get_or_create(fileName='ModME/aircraftCoordination.js', taskName='AircraftCoordination', configurator='ModME/aircraftCoordinationConfigurator.js')[0]

    File.objects.get_or_create(name='ModME/MAT-B_Communication_chart.js', task=communication)
    File.objects.get_or_create(name='d3/d3.v3.min.js', task=communication)
    File.objects.get_or_create(name='ModME/MAT-B_Styles.css', task=communication)
    File.objects.get_or_create(name='ModME/guiUtil.js', task=communication)
    File.objects.get_or_create(name='ModME/MAT-B_Monitoring_chart.js', task=monitoring)
    File.objects.get_or_create(name='d3/d3.v3.min.js', task=monitoring)
    File.objects.get_or_create(name='ModME/MAT-B_Styles.css', task=monitoring)
    File.objects.get_or_create(name='ModME/guiUtil.js', task=monitoring)
    File.objects.get_or_create(name='ModME/MAT-B_Resource_chart.js', task=resource)
    File.objects.get_or_create(name='d3/d3.v3.min.js', task=resource)
    File.objects.get_or_create(name='ModME/MAT-B_Styles.css', task=resource)
    File.objects.get_or_create(name='ModME/guiUtil.js', task=resource)
    File.objects.get_or_create(name='ModME/MAT-B_Tracking_chart.js', task=tracking)
    File.objects.get_or_create(name='d3/d3.v3.min.js', task=tracking)
    File.objects.get_or_create(name='ModME/MAT-B_Styles.css', task=tracking)
    File.objects.get_or_create(name='ModME/guiUtil.js', task=tracking)
    File.objects.get_or_create(name='ModME/MAT-B_AudioCommunication_chart.js', task=audiocommunication)
    File.objects.get_or_create(name='d3/d3.v3.min.js', task=audiocommunication)
    File.objects.get_or_create(name='ModME/MAT-B_Styles.css', task=audiocommunication)
    File.objects.get_or_create(name='ModME/guiUtil.js', task=audiocommunication)
    
    File.objects.get_or_create(name='ModME/MAT-B_CrossHairTacking_chart.js', task=crosstracking)
    File.objects.get_or_create(name='d3/d3.v3.min.js', task=crosstracking)
    File.objects.get_or_create(name='ModME/MAT-B_Styles.css', task=crosstracking)
    File.objects.get_or_create(name='ModME/guiUtil.js', task=crosstracking)

    File.objects.get_or_create(name='ModME/MAT-B_AircraftCoordination_chart.js', task=aircraftCoordination)
    File.objects.get_or_create(name='d3/d3.v3.min.js', task=aircraftCoordination)
    File.objects.get_or_create(name='ModME/MAT-B_Styles.css', task=aircraftCoordination)
    File.objects.get_or_create(name='ModME/guiUtil.js', task=aircraftCoordination)
    


def removeDefaultTasks(apps, schema_editor):
    if not schema_editor.connection.alias == 'default':
        return
    Task.objects.filter(taskName__in=['Communication', 'Monitoring', 'Tracking', 'Resource', 'AudioCommunication', 'AircraftCoordination']).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(addDefaultTasks, reverse_code=removeDefaultTasks),
    ]

