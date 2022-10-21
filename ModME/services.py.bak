from django.http import HttpResponse
from django.http import HttpResponseBadRequest
from ModME.models import (
    Metadata,
    Event,
    Session
)
import json


def serialize(obj):
    # Sorry; serializers.serialize doesn't go deep enough into the tree (doesn't serialize the session object) and
    # json.dumps by default says metadata is not serializable.  This avoids bringing in another library, though we
    # could... but the last one that went deep enough without us writing anything is apparently now not maintained.
    if isinstance(obj, Metadata):
        return {
            'id': obj.id,
            'allowEventReuse': obj.allowEventReuse,
            'condition_id': obj.condition_id,  # Not serializing condition here... tree gets large.
            'session': serialize(obj.session),
            'startTime': obj.startTime,
            'participant_id': obj.participant_id,
            'duration': obj.duration
        }
    elif isinstance(obj, Session):
        return {
            'id': obj.id,
            'name': obj.name
        }
    # Ugly. Eh.
    return obj.__dict__


def metadataList(request):
    ':param django.http.HttpRequest request:'
    ':rtype django.http.HttpResponse'

    def queryToFilterKey(key, value):
        return key if isinstance(value, basestring) else key + "__in"
    keyToQueryField = {
        'participant': 'participant__alias',
        'session': 'session__name',
        'study': 'session__study',
    }
    disallowedKeys = set(request.GET.keys()) - set(keyToQueryField.keys())
    if (disallowedKeys):
        return HttpResponseBadRequest()
    filterArgs = {queryToFilterKey(keyToQueryField[key], value): value for key, value in request.GET.items()}
    metadata = Metadata.objects.all().filter(**filterArgs).select_related()
    blarg = [{
            'id': metadatum.id,
            'allowEventReuse': metadatum.allowEventReuse,
            'condition': metadatum.condition_id,  # Not serializing condition here... tree gets large.
            'session': metadatum.session_id,
            'startTime': metadatum.startTime,
            'participant': metadatum.participant_id,
            'duration': metadatum.duration
    } for metadatum in metadata]
    # serializedMetadata = json.dumps(list(metadata), default=serialize)
    serializedMetadata = json.dumps(blarg, indent=2)
    response = HttpResponse(serializedMetadata, content_type='application/json')
    return response


def getReusableSessions(request):
    metadata = '[]'
    condition = request.GET.get('condition')

    if condition:
        metadata = Metadata.objects.filter(condition=condition, allowEventReuse=True)
        metadata = json.dumps(list(metadata), default=serialize)

    return HttpResponse(metadata, content_type='application/json')


def getAlertsForMetadata(request):
    serializedAlerts = '[]'
    metadataId = request.GET.get('metadataId')

    if metadataId:
        alertList = list(Event.objects.filter(metadata=metadataId, eventType='alert').order_by('time'))
        flatAlertList = [{
            'arg': json.loads(alert.arg),
            'time': alert.time,
            'eventType': alert.eventType,
            'chart': alert.chart,
            'domID': alert.domID,
            'table': "Event",
        } for alert in alertList]
        serializedAlerts = json.dumps(flatAlertList, indent=2)

    return HttpResponse(serializedAlerts, content_type='application/json')

