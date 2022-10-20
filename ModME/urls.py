from django.conf.urls import url

from ModME import views
from ModME import services

app_name="ModME_app"

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^complete/$', views.complete, name='complete'),
    url(r'^done/$', views.done, name='done'),
    url(r'^experiment/$', views.experiment, name='experiment'),
    url(r'^configuration/(?P<condition_id>\d+)/$', views.configuration, name='advancedConfiguration'),
    url(r'^configuration/save/$', views.save, name='save'),
    url(r'^configuration/new/$', views.new, name='new'),
    url(r'^begin/$', views.begin, name='begin'),
    url(r'^tableAdd/$', views.tableAdd, name='tableAdd'),
    url(r'^survey/$', views.survey, name='survey'),
    url(r'^get-reusable-sessions/$', services.getReusableSessions, name='getReusableSessions'),
    url(r'^get-alerts-for-metadata/$', services.getAlertsForMetadata, name='getAlertsForMetadata'),
    url(r'^metadata/json/$', services.metadataList, name='metadata'),
    url(r'^remotelink/(?P<experiment_id>\w+)/(?P<session_id>\w+)/(?P<study_id>\w+)/$', views.remotelink, name='remotelink'),
    url(r'^remotelink/(?P<remote_code>\w+)/$', views.remotelink2, name='remotelink2'),
    url(r'^icd/$', views.icd, name='icd'),
    url(r'^instructions/$', views.instructions, name='instructions'),
    url(r'^conditionInstructions/$', views.conditionInstructions, name='conditionInstructions'),
    url(r'^downloadDatabase/', views.downloadDatabase, name='downloadDatabase'),
]
