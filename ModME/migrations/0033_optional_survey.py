# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from ModME.models import Survey


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0032_study_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='condition',
            name='surveys',
            field=models.ManyToManyField(Survey, blank=True)
        )
    ]
