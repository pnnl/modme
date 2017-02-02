# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0025_survay'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='survay',
            options={'verbose_name': 'Survay', 'verbose_name_plural': 'Survays'},
        ),
        migrations.AddField(
            model_name='condition',
            name='survays',
            field=models.ManyToManyField(to='ModME.Survay'),
        ),
    ]
