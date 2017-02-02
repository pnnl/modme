# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0018_tableadd'),
    ]

    operations = [
        migrations.AddField(
            model_name='tableadd',
            name='applyed',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]
