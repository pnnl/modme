# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0002_auto_20150622_1058'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Conditions',
            new_name='Condition',
        ),
        migrations.RenameModel(
            old_name='Tasks',
            new_name='Task',
        ),
    ]
