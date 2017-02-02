# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0020_auto_20150917_0832'),
    ]

    operations = [
        migrations.CreateModel(
            name='PVT',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Time', models.IntegerField(default=3)),
                ('Trial', models.CharField(default=b'john', max_length=50)),
            ],
        ),
    ]
