# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0026_auto_20160407_1329'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Survay',
            new_name='Survey',
        ),
        migrations.AlterModelOptions(
            name='survey',
            options={'verbose_name': 'Survey', 'verbose_name_plural': 'Surveys'},
        ),
        migrations.RenameField(
            model_name='condition',
            old_name='survays',
            new_name='surveys',
        ),
    ]
