# vim: set fileencoding=utf-8 :
from __future__ import unicode_literals

from django.db import migrations
from ModME.models import (
    Task,
    File,
)

def addDefaultTasks(apps, schema_editor):
    if not schema_editor.connection.alias == 'default':
        return
    communication = Task.objects.get_or_create(fileName='ModME/communication.js', taskName='Communication', configurator='ModME/communicationConfigurator.js')[0]
    monitoring    = Task.objects.get_or_create(fileName='ModME/monitoring.js', taskName='Monitoring', configurator='ModME/monitoringConfigurator.js')[0]
    tracking      = Task.objects.get_or_create(fileName='ModME/tracking.js', taskName='Tracking', configurator='ModME/trackingConfigurator.js')[0]
    resource      = Task.objects.get_or_create(fileName='ModME/resource.js', taskName='Resource', configurator='ModME/resourceConfigurator.js')[0]
    File.objects.get_or_create(name='ModME/MAT-B_Communication_chart.js', task=communication)
    File.objects.get_or_create(name='d3/d3.v3.min.js'                   , task=communication)
    File.objects.get_or_create(name='ModME/MAT-B_Styles.css'            , task=communication)
    File.objects.get_or_create(name='ModME/guiUtil.js'                  , task=communication)
    File.objects.get_or_create(name='ModME/MAT-B_Monitoring_chart.js'   , task=monitoring   )
    File.objects.get_or_create(name='d3/d3.v3.min.js'                   , task=monitoring   )
    File.objects.get_or_create(name='ModME/MAT-B_Styles.css'            , task=monitoring   )
    File.objects.get_or_create(name='ModME/guiUtil.js'                  , task=monitoring   )
    File.objects.get_or_create(name='ModME/MAT-B_Resource_chart.js'     , task=resource     )
    File.objects.get_or_create(name='d3/d3.v3.min.js'                   , task=resource     )
    File.objects.get_or_create(name='ModME/MAT-B_Styles.css'            , task=resource     )
    File.objects.get_or_create(name='ModME/guiUtil.js'                  , task=resource     )
    File.objects.get_or_create(name='ModME/MAT-B_Tracking_chart.js'     , task=tracking     )
    File.objects.get_or_create(name='d3/d3.v3.min.js'                   , task=tracking     )
    File.objects.get_or_create(name='ModME/MAT-B_Styles.css'            , task=tracking     )
    File.objects.get_or_create(name='ModME/guiUtil.js'                  , task=tracking     )

def removeDefaultTasks(apps, schema_editor):
    if not schema_editor.connection.alias == 'default':
        return
    Task.objects.filter(taskName__in=['Communication', 'Monitoring', 'Tracking', 'Resource']).delete()

class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0033_optional_survey'),
    ]

    operations = [
        migrations.RunPython(addDefaultTasks, reverse_code=removeDefaultTasks),
    ]

