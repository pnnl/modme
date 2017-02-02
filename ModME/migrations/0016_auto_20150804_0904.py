# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0015_auto_20150804_0903'),
    ]

    operations = [
        migrations.AlterField(
            model_name='metadata',
            name='task2',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='metadata',
            name='task3',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='metadata',
            name='task4',
            field=models.IntegerField(),
        ),
    ]
