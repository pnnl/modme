# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0031_third_normal'),
    ]

    operations = [
        migrations.AddField(
            model_name='session',
            name='study',
            field=models.CharField(max_length=500, default='')
        )
    ]
