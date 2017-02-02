# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0023_pvc'),
    ]

    operations = [
        migrations.DeleteModel(
            name='PVC',
        ),
        migrations.AddField(
            model_name='condition',
            name='task1GUI',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='condition',
            name='task2GUI',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='condition',
            name='task3GUI',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='condition',
            name='task4GUI',
            field=models.BooleanField(default=False),
        ),
    ]
