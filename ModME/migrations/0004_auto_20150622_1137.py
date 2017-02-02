# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModME', '0003_auto_20150622_1100'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='condition',
            options={'verbose_name': 'Condition', 'verbose_name_plural': 'Conditions'},
        ),
        migrations.AddField(
            model_name='condition',
            name='commData',
            field=models.CharField(default=b'{"channels":[{"name":"OPS 1","avalibleFrequency":[1173,1231,1123,1131],"frequency":1173,"prob":1,"differential":60},{"name":"OPS 2","avalibleFrequency":[1235,1231,1123,1131],"frequency":1235,"prob":1,"differential":60},{"name":"INT 1","avalibleFrequency":[1141,1231,1123,1131],"frequency":1141,"prob":1,"differential":60},{"name":"INT 2","avalibleFrequency":[1259,1231,1123,1131],"frequency":1259,"prob":1,"differential":60}],"absoluteMin":1100,"absoluteMax":1600,"target":{"name":"INT 1","frequency":1131},"response":8000,"controller":{"indexUp":40,"indexDown":38,"frequencyDown":37,"frequencyUp":39,"accept":13}}', max_length=5000),
        ),
        migrations.AddField(
            model_name='condition',
            name='commEventFunction',
            field=models.CharField(default=b'function(){ rand = Math.random()*(comm_param.max-comm_param.min); return rand+comm_param.min;}', max_length=500),
        ),
        migrations.AddField(
            model_name='condition',
            name='commEventParameters',
            field=models.CharField(default=b'{min: 8000, max: 14000}', max_length=200, verbose_name=b'Event function parameters for communication task'),
        ),
        migrations.AddField(
            model_name='condition',
            name='commFirstEvent',
            field=models.CharField(default=b'5000', max_length=500),
        ),
        migrations.AddField(
            model_name='condition',
            name='commResponseTime',
            field=models.IntegerField(default=0, verbose_name=b'Allowed response time for communication task'),
        ),
        migrations.AddField(
            model_name='condition',
            name='commShow',
            field=models.BooleanField(default=False, verbose_name=b'Show Communication Task'),
        ),
        migrations.AddField(
            model_name='condition',
            name='manageData',
            field=models.CharField(default=b'{"tanks":[{"label":"A","x":3,"y":8.75,"width":4,"height":3.75,"decayRate":0.0125,"startingResource":2400,"maxResource":4000,"targetRangeMax":2800,"targetRangeMin":2100,"index":0,"resource":2381.25,"delta":-1.25},{"label":"B","x":11,"y":8.75,"width":4,"height":3.75,"decayRate":0.0125,"startingResource":2400,"maxResource":4000,"targetRangeMax":2800,"targetRangeMin":2100,"index":1,"resource":2381.25,"delta":-1.25},{"label":"C","x":2,"y":3,"width":2,"height":2,"decayRate":0,"startingResource":1000,"maxResource":2000,"index":2,"resource":1000,"delta":0},{"label":"D","x":10,"y":3,"width":2,"height":2,"decayRate":0,"startingResource":1000,"maxResource":2000,"index":3,"resource":1000,"delta":0}],"generators":[{"label":"S1","resource":null,"cx":7,"cy":2,"r":1,"index":100,"delta":0},{"label":"S2","resource":null,"cx":15,"cy":2,"r":1,"index":101,"delta":0}],"switches":[{"source":2,"target":0,"transferRate":0.013334,"x1":3.5,"y1":5,"x2":3.5,"y2":3,"textX":2.5,"textY":3.9,"rotation":-90,"on":false,"key":49,"keyboard":"1","repairTime":4000,"alert":false,"count":0,"prob":1},{"source":100,"target":0,"transferRate":0.01,"x1":6.5,"y1":5,"x2":6.5,"y2":2.85,"textX":5.5,"textY":3.9,"rotation":-90,"on":false,"key":50,"keyboard":"2","repairTime":4000,"alert":false,"count":0,"prob":1},{"source":3,"target":1,"transferRate":0.013334,"x1":11.5,"y1":5,"x2":11.5,"y2":3,"textX":10.5,"textY":3.9,"rotation":-90,"on":false,"key":51,"keyboard":"3","repairTime":4000,"alert":false,"count":0,"prob":1},{"source":101,"target":1,"transferRate":0.01,"x1":14.5,"y1":5,"x2":14.5,"y2":2.85,"textX":13.5,"textY":3.9,"rotation":-90,"on":false,"key":52,"keyboard":"4","repairTime":4000,"alert":false,"count":0,"prob":1},{"source":100,"target":2,"transferRate":0.01,"x1":4,"y1":2,"x2":6,"y2":2,"on":false,"textX":4.9,"textY":1,"rotation":180,"key":53,"keyboard":"5","repairTime":4000,"alert":false,"count":0,"prob":1},{"source":101,"target":3,"transferRate":0.01,"x1":12,"y1":2,"x2":14,"y2":2,"on":false,"textX":12.9,"textY":1,"rotation":180,"key":54,"keyboard":"6","repairTime":4000,"alert":false,"count":0,"prob":1},{"source":0,"target":1,"transferRate":0.00833,"x1":7,"y1":7.75,"x2":11,"y2":7.75,"on":false,"textX":8.85,"textY":8.5,"rotation":0,"key":55,"keyboard":"7","repairTime":10000,"alert":false,"count":0,"prob":1},{"source":1,"target":0,"transferRate":0.00833,"x1":7,"y1":6.25,"x2":11,"y2":6.25,"on":false,"textX":8.85,"textY":5.25,"rotation":180,"key":56,"keyboard":"8","repairTime":10000,"alert":false,"count":0,"prob":1}],"refresh":100}', max_length=5000),
        ),
        migrations.AddField(
            model_name='condition',
            name='manageEventFunction',
            field=models.CharField(default=b'function(){ rand = Math.random()*(manage_param.max-manage_param.min); return rand+manage_param.min;}', max_length=500),
        ),
        migrations.AddField(
            model_name='condition',
            name='manageEventParameters',
            field=models.CharField(default=b'{min: 8000, max: 14000}', max_length=200, verbose_name=b'Event function parameters for communication task'),
        ),
        migrations.AddField(
            model_name='condition',
            name='manageFirstEvent',
            field=models.CharField(default=b'5000', max_length=500),
        ),
        migrations.AddField(
            model_name='condition',
            name='manageRefresh',
            field=models.IntegerField(default=0, max_length=200, verbose_name=b'Refresh Rate for tracking task'),
        ),
        migrations.AddField(
            model_name='condition',
            name='manageShow',
            field=models.BooleanField(default=False, verbose_name=b'Show Management Task'),
        ),
        migrations.AddField(
            model_name='condition',
            name='monitorEventFunction',
            field=models.CharField(default=b'function(){ rand = Math.random()*(monitor_param.max-monitor_param.min); return rand+monitor_param.min;}', max_length=500),
        ),
        migrations.AddField(
            model_name='condition',
            name='monitorEventParameters',
            field=models.CharField(default=b'{min: 8000, max: 14000}', max_length=200, verbose_name=b'Event function parameters for communication task'),
        ),
        migrations.AddField(
            model_name='condition',
            name='monitorFirstEvent',
            field=models.CharField(default=b'5000', max_length=500),
        ),
        migrations.AddField(
            model_name='condition',
            name='monitorShow',
            field=models.BooleanField(default=False, verbose_name=b'Show Monitoring Task'),
        ),
        migrations.AddField(
            model_name='condition',
            name='monitordata',
            field=models.CharField(default=b'{"scales":[{"button":112,"key":"F1","slider_interval":2000,"event_probablity":0.1,"i":9,"y":5,"x":1.5,"alert":4,"prob":1,"event":false,"correct":0},{"button":113,"key":"F2","slider_interval":1400,"event_probablity":0.1,"i":12,"y":3,"x":4,"alert":4,"prob":1,"event":false,"correct":0},{"button":114,"key":"F3","slider_interval":1000,"event_probablity":0.1,"i":17,"y":5,"x":6.5,"alert":4,"prob":1,"event":false,"correct":0},{"button":115,"key":"F4","slider_interval":1600,"event_probablity":0.1,"i":12,"y":3,"x":9,"alert":4,"prob":1,"event":false,"correct":0}],"buttons":[{"color":"lightgreen","button":116,"key":"F5","alert_color":"black","autoCorrect":8000,"prob":1,"alert":false},{"color":"black","button":117,"key":"F6","alert_color":"red","autoCorrect":8000,"prob":1,"alert":true}],"event_range":[2,6],"ticks":7,"range":[3,5]}', max_length=5000),
        ),
        migrations.AddField(
            model_name='condition',
            name='trackData',
            field=models.CharField(default=b'{"orbits":[{"points":[{"x":0.357,"y":0.152},{"x":0.342,"y":0.179},{"x":0.643,"y":0.848},{"x":0.658,"y":0.821}],"interval":30000,"radius":13,"prob":1},{"points":[{"x":0.28,"y":0.402},{"x":0.277,"y":0.442},{"x":0.72,"y":0.598},{"x":0.723,"y":0.558}],"interval":30000,"radius":13,"prob":1},{"points":[{"x":0.28,"y":0.597},{"x":0.285,"y":0.636},{"x":0.72,"y":0.403},{"x":0.715,"y":0.364}],"interval":30000,"radius":13,"prob":1}],"refresh":100}', max_length=5000),
        ),
        migrations.AddField(
            model_name='condition',
            name='trackEventFunction',
            field=models.CharField(default=b'function(){ rand = Math.random()*(track_param.max-track_param.min); return rand+track_param.min;}', max_length=500),
        ),
        migrations.AddField(
            model_name='condition',
            name='trackEventParameters',
            field=models.CharField(default=b'{min: 8000, max: 14000}', max_length=200, verbose_name=b'Event function parameters for communication task'),
        ),
        migrations.AddField(
            model_name='condition',
            name='trackFirstEvent',
            field=models.CharField(default=b'5000', max_length=500),
        ),
        migrations.AddField(
            model_name='condition',
            name='trackRefresh',
            field=models.IntegerField(default=0, max_length=200, verbose_name=b'Refresh rate for tracking task'),
        ),
        migrations.AddField(
            model_name='condition',
            name='trackShow',
            field=models.BooleanField(default=False, verbose_name=b'Show Tracking Task'),
        ),
    ]
