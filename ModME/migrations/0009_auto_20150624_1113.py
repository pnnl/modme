# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0008_auto_20150624_1112'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('task', models.ForeignKey(to='ModME.Task')),
            ],
        ),
        migrations.RemoveField(
            model_name='files',
            name='task',
        ),
        migrations.DeleteModel(
            name='Files',
        ),
    ]
