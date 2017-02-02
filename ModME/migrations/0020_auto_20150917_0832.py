# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0019_tableadd_applyed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tableadd',
            name='admin',
        ),
        migrations.RemoveField(
            model_name='tableadd',
            name='model',
        ),
        migrations.RemoveField(
            model_name='tableadd',
            name='view',
        ),
        migrations.AddField(
            model_name='tableadd',
            name='tableName',
            field=models.CharField(default='Delete', max_length=100),
            preserve_default=False,
        ),
    ]
