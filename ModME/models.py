from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
import random
import string

class Survey(models.Model):
    name = models.CharField(max_length=200)
    fileName = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Survey"
        verbose_name_plural = "Surveys"


class SurveyFile(models.Model):
    survey = models.ForeignKey(Survey, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)


class Experiment(models.Model):
    '''
    Over arching experiment that has several conditions. Has a use dependency with the Condition model class.  
    Other model classes have dependencies with this model class. Among these are Remote Experiment and Remote Participant model classes.
    '''
    is_cleaned = False
    
    name = models.CharField(
        'name', 
        help_text = 'This field is NOT visible to participants.',
        max_length=200
        )
    
    irb_pdf = models.FileField(
        'ICD PDF',
        upload_to='static/PDF/',
        help_text = "Please upload your IRB here. The IRB will display prior to the experiment. This form is visible to participants.",
        blank = True
        )
    
    skip_irb = models.BooleanField(
        'Skip ICD Page',
        help_text = "Selecting this option will skip the Informed Consent Document page. This should ONLY be done if the participants are physically given the ICD."
    )

    icd_confirmation_text = models.TextField(
        'ICD Confirmation Text',
        default = 'By clicking the \'Next\' button below, I confirm that I have read the above information, meet the eligibility criteria for participating, and agree to participate in this study.',
        help_text = "This is the ICD confirmation text, which will be right below the PDF view of the ICD. This field is visible to participants."
    )
    
    instructional_pdf = models.FileField(
        upload_to='static/PDF/',
        help_text = "Selecting this option will omit any instructions for this specific condition. This should only be done when participants have already been trained on what to expect or have been provided with written instructions.",
        blank = True
    )
    
    skip_instructions = models.BooleanField(
        'Skip Instruction Page',
        help_text = "Selecting this option will skip the Instruction page. This should be done when participants have already been given a physical copy of the instructions."
    )
    
    instructional_text = models.TextField(
        'Instructional Confirmation Text',
        default= "",
        help_text = "This is the text below the Instruction PDF. This field is visible to participants.",
        blank = True
    )

    conditions = models.CharField(
        'conditions',
        max_length=5000,
        help_text = "Enter the ID number of each Condition in the order you would like them to occur in the experiment (e.g. 1,3,1,2). This field is NOT visible to participants.")

    random = models.BooleanField(
        'Randomize Conditions',
        default=False,
        help_text = "This will randomize the order of the Conditions (Note: This will negate any condition order you enter below), This field is NOT visible to participants.")
    
    experiment_ending_message = models.TextField(
        'Experiment Ending Message',
        default = "",
        help_text = "This will be the message that will appear when the experiment has ended. This field is visible to participants."
    )
    
    notes = models.TextField(
        'Experiment Notes',
        default = "",
        blank = True,
        help_text = "This is for internal notes only. This will not be shown to any participant. This field is NOT visible to participants.")
    
    def clean(self):
        self.is_cleaned = True
        if self.instructional_text == "" and not self.skip_instructions:
            raise ValidationError({'instructional_text':_('This field is required.')})
        super(Experiment, self).clean()

    def save(self, *args, **kwargs):
        if not self.is_cleaned:
            self.full_clean()
        super(Experiment, self).save(*args,**kwargs)
    
    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = "Experiment"
        verbose_name_plural = "Experiments"


