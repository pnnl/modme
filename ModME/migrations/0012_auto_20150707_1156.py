# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0011_auto_20150630_0711'),
    ]

    operations = [
        migrations.RenameField(
            model_name='condition',
            old_name='paramName',
            new_name='Name',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='commData',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='commEventFunction',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='commEventParameters',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='commFirstEvent',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='commResponseTime',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='commShow',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='manageData',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='manageEventFunction',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='manageEventParameters',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='manageFirstEvent',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='manageRefresh',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='manageShow',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='monitorData',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='monitorEventFunction',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='monitorEventParameters',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='monitorFirstEvent',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='monitorShow',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='trackData',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='trackEventFunction',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='trackEventParameters',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='trackFirstEvent',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='trackRefresh',
        ),
        migrations.RemoveField(
            model_name='condition',
            name='trackShow',
        ),
    ]
