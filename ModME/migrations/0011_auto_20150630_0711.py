# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0010_auto_20150624_1121'),
    ]

    operations = [
        migrations.AddField(
            model_name='condition',
            name='task1',
            field=models.IntegerField(default=-1),
        ),
        migrations.AddField(
            model_name='condition',
            name='task1Data',
            field=models.CharField(default={}, max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='condition',
            name='task2',
            field=models.IntegerField(default=-1),
        ),
        migrations.AddField(
            model_name='condition',
            name='task2Data',
            field=models.CharField(default={}, max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='condition',
            name='task3',
            field=models.IntegerField(default=-1),
        ),
        migrations.AddField(
            model_name='condition',
            name='task3Data',
            field=models.CharField(default={}, max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='condition',
            name='task4',
            field=models.IntegerField(default=-1),
        ),
        migrations.AddField(
            model_name='condition',
            name='task4Data',
            field=models.CharField(default={}, max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='task',
            name='configurator',
            field=models.CharField(default='config.js', max_length=200),
            preserve_default=False,
        ),
    ]
