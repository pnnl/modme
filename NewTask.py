import django
import os
import sys
import shutil
from ModME.models import TableAdd

os.environ['DJANGO_SETTINGS_MODULE'] = 'multiTask.settings'
django.setup()

changesFlag = False
tableAdded = False

for o in TableAdd.objects.filter(applyed=False):
    # print str(o.uniqueString) + "    " + str(o.applyed)

    changesFlag = True

    comment = "    #" + str(o.tableName) + " code uniqureString: " + str(o.uniqueString)
    with open('ModME/tableAdditions/' + str(o.uniqueString) + '/models.txt', 'r') as file:
        model = file.readlines()

    model = [line[0:len(line) - 1] + comment + '\n' if line[len(line) - 2:len(line)] != '\r\n' else line[0:len(line) - 2] + comment + '\n' for line in model]

    with open('ModME/models.py', 'a') as file:
        file.writelines(['\n'] + model)

    with open('ModME/tableAdditions/' + str(o.uniqueString) + '/admin.txt', 'r') as file:
        newAdmin = file.readlines()

    with open('ModME/admin.py', 'r') as file:
        admin = file.readlines()

    i = 0

    while(admin[i] != "#End of model imports\n"):
        i = i + 1

    admin[i] = '    ' + o.tableName + ',' + comment + '\n' + admin[i]

    admin = admin + [newAdmin[0][0:len(newAdmin[0]) - 1] + comment + '\n']

    with open('ModME/admin.py', 'w') as file:
        file.writelines(admin)

    with open('ModME/tableAdditions/' + str(o.uniqueString) + '/views.txt', 'r') as file:
        newViews = file.readlines()

    with open('ModME/views.py', 'r') as file:
        views = file.readlines()

    i = 0

    newViews = [newView if newView[len(newView) - 2:len(newView)] != '\r\n' else newView[0:len(newView) - 2] + '\n' for newView in newViews]

    while(views[i] != "#End of model imports\n"):
        i = i + 1

    views[i] = '    ' + o.tableName + ',' + comment + '\n' + views[i]
    if(newViews[0] != "on\n"):
        while(views[i] != "######ArrayUniqueString3m3n4h5g6c6c3n3id8fg7o3n033hn########\n"):
            i = i + 1

        views[i - 1] = "    " + newViews[2][0:len(newViews[2]) - 1] + comment + "\n\n"

        while(views[i] != "######ParseUniqueString3m3n4h5g6c6c3n3id8fg7o3n033hn########\n"):
            i = i + 1

        views[i - 1] = '\n        ' + newViews[3][0:len(newViews[3]) - 1] + comment + '\n' + '        ' + newViews[4][0:len(newViews[4]) - 1] + comment + '\n\n'

        while(views[i] != "######SaveUniqueString3m3n4h5g6c6c3n3id8fg7o3n033hn########\n"):
            i = i + 1

        views[i - 1] = "    " + newViews[1][0:len(newViews[1]) - 1] + comment + "\n\n"
    else:
        while(views[i] != "######ParseUniqueString3ds9tu890q345oij09ua0wj34########\n"):
            i = i + 1

        views[i - 1] = "    " + '    '.join(newViews[3:]) + '\n'
        print newViews[3:]

    with open('ModME/views.py', 'w') as file:
        file.writelines(views)

    o.applyed = True
    o.save()

objects = TableAdd.objects.all()

for uniquestring in os.listdir('ModME/tableAdditions/'):
    if filter(lambda object: object.uniqueString == uniquestring, objects) == []:
        model = []
        with open('ModME/tableAdditions/' + str(uniquestring) + '/models.txt', 'r') as file:
            model = file.readlines()
        print model[0].split('(')[0][6:-1] + "table was not detected in the database."
        if raw_input("Do you want to delete it? [Y/n]: ").lower() != 'n':
            changesFlag = True
            shutil.rmtree('ModME/tableAdditions/' + uniquestring)
            model = []
            with open('ModME/models.py', 'r') as file:
                model = file.readlines()
            model = filter(lambda x: not x.endswith(uniquestring + '\n'), model)
            with open('ModME/models.py', 'w') as file:
                file.writelines(model)

            admin = []
            with open('ModME/admin.py', 'r') as file:
                admin = file.readlines()
            admin = filter(lambda x: not x.endswith(uniquestring + '\n'), admin)
            with open('ModME/admin.py', 'w') as file:
                file.writelines(admin)

            view = []
            with open('ModME/views.py', 'r') as file:
                view = file.readlines()
            view = filter(lambda x: not x.endswith(uniquestring + '\n'), view)
            with open('ModME/views.py', 'w') as file:
                file.writelines(view)
        else:
            tableAdded = True
            print "Adding to table"
            t = TableAdd(tableName=model[0].split('(')[0][6:-1], uniqueString=uniquestring, applyed=True)
            t.save()

if changesFlag:
    sys.argv = ['manage.py', 'makemigrations']
    execfile('manage.py')
    sys.argv = ['manage.py', 'migrate']
    execfile('manage.py')
# else if not tableAdded:
#     print "No changes detected"