class Condition(models.Model):
    '''
    These are individual conditions, or task blocks of an experiment. Experiment model class has a dependency with this class.
    '''

    Name = models.CharField('name', max_length=200)

    experimentDuration = models.IntegerField('Duration of')
    
    instructional_pdf = models.FileField(
        'Participant Instructions',
        upload_to='static/PDF/',
        blank = True,
        help_text = "This PDF will be displayed right before the Condition and should be used to give the participant instructions.")
        
    condition_ending_message = models.TextField(
        'Condition Ending Message',
        blank = True,
        default = " ",
        help_text = "Text entered here will appear when the task session has ended")
    
    skip_instructions = models.BooleanField(
        'Skip Condition Instruction Page',
        default = True,
        help_text = "Selecting this option will skip the Instruction page. This should be done when participants have already been trained or have been given a physical copy of the instructions."
    )

    notes = models.TextField(
        'Condition Notes',
        default = "",
        blank = True,
        help_text = "This is for internal notes only. This will not be shown to any participant. This field is NOT visible to participants.")

    task1 = models.IntegerField(default=-1)
    task1Data = models.CharField(default="{}", max_length=5000)
    task1GUI = models.BooleanField(default=False)

    task2 = models.IntegerField(default=-1)
    task2Data = models.CharField(default="{}", max_length=5000)
    task2GUI = models.BooleanField(default=False)

    task3 = models.IntegerField(default=-1)
    task3Data = models.CharField(default="{}", max_length=5000)
    task3GUI = models.BooleanField(default=False)

    task4 = models.IntegerField(default=-1)
    task4Data = models.CharField(default="{}", max_length=5000)
    task4GUI = models.BooleanField(default=False)

    surveys = models.ManyToManyField(Survey, blank=True)
    surveys.help_text = 'Hold down "Control", or "Command" on a Mac, to <em>de</em>select one.<br/>'

    def __unicode__(self):
        return self.Name

    class Meta:
        verbose_name = "Condition"
        verbose_name_plural = "Conditions"


class Task(models.Model):
    fileName = models.CharField(max_length=200)
    taskName = models.CharField(max_length=200)
    configurator = models.CharField(max_length=200)

    def __str__(self):
        return self.taskName

		
class File(models.Model):
    task = models.ForeignKey(Task, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)


class TableAdd(models.Model):
    tableName = models.CharField(max_length=100)
    uniqueString = models.CharField(max_length=30)
    applyed = models.BooleanField()


class Participant(models.Model):
    """ Protect a participant's confidentiality and privacy """
    alias = models.CharField(max_length=500, unique=True)

    def __unicode__(self):
        return self.alias


class Session(models.Model):
    """ A session may comprise multiple runs of one or more conditions """
    name = models.CharField(max_length=500)
    study = models.CharField(max_length=500, default='')

    def __unicode__(self):
        return self.name

    class Meta:
        unique_together = (("name", "study"))


class Metadata(models.Model):
    """ Metadata describes the execution of a single condition by a participant """
    startTime = models.IntegerField()
    duration = models.IntegerField()
    session = models.ForeignKey('Session', on_delete=models.PROTECT)
    condition = models.ForeignKey('Condition', on_delete=models.PROTECT)
    experiment = models.ForeignKey('Experiment', on_delete=models.PROTECT)
    conditionIndex = models.IntegerField()
    participant = models.ForeignKey('Participant', on_delete=models.PROTECT)
    allowEventReuse = models.BooleanField(default=False)

    def __unicode__(self):
        return "%s:%s:%s" % (self.participant.alias, self.session.name, self.condition)

    class Meta:
        verbose_name_plural = "Metadata"
        unique_together = (("condition", "participant", "session", "experiment", "conditionIndex"))


class Event(models.Model):
    """
    Event class has an entry every time an event of any type happens during the experiment
    Event types include input, alert, and timeout
    """
    time = models.IntegerField()
    metadata = models.ForeignKey('Metadata', on_delete=models.PROTECT)
    eventType = models.CharField(max_length=200)
    chart = models.CharField(max_length=200)
    arg = models.CharField(max_length=200)
    domID = models.CharField(max_length=200)


class ResourceTank(models.Model):
    """
    Resource Tank class gets one entry for each tank in the Resource Management task at a rate given by the parameter
    Each entry gives state of a tank at that time
    """
    time = models.IntegerField()
    metadata = models.ForeignKey('Metadata', on_delete=models.PROTECT)

    tankNumber = models.IntegerField()
    state = models.FloatField()

    class Meta:
        verbose_name = "Resource Tank"
        verbose_name_plural = "Resource Tanks"


