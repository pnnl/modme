from django.contrib import admin
from .models import (
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
    # End of model imports
)
from django.http import HttpResponseRedirect

#######################
# Set up display classes
#######################


class ConditionAdmin(admin.ModelAdmin):

    # Adds link column that takes user to the configuration page this is a test
    def view_link(self, obj):
        return u"<a href='/ModME/configuration/%d'>Configure</a>" % (obj.id)

    def response_add(self, request, obj, post_url_continue="../%s/"):
        if '_continue' in request.POST:
            return HttpResponseRedirect("/ModME/configuration/%d" % (obj.id))
        else:
            return super(ConditionAdmin, self).response_add(request, obj, post_url_continue)

    view_link.short_description = ''
    view_link.allow_tags = True

    fieldsets = [
        (None, {'fields': ['Name', 'experimentDuration', 'surveys'], }),
    ]
    list_display = ('Name', 'view_link')


class MetadataAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'condition',
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


########################
#  Model Registration  #
########################
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
admin.site.register(NasaTlx, NasaTlxAdmin)
