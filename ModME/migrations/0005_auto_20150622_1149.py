# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0004_auto_20150622_1137'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bedford',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sessionID', models.CharField(default=b' ', max_length=500)),
                ('time', models.IntegerField()),
                ('rating', models.IntegerField(default=-1)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time', models.IntegerField()),
                ('sessionID', models.CharField(max_length=500)),
                ('eventType', models.CharField(max_length=200)),
                ('chart', models.CharField(max_length=200)),
                ('arg', models.CharField(max_length=200)),
                ('domID', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Metadata',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('startTime', models.IntegerField()),
                ('sessionID', models.CharField(max_length=500)),
                ('duration', models.IntegerField()),
                ('resource', models.BooleanField()),
                ('tracking', models.BooleanField()),
                ('monitoring', models.BooleanField()),
                ('communication', models.BooleanField()),
                ('participantID', models.CharField(max_length=500)),
                ('sessionNumber', models.CharField(max_length=500)),
                ('condition', models.CharField(max_length=500)),
            ],
            options={
                'verbose_name_plural': 'Metadata',
            },
        ),
        migrations.CreateModel(
            name='MouseTracking',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time', models.IntegerField()),
                ('sessionID', models.CharField(max_length=500)),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
                ('domID', models.CharField(max_length=200)),
                ('targetX', models.FloatField()),
                ('targetY', models.FloatField()),
            ],
            options={
                'verbose_name': 'Mouse Tracking',
                'verbose_name_plural': 'Mouse Trackings',
            },
        ),
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
                ('tasks', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name': 'Nasa TLX',
                'verbose_name_plural': 'Nasa TLX',
            },
        ),
        migrations.CreateModel(
            name='ResourceSwitch',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time', models.IntegerField()),
                ('sessionID', models.CharField(max_length=500)),
                ('switchNumber', models.IntegerField()),
                ('state', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name': 'Resource Switch',
                'verbose_name_plural': 'Resource Switches',
            },
        ),
        migrations.CreateModel(
            name='ResourceTank',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time', models.IntegerField()),
                ('sessionID', models.CharField(max_length=500)),
                ('tankNumber', models.IntegerField()),
                ('state', models.FloatField()),
            ],
            options={
                'verbose_name': 'Resource Tank',
                'verbose_name_plural': 'Resource Tanks',
            },
        ),
        migrations.CreateModel(
            name='Tracking',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time', models.IntegerField()),
                ('sessionID', models.CharField(max_length=500)),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
                ('domID', models.CharField(max_length=200)),
                ('state', models.CharField(max_length=200)),
                ('mouseX', models.FloatField()),
                ('mouseY', models.FloatField()),
            ],
        ),
        migrations.AlterField(
            model_name='condition',
            name='manageRefresh',
            field=models.IntegerField(default=0, verbose_name=b'Refresh Rate for tracking task'),
        ),
        migrations.AlterField(
            model_name='condition',
            name='trackRefresh',
            field=models.IntegerField(default=0, verbose_name=b'Refresh rate for tracking task'),
        ),
    ]
