# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0022_delete_pvt'),
    ]

    operations = [
        migrations.CreateModel(
            name='PVC',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Time', models.IntegerField(default=3)),
                ('Name', models.CharField(max_length=200)),
            ],
        ),
    ]
