from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()
from mainapp.views import hello

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'letsgo.views.home', name='home'),
    # url(r'^letsgo/', include('letsgo.foo.urls')),
    url(r'^$', hello),
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
