from django.http import HttpResponse
from django.core import serializers
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
        alertList = Event.objects.filter(metadata=metadataId, eventType='alert')
        serializedAlerts = serializers.serialize('json', alertList)

    return HttpResponse(serializedAlerts, content_type='application/json')
