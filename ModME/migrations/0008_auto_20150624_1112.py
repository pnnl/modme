# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0007_file'),
    ]

    operations = [
        migrations.CreateModel(
            name='Files',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('task', models.ForeignKey(to='ModME.Task')),
            ],
        ),
        migrations.RemoveField(
            model_name='file',
            name='task',
        ),
        migrations.DeleteModel(
            name='file',
        ),
    ]
