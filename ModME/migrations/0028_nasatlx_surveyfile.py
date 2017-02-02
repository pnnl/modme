# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0027_auto_20160407_1611'),
    ]

    operations = [
        migrations.CreateModel(
            name='NasaTlx',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sessionID', models.CharField(default=b' ', max_length=500)),
                ('time', models.IntegerField()),
                ('mental', models.IntegerField(default=-1)),
                ('physical', models.IntegerField(default=-1)),
                ('temporal', models.IntegerField(default=-1)),
                ('performance', models.IntegerField(default=-1)),
                ('effort', models.IntegerField(default=-1)),
                ('frustration', models.IntegerField(default=-1)),
                ('fatigue', models.IntegerField(default=-1)),
                ('boredom', models.IntegerField(default=-1)),
            ],
            options={
                'verbose_name': 'Nasa TLX',
                'verbose_name_plural': 'Nasa TLX',
            },
        ),
        migrations.CreateModel(
            name='SurveyFile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('task', models.ForeignKey(to='ModME.Survey')),
            ],
        ),
    ]
