# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0030_delete_test'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tracking',
            name='sessionID',
        ),
        migrations.AddField(
            model_name='tracking',
            name='metadata',
            field=models.ForeignKey(default=1, to='ModME.Metadata'),
            preserve_default=False,
        ),
    ]