class ResourceSwitch(models.Model):
    """
    Resource Tank class gets one entry for each switch in the Resource Management task at a rate given by the parameter
    Each entry gives the state of a switch at that time
    """
    time = models.IntegerField()
    metadata = models.ForeignKey('Metadata', on_delete=models.PROTECT)

    switchNumber = models.IntegerField()
    state = models.CharField(max_length=200)

    class Meta:
        verbose_name = "Resource Switch"
        verbose_name_plural = "Resource Switches"


class Tracking(models.Model):
    """
    Track class get on entry for each satellite in the Tracking task at a rate given by the parameter
    Each entry gives the state of a satellite at that time
    """
    time = models.IntegerField()
    metadata = models.ForeignKey('Metadata', on_delete=models.PROTECT)

    x = models.FloatField()
    y = models.FloatField()
    domID = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    mouseX = models.FloatField()
    mouseY = models.FloatField()


class MouseTracking(models.Model):
    """
    MouseTracking class gets one entry every time the mouse moves
    Each entry give location of mouse and location of target
    """
    time = models.IntegerField()
    metadata = models.ForeignKey('Metadata', on_delete=models.PROTECT)

    x = models.FloatField()
    y = models.FloatField()
    domID = models.CharField(max_length=200)
    targetX = models.FloatField()
    targetY = models.FloatField()

    class Meta:
        verbose_name = "Mouse Tracking"
        verbose_name_plural = "Mouse Trackings"


class RemoteSession(models.Model):
    '''
    ADD NOTES
    '''

    def code_generator(size=12, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(size))

    def random_string():
        return str(random.randint(10000, 99999))

    userSessionCode = models.CharField('User Session Code', max_length=200, default = code_generator, help_text = "Send this code to your remote participant")
    userCompletionCode = models.CharField('User Completion Code', max_length=200, default = code_generator, help_text = "The participant will receive this code after they complete their experiment")
    userEmail = models.CharField('User Email Address', blank = True, max_length=200)
    
    userExperiment = models.ForeignKey('Experiment', on_delete=models.PROTECT)

    sessionCompleteStatus = models.BooleanField('Completion Status', default=False, help_text = "ONLY select this if you are manually logging that a participant completed their experiment session")

    #Hold needs to be initialized in the database
    #sessionHold = models.BooleanField('Session Hold', default=False)

    class Meta:
        verbose_name = "Remote Session"
        verbose_name_plural = "Remote Sessions"


class NasaTlx(models.Model):
    """
    Survey class gets one entry for every task in the experiment and one for the experiment as a whole
    Holds values that were given by the participant at the end of the experiment
    """
    metadata = models.ForeignKey('Metadata', on_delete=models.PROTECT)
    time = models.IntegerField()

    mental = models.IntegerField(default=-1)
    physical = models.IntegerField(default=-1)
    temporal = models.IntegerField(default=-1)
    performance = models.IntegerField(default=-1)
    effort = models.IntegerField(default=-1)
    frustration = models.IntegerField(default=-1)
    fatigue = models.IntegerField(default=-1)
    boredom = models.IntegerField(default=-1)

    class Meta:
        verbose_name = ("NASA TLX")
        verbose_name_plural = ("NASA TLX")


