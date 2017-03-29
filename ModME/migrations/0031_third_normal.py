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
        migrations.RemoveField(
            model_name='event',
            name='sessionID',
        ),
        migrations.RemoveField(
            model_name='nasatlx',
            name='sessionID',
        ),
        migrations.RemoveField(
            model_name='mousetracking',
            name='sessionID',
        ),
        migrations.RemoveField(
            model_name='resourceswitch',
            name='sessionID',
        ),
        migrations.RemoveField(
            model_name='resourcetank',
            name='sessionID',
        ),
        migrations.AddField(
            model_name='mousetracking',
            name='metadata',
            field=models.ForeignKey(default=1, to='ModME.Metadata'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='resourceswitch',
            name='metadata',
            field=models.ForeignKey(default=1, to='ModME.Metadata'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='resourcetank',
            name='metadata',
            field=models.ForeignKey(default=1, to='ModME.Metadata'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='nasatlx',
            name='metadata',
            field=models.ForeignKey(default=1, to='ModME.Metadata'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tracking',
            name='metadata',
            field=models.ForeignKey(default=1, to='ModME.Metadata'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='metadata',
            field=models.ForeignKey(default=1, to='ModME.Metadata'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='metadata',
            name='condition',
            field=models.ForeignKey(to='ModME.Condition'),
        ),
        migrations.AlterField(
            model_name='metadata',
            name='duration',
            field=models.IntegerField(),
        ),
    ]
