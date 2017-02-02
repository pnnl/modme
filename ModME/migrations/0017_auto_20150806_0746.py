# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0016_auto_20150804_0904'),
    ]

    operations = [
        migrations.AlterField(
            model_name='metadata',
            name='duration',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='metadata',
            name='task1',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='metadata',
            name='task2',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='metadata',
            name='task3',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='metadata',
            name='task4',
            field=models.CharField(max_length=500),
        ),
    ]
