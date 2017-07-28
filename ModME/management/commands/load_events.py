import csv
import uuid
from django.db import transaction
from django.core.management.base import BaseCommand, CommandError
from ModME.models import Event, Metadata, Condition, Session, Participant
from argparse import RawTextHelpFormatter

class Command(BaseCommand):
    help = """Load a sequence of preprogrammed events.  Events should be in a csv file with these columns:
    time            Time in milliseconds from the start of the session until this event fires.
    chart           One of these keywords: resource, tracking, communication, monitoring.
    arg             A json representation of extra information about the event, based on the chart.
    domID           ID of element affected by the event.
    metadata_id     Unused, optional.  ID of session that this data was derived from.
    ConditionName   Unused, optional.  Should match the condition argument passed on the command line.
    eventType       Unused, optional.  Only alerts should be included.
    """

    def add_arguments(self, parser):
        parser.add_argument('csvfilename', help='name of the csv file with the event details')
        parser.add_argument('-c', '--condition', help='name of the condition linking to the new event sequence', required=True)
        parser.formatter_class=RawTextHelpFormatter

    def handle(self, *args, **options):
        csvfilename = options['csvfilename']
        conditionName = options['condition']
        if not Condition.objects.filter(Name=conditionName).exists():
            self.stdout.write(self.style.ERROR('Failure: there is no condition with the name %s' % (conditionName)))
            conditionNames = [condition.Name for condition in Condition.objects.all()]
            self.stdout.write(self.style.NOTICE('Available conditions include: \n\t%s' % "\n\t".join(conditionNames)))
            return
        with open(csvfilename) as csvfile:
            reader = csv.DictReader(csvfile)
            requiredColumnNames = ['time', 'chart', 'arg', 'domID']
            if not set(requiredColumnNames) <= set(reader.fieldnames):
                self.stdout.write(self.style.ERROR('Failure: csv file %s does is missing columns or does not include column headers' % (csvfilename)))
                self.stdout.write(self.style.NOTICE('required: \n\t%s' % "\n\t".join(requiredColumnNames)))
                self.stdout.write(self.style.NOTICE('found: \n\t%s' % "\n\t".join(reader.fieldnames)))
                return

        condition = Condition.objects.get(Name=conditionName)

        with transaction.atomic():
            identifier = uuid.uuid4()
            participant = Participant(
                alias = identifier,
            )
            participant.save()
            session = Session(
                name = identifier,
                study = 'preprogrammed events',
            )
            session.save()
            metadata = Metadata(
                startTime = 0,
                duration = condition.experimentDuration,
                session = session,
                condition = condition,
                participant = participant,
                allowEventReuse = True,
            )
            metadata.save()
            with open(csvfilename) as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    event = Event(
                        time = row['time'],
                        chart = row['chart'],
                        arg = row['arg'],
                        domID = row['domID'],
                        metadata = metadata,
                    )
                    event.save()
        self.stdout.write(self.style.SUCCESS('Success %s %s' % (csvfilename, conditionName)))

