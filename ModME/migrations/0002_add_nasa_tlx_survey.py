# vim: set fileencoding=utf-8 :


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
        ('ModME', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(addNasaTlxSurvey, reverse_code=removeNasaTlxSurvey),
    ]

