# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0014_auto_20150730_0756'),
    ]

    operations = [
        migrations.DeleteModel(
            name='goNoGo',
        ),
        migrations.AlterField(
            model_name='condition',
            name='task1Data',
            field=models.CharField(default=b'{}', max_length=5000),
        ),
        migrations.AlterField(
            model_name='condition',
            name='task2Data',
            field=models.CharField(default=b'{}', max_length=5000),
        ),
        migrations.AlterField(
            model_name='condition',
            name='task3Data',
            field=models.CharField(default=b'{}', max_length=5000),
        ),
        migrations.AlterField(
            model_name='condition',
            name='task4Data',
            field=models.CharField(default=b'{}', max_length=5000),
        ),
        migrations.AlterField(
            model_name='metadata',
            name='task1',
            field=models.IntegerField(),
        ),
    ]
