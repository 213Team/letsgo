#-*- coding: utf-8 -*-
# Create your views here.
from django.shortcuts import render_to_response
from models import *
import json

def hello(request):
	locations = Location.objects.all()
	finalmaparr = []
	
	for location in locations:
		row = []
		row.append([location.Lat, location.Lng])
		plots = location.plot_set.all()
		for plot in plots:
			pics = plot.picture_set.all()
			row.append([{'title': unicode(plot.Movie), \
				     'href':str(pic.Image), \
				     'thumbnail':str(pic.Image), \
				     'description':plot.Plot} for pic in pics])
		finalmaparr.append(row)
	
	finalmaparr = json.dumps(finalmaparr, ensure_ascii=False)
	return render_to_response('index.html', locals())

