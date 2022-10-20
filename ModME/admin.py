from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import (
    Experiment,
    Condition,
    Task,
    Metadata,
    Event,
    ResourceTank,
    ResourceSwitch,
    Tracking,
    MouseTracking,
    File,
    TableAdd,
    SurveyFile,
    Survey,
    NasaTlx,
    RemoteSession,
    remoteExperiment,
    remoteParticipant,
    # End of model imports
)
from django.http import HttpResponseRedirect

#######################
# Set up display classes
#######################

class ExperimentAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'irb_pdf',
        'instructional_pdf',
        'random',
        'conditions',
    )

class ConditionAdmin(admin.ModelAdmin):

    # Adds link column that takes user to the configuration page this is a test
    def view_link(self, obj):
        #return "<a href='/ModME/configuration/%d'>Configure</a>" % (obj.id)
        return mark_safe( "<a href='/ModME/configuration/%d/'>Configure</a>" % (obj.id))

    def response_add(self, request, obj, post_url_continue="../%s/"):
        if '_continue' in request.POST:
            return HttpResponseRedirect("/ModME/configuration/%d" % (obj.id))
        else:
            return super(ConditionAdmin, self).response_add(request, obj, post_url_continue)

    view_link.short_description = ''
    #view_link.allow_tags = True #no longer works as of Django v2

    fieldsets = [
        (None, {'fields': ['Name', 'experimentDuration', 'instructional_pdf', 'skip_instructions', 'condition_ending_message', 'surveys', 'notes'], }),
    ]
    list_display = ('id', 'Name', 'instructional_pdf', 'skip_instructions',  'view_link')


class MetadataAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'condition',
        'experiment',
        'conditionIndex',
        'session',
        'participant',
        'startTime',
        'duration',
    )


class EventAdmin(admin.ModelAdmin):
    list_display = ('time', 'metadata', 'eventType', 'chart', 'arg', 'domID')


class ResourceTankAdmin(admin.ModelAdmin):
    list_display = ('time', 'metadata', 'tankNumber', 'state',)


class ResourceSwitchAdmin(admin.ModelAdmin):
    list_display = ('time', 'metadata', 'switchNumber', 'state',)


class TrackingAdmin(admin.ModelAdmin):
    list_display = ('time', 'metadata', 'x', 'y', 'domID', 'state', 'mouseX', 'mouseY',)


class MouseTrackingAdmin(admin.ModelAdmin):
    list_display = ('time', 'metadata', 'x', 'y', 'domID', 'targetX', 'targetY')


class FileInline(admin.StackedInline):
    model = File
    extra = 0


class TaskAdmin(admin.ModelAdmin):
    fields = ['taskName', 'fileName', 'configurator']
    inlines = [FileInline]


class SurveyFileInline(admin.StackedInline):
    model = SurveyFile
    extra = 0


class SurveyAdmin(admin.ModelAdmin):
    list_display = ('name', 'fileName')
    inlines = [SurveyFileInline]
    
    
class RemoteSessionAdmin(admin.ModelAdmin):
    list_display = (
        'userEmail',
        'userExperiment',
        'userSessionCode',
        'userCompletionCode',
        'sessionCompleteStatus',
    )

class NasaTlxAdmin(admin.ModelAdmin):
    list_display = (
        'time',
        'metadata',
        'mental',
        'physical',
        'temporal',
        'performance',
        'effort',
        'frustration',
        'fatigue',
        'boredom',
    )

class remoteExperimentAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'experiment',
        'session_id',
        'study_id',
        'remote_code',
        'remote_link',
        'available_participants',
        'hold_participants',
        'complete_participants',
        'total_participants',
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super(remoteExperimentAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['experiment'].label_from_instance = lambda inst: "{}".format(inst.name)
        return form

class remoteParticipantAdmin(admin.ModelAdmin):
    list_display = (
        'participant_id',
        'study',
        'completion_code',
        'id_hold',
        'id_complete',
    )

    list_filter = ('study', 'id_hold','id_complete')

    def get_form(self, request, obj=None, **kwargs):
        form = super(remoteParticipantAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['study'].label_from_instance = lambda inst: "{}".format(inst.name)
        return form

    def study_name(self,obj):
        return obj.study.name

########################
#  Model Registration  #
########################
admin.site.register(Experiment, ExperimentAdmin)
admin.site.register(Condition, ConditionAdmin)
admin.site.register(Metadata, MetadataAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(ResourceTank, ResourceTankAdmin)
admin.site.register(ResourceSwitch, ResourceSwitchAdmin)
admin.site.register(Tracking, TrackingAdmin)
admin.site.register(MouseTracking, MouseTrackingAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(TableAdd)
admin.site.register(Survey, SurveyAdmin)
admin.site.register(RemoteSession,RemoteSessionAdmin)
admin.site.register(remoteExperiment, remoteExperimentAdmin)
admin.site.register(remoteParticipant, remoteParticipantAdmin)
admin.site.register(NasaTlx, NasaTlxAdmin)
