var map;
var flightPlanCoordinates = [];
var markers = [];

function placeMarker(location, picarr) {
    var marker = new google.maps.Marker({
        position : location,
        map : map,
        draggable : false
    });
    markers.push(marker);

    var container = document.createElement("div");
    container.style.cssText = "width:500px; height: 300px;";
    var gallerydiv = document.createElement("div");
    gallerydiv.id = "gallerydiv" + (markers.length - 1);
    gallerydiv.setAttribute("class", "blueimp-gallery blueimp-gallery-carousel blueimp-gallery-controls");
    gallerydiv.innerHTML = "<div class=\"slides\"></div>\
    <h3 class=\"title\"></h3>\
    <p class=\"description\"></p>\
    <a class=\"prev\">‹</a>\
    <a class=\"next\">›</a>\
    <a class=\"play-pause\"></a>\
    <ol class=\"indicator\"></ol>";
    //document.getElementById("blueimp-gallery-carousel").innerHTML;;
    container.appendChild(gallerydiv);

    var infowindow = new google.maps.InfoWindow({
        content : container
    });

    google.maps.event.addListener(infowindow, 'domready', function() {
        blueimp.Gallery(picarr, {
            container : "#" + gallerydiv.id,
            carousel : true,
            onslide : function(index, slide) {
                var text = this.list[index]['description'], node = this.container.find('.description');
                node.empty();
                if (text) {
                    node[0].appendChild(document.createTextNode(text));
                }
            }
        });
    });
    google.maps.event.addListener(marker, 'click', function() {
        //if(!infoBubble.isOpen())
        //infoBubble.open(marker.get('map'), marker);
        //else
        //infoBubble.close();
        infowindow.open(marker.get('map'), marker);
    });
    var oldp = location;
    flightPlanCoordinates.push(location);
    flightPath.setPath(flightPlanCoordinates);
    google.maps.event.addListener(marker, 'dragend', function() {
        var newp = marker.getPosition();
        for ( i = 0; i < flightPlanCoordinates.length; i++) {
            if (oldp.equals(flightPlanCoordinates[i]))
                break;
        }
        flightPlanCoordinates[i] = newp;
        oldp = newp;
        flightPath.setPath(flightPlanCoordinates);
    });
}

function addMarkers() {
    for (var i = 0; i < finalmaparr.length; i++)
        placeMarker(new google.maps.LatLng(finalmaparr[i][0][0], finalmaparr[i][0][1]), finalmaparr[i][1]);
}

function initialize() {
    var mapOptions = {
        center : new google.maps.LatLng(45.735938486025496, 126.62860035896301),
        zoom : 5,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    drawline();
    addMarkers();
}

function drawline() {
    flightPath = new google.maps.Polyline({
        path : flightPlanCoordinates,
        strokeColor : "#FF0000",
        strokeOpacity : 1.0,
        strokeWeight : 2
    });
    flightPath.setMap(map);
}

$(function() {
    initialize();
}); 