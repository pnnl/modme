# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0013_auto_20150729_1123'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Bedford',
        ),
        migrations.DeleteModel(
            name='NasaTlx',
        ),
        migrations.RemoveField(
            model_name='metadata',
            name='communication',
        ),
        migrations.RemoveField(
            model_name='metadata',
            name='monitoring',
        ),
        migrations.RemoveField(
            model_name='metadata',
            name='resource',
        ),
        migrations.RemoveField(
            model_name='metadata',
            name='tracking',
        ),
        migrations.AddField(
            model_name='metadata',
            name='task1',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='metadata',
            name='task2',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='metadata',
            name='task3',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='metadata',
            name='task4',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
    ]
