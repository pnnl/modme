# Tornado server launcher

import os
import sys
import tornado.httpserver
import tornado.ioloop
import tornado.wsgi
import django.core.handlers.wsgi
import tornado.web

os.environ['DJANGO_SETTINGS_MODULE'] = 'multiTask.settings'
django.setup()


def main(port=9000):
    f = open("pid", "w")
    f.write(repr(os.getpid()))
    f.close()
    print "Django version " + django.get_version() + ", using settings " + repr(os.environ['DJANGO_SETTINGS_MODULE'])
    print "Tornado " + tornado.version + " server started at http://127.0.0.1:" + repr(port) + "/"
    print "Quit the server with CONTROL-C"
    PATH = os.path.dirname(__file__)
    wsgi_app = tornado.wsgi.WSGIContainer(
        django.core.handlers.wsgi.WSGIHandler())
    settings = {'static_path': os.path.join(PATH, 'static')}
    tornado_application = tornado.web.Application(
        [
            ('.*', tornado.web.FallbackHandler, dict(fallback=wsgi_app)),
        ], **settings)
    http_server = tornado.httpserver.HTTPServer(tornado_application)
    http_server.listen(port)
    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    print "server Started"
    if(len(sys.argv) == 2):
        main(sys.argv[1])
    else:
        main()
