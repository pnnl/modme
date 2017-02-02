# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0005_auto_20150622_1149'),
    ]

    operations = [
        migrations.RenameField(
            model_name='condition',
            old_name='monitordata',
            new_name='monitorData',
        ),
    ]
