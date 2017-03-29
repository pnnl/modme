# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0030_delete_test'),
    ]

    operations = [
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=500)),
            ],
        ),
        migrations.RemoveField(
            model_name='metadata',
            name='sessionID',
        ),
        migrations.RemoveField(
            model_name='metadata',
            name='sessionNumber',
        ),
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
        migrations.AddField(
            model_name='metadata',
            name='session',
            field=models.ForeignKey(default=1, to='ModME.Session'),
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
