#-*- coding: utf-8 -*-
from django.db import models
from utils import get_upload_filename
# Create your models here.

class Location(models.Model):
    Name = models.CharField(max_length = 30)
    Lat = models.FloatField()
    Lng = models.FloatField()
    
    def __unicode__(self):
        return self.Name
    
class Movie(models.Model):
    Name = models.CharField(max_length = 50)
    Intro = models.TextField()
    
    def __unicode__(self):
        return self.Name
    
class Plot(models.Model):
    Movie = models.ForeignKey(Movie)
    Location = models.ForeignKey(Location)
    Plot = models.TextField()
    
    def __unicode__(self):
        return u"%s %s： %s" %( self.Movie, self.Location, self.Plot)
    
class Picture(models.Model):
    Plot = models.ForeignKey(Plot)
    Image = models.ImageField(upload_to = get_upload_filename, max_length = 255)
    
    def __unicode__(self):
        return unicode(self.Image)
    
