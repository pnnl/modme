# vim: set fileencoding=utf-8 :
from __future__ import unicode_literals

from django.db import migrations
from ModME.models import (
    Survey,
    SurveyFile,
)

def addNasaTlxSurvey(apps, schema_editor):
    if not schema_editor.connection.alias == 'default':
        return
    nasatlx = Survey.objects.get_or_create(name='NasaTlx', fileName='ModME/nasatlx.js')[0]
    nasatlxFiles = SurveyFile.objects.get_or_create(survey=nasatlx, name='d3/d3.v3.min.js')[0]

def removeNasaTlxSurvey(apps, schema_editor):
    if not schema_editor.connection.alias == 'default':
        return
    Survey.objects.filter(name='NasaTlx').delete()

class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0036_rename_surveyfile_survey_property'),
    ]

    operations = [
        migrations.RunPython(addNasaTlxSurvey, reverse_code=removeNasaTlxSurvey),
    ]

