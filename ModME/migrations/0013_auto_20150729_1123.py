# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0012_auto_20150707_1156'),
    ]

    operations = [
        migrations.CreateModel(
            name='goNoGo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sessionID', models.CharField(max_length=500)),
                ('time_elapsed', models.IntegerField()),
                ('key_press', models.IntegerField()),
                ('response', models.CharField(max_length=5)),
                ('rt', models.IntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='condition',
            name='task1Data',
            field=models.CharField(max_length=5000),
        ),
        migrations.AlterField(
            model_name='condition',
            name='task2Data',
            field=models.CharField(max_length=5000),
        ),
        migrations.AlterField(
            model_name='condition',
            name='task3Data',
            field=models.CharField(max_length=5000),
        ),
        migrations.AlterField(
            model_name='condition',
            name='task4Data',
            field=models.CharField(max_length=5000),
        ),
    ]
