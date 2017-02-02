# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0009_auto_20150624_1113'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='taskname',
            new_name='taskName',
        ),
    ]
