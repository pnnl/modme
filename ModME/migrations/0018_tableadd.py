# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0017_auto_20150806_0746'),
    ]

    operations = [
        migrations.CreateModel(
            name='TableAdd',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('model', models.CharField(max_length=9)),
                ('view', models.CharField(max_length=8)),
                ('admin', models.CharField(max_length=9)),
                ('uniqueString', models.CharField(max_length=30)),
            ],
        ),
    ]