class remoteExperiment(models.Model):
    '''
    One of two model classes that gives the capabilities to make an Experiment model class into a remote experiment.
    The other model class that assist in this capabilities is the Remote Participant model class. This model class 
    has a dependency with Experiment model class; and an interrelated dependency with the Remote Participant model class.
    '''

    def code_generator(size=12, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(size))

    temp_code = code_generator()

    name = models.CharField(
        'Remote Experiment Name',
        max_length=75,
        help_text = "This Remote Experiment Name should help you distinguish between remote session which run the same Experiment, but different Session and Study IDs."
    )
    
    experiment = models.ForeignKey(
        Experiment, 
        on_delete=models.PROTECT
    )

    session_id = models.CharField(
        'Session ID', 
        max_length=50, 
        help_text = "This is the Session ID"
    )

    study_id = models.CharField(
        'Study ID', 
        max_length=50, 
        help_text = "This is the Study ID"
    )

    bulk_user_creation = models.IntegerField(
        'Bulk participant Creation',
        blank = True,
        help_text="This will create a bulk number of Remote Participants for this Remote Experiment. When you select --Save-- the number you enter in this field will be the number of Remote Participants that will be generated and then the field will be reset to 0. If you require additional bulk creation of Remote Participants, simply enter a number in this field again and select --Save--"
    )

    remote_code = models.CharField(
        'Remote Code',
        max_length = 12,
        default = temp_code
    )

    remote_link_string = "remotelink/" + temp_code + "/"

    remote_link = models.CharField(
        'Remote Link',
        max_length = 100,
        default = remote_link_string 
    )

    #new fields
    available_participants = models.IntegerField(
        'Open Participant Entries',
        default = 0,
        editable = False
    )

    hold_participants = models.IntegerField(
        'Entries on Hold',
        default = 0,
        editable = False
    )

    complete_participants = models.IntegerField(
        'Completed Responses',
        default = 0,
        editable = False
    )

    total_participants = models.IntegerField(
        'Total Participants',
        default = 0,
        editable = False
    )

    def save(self, *args, **kwargs):
        super(remoteExperiment, self).save(*args,**kwargs)
        
        new_participants = []
        if self.bulk_user_creation > 0 :
            for i in range(self.bulk_user_creation):
                new_participants.append(remoteParticipant(study=self))
        self.bulk_user_creation = 0
        remoteParticipant.objects.bulk_create(new_participants)

        participants = remoteParticipant.objects.all().filter(study = self)

        if participants.count() > 0:

            num_participants = participants.count()
            num_available = participants.filter(id_hold = False, id_complete=False).count()
            num_hold = participants.filter(id_hold = True, id_complete=False).count()
            num_complete = participants.filter(id_complete=True).count()
        
            self.available_participants = num_available
            self.hold_participants = num_hold
            self.complete_participants = num_complete
            self.total_participants = num_participants

        super(remoteExperiment, self).save(*args,**kwargs)

    def __unicode__(self):
        return self.name
                
    class Meta:
        verbose_name = "Remote Experiment"
        verbose_name_plural = "Remote Experiments"


class remoteParticipant(models.Model):
    '''
    The seconded of two model classes that gives the capabilities to make an Experiment model class into a remote experiment. 
    The other model class that assist in this capabilities is the Remote Experiments model class. This model class has a dependency 
    with Experiment model class; and an interrelated dependency with the Remote Experiment model class.
    '''

    def code_generator(size=12, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(size))

    study = models.ForeignKey(
        remoteExperiment,
        on_delete = models.PROTECT,
        blank = True,
        null = True
    )
    
    participant_id = models.CharField(
        'Participant ID', 
        max_length=20, 
        default = code_generator, 
        help_text = "This is an auto generated Participant ID"
    )

    completion_code = models.CharField(
        'Completion Code', 
        max_length=20, 
        default = code_generator, 
        help_text = "The participant will receive this code after they complete their experiment"
    )
    
    id_hold = models.BooleanField(
        'Hold',
        default = False,
        help_text = "This puts a hold on this user ID when a participant has started their session, however, they may not have completed the experiment"
    )

    id_complete = models.BooleanField(
        'Complete',
        default = False,
        help_text = "This indicates whether the participant has completed the experiment"
    )

    @classmethod
    def create(cls, study):
        participant = cls(study=study)
        return participant

    # custom save function to handle the interdependencies of remoteExperiment and remote Participant.
    def save(self, *args, **kwargs):
        study = remoteExperiment.objects.all().get(name = self.study.name)
        
        super(remoteParticipant, self).save(*args,**kwargs)
        study.save()
    
    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = "Remote Participant"
        verbose_name_plural = "Remote Participants"