/**
 * Created by Bernard Baetens on 13/05/2017.
 */
$("#duration").val("4");
$('.publicTransportMainDiv').hide();

/* Page Loader */
$(document).on('pagebeforecreate', '[data-role="page"]', function(){
    var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
    },1);
});

$(document).on('pageshow', '[data-role="page"]', function(){
    var interval = setInterval(function(){
        $.mobile.loading('hide');
        clearInterval(interval);
    },100);
});

/* Panel behaviour per width */
$(document).on('pagebeforeshow', '#page1', function(){
    if (window.innerWidth > 1100) {
        $("#routingPanel").panel("open");
    }
});

window.onresize = function (event) {
    if (window.innerWidth > 1100) {
        window.setTimeout(openPanel, 1);
    }
    if (window.innerWidth < 1100) {
        window.setTimeout(closePanel, 1);
    }
};

function closePanel() {
    $("#routingPanel").panel("close");
}
function openPanel() {
    $("#routingPanel").panel("open");
}
/* Animate collapsible */
$(document).on("pagecreate", "#page1", function(){
    $(".animateMe .ui-collapsible-heading-toggle").on("click", function (e) {
        var current = $(this).closest(".ui-collapsible");
        if (current.hasClass("ui-collapsible-collapsed")) {
            //collapse all others and then expand this one
            $(".ui-collapsible-content", current).slideDown(300);
        } else {
            $(".ui-collapsible-content", current).slideUp(300);
        }
    });
});

$(document).on( "pagecontainerbeforeshow", function( event, ui ) {
    $(".initExpand .ui-collapsible-heading-toggle").click().removeClass("initExpand");
});

/* Autocomplete */
// change to an on-change event
$( document ).on( "pagecreate", "#page1", function() {

    $( "#autocompleteFrom" ).on( "filterablebeforefilter", function ( e, data ) {
        var $ul = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "";
        document.getElementById('autocompleteFrom').innerHTML = "";
        if ( value && value.length > 1 ) {
            $.ajax({
                url: "http://loc.geopunt.be/geolocation/suggestion",
                dataType: "jsonp",
                crossDomain: true,
                data: {
                    q: $input.val(),
                    c: 10
                }
            })
                .then( function ( response ) {
                    $.each( response, function ( i, val ) {
                        document.getElementById('autocompleteFrom').innerHTML = "";
                        for(i in response.SuggestionResult){
                            //console.log(response.SuggestionResult[i]);
                            var list_item = document.createElement("li");
                            list_item.setAttribute("class", "ui-li-static ui-body-inherit");
                            list_item.innerHTML = response.SuggestionResult[i];
                            document.getElementById('autocompleteFrom').appendChild(list_item);
                        }
                    });
                });
        }
    });

    $( "#autocompleteTo" ).on( "filterablebeforefilter", function ( e, data ) {
        var $ul = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "";
        document.getElementById('autocompleteTo').innerHTML = "";
        if ( value && value.length > 1 ) {
            $.ajax({
                url: "http://loc.geopunt.be/geolocation/suggestion",
                dataType: "jsonp",
                crossDomain: true,
                data: {
                    q: $input.val(),
                    c: 10
                }
            })
                .then( function ( response ) {
                    $.each( response, function ( i, val ) {
                        document.getElementById('autocompleteTo').innerHTML = "";
                        for(i in response.SuggestionResult){
                            //console.log(response.SuggestionResult[i]);
                            var list_item = document.createElement("li");
                            list_item.setAttribute("class", "ui-li-static ui-body-inherit");
                            list_item.innerHTML = response.SuggestionResult[i];
                            document.getElementById('autocompleteTo').appendChild(list_item);
                        }
                    });
                });
        }
    });

});

// Layers
// Aerial
var ortho = new ol.source.TileWMS({
    url:'http://geoservices.informatievlaanderen.be/raadpleegdiensten/omwrgbmrvl/wms',
    params: {
        'LAYERS': 'Ortho',
        'FORMAT': 'image/png'
    }
});
var orthoWms = new ol.layer.Tile({
    source: ortho
});
// GRB
var grb = new ol.source.TileWMS({
    url:'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'myspot:grb',
        'FORMAT': 'image/png'},
    serverType: 'geoserver'
});
var grbWms = new ol.layer.Tile({
    source:grb
});
// INFO
var info = new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'myspot:info',
        'FORMAT': 'image/png'},
    serverType: 'geoserver'
});
var infoWms = new ol.layer.Image({
    source:info
});

//  PARKINGAREAL
var parkingareal = new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'myspot:parkingareal',
        'FORMAT': 'image/png'},
    serverType: 'geoserver'
});
var parkingarealWms = new ol.layer.Image({
    source:parkingareal
});

// INHABITANTS
var inhabitants = new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'myspot:inhabitants',
        'FORMAT' : 'image/png'},
    serverType: 'geoserver'
});
var inhabtitantsWms = new ol.layer.Image({
    source:inhabitants
});
// CIRCULATION
var circulation = new ol.source.TileWMS({
    url:'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'myspot:circulationplan',
        'FORMAT' : 'image/png'},
    serverType: 'geoserver'
});
var circulationWms = new ol.layer.Tile({
    source: circulation
});
// PARKING AREAS
var parkingareas = new ol.source.TileWMS({
    url:'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'myspot:parkingareas',
        'FORMAT' : 'image/png'},
    serverType: 'geoserver'
});
var parkingareasWms = new ol.layer.Tile({
    source: parkingareas
});
// TAXI
var taxi = new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'myspot:taxi',
        'FORMAT' : 'image/png'},
    serverType: 'geoserver'
});
var taxiWms = new ol.layer.Image({
    source: taxi
});
// CAMBIO
var cambio = new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'myspot:cambio',
        'FORMAT' : 'image/png'},
    serverType: 'geoserver'
});
var cambioWms = new ol.layer.Image({
    source: cambio
});
// BLUEBIKE
var bluebike = new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'myspot:bluebike',
        'FORMAT' : 'image/png'},
    serverType: 'geoserver'
});
var bluebikeWms = new ol.layer.Image({
    source: bluebike
});
// STATIONS
var stations = new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'myspot:stations',
        'FORMAT' : 'image/png'},
    serverType: 'geoserver'
});
var stationsWms = new ol.layer.Image({
    source:stations
});
// PARKINGGARAGES
var garages = new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'myspot:parkinggarages',
        'FORMAT' : 'image/png'},
    serverType: 'geoserver'
});
var garagesWms = new ol.layer.Image({
    source:garages
});
// P+R
var pr = new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'myspot:pr',
        'FORMAT' : 'image/png'},
    serverType: 'geoserver'
});
var prWms = new ol.layer.Image({
    source:pr
});


// Pop-up
// * Elements that make up the popup.
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
// * Create an overlay to anchor the popup to the map.
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
}));
// Add a click handler to hide the popup.
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

/* Create MAP function*/
$ (function() {
    // create projection
    var lb72 = new ol.proj.Projection({
        code: 'EPSG:31370',
        extent: [14637.25, 22608.21, 291015.29, 246424.28],
        units: 'm'
    });
    ol.proj.addProjection(lb72);

    // View
    var view = new ol.View({
        projection: lb72,
        zoom: 6,
        minZoom: 2,
        center: [104769, 193932],
        extent: [86332, 174808, 125083, 212935]
    });

    // Array of layers
    var layers = [orthoWms, grbWms, infoWms, inhabtitantsWms, circulationWms, parkingareasWms, taxiWms, cambioWms,
        bluebikeWms, stationsWms, garagesWms, prWms];

    // Create Map
    var map = new ol.Map({
        layers: layers,
        overlays : [overlay],
        target: 'map',
        view: view
    });

    // Buttons
    // URLS
    const urlLocation = "http://loc.geopunt.be/geolocation/location";

    // Function that retrieves info from the CRAB API
    function crabAPI(url, parameters, callback, origin){
        $.getJSON({
                url:url,
                data: parameters,
                dataType: 'jsonp'
            },
            // Anonieme functie die de resultaten doorstuurt naar de "callback" functie
            function (jsonresults) {
                callback(jsonresults, origin);
            });
    }
    // Formats the json callback to retrieve the address and places it in from or to box
    function formatAddressFromLocation(locationAddress, origin){
        var locationResult = locationAddress.LocationResult[0];
        var address = locationResult.FormattedAddress;
        if (origin === 'from'){
            var fromBox = document.getElementById("filter-input-from");
            fromBox.value = address;
        } else {
            var toBox = document.getElementById("filter-input-to");
            toBox.value = address;
        }
    }
    // Formats the json callback to retrieve the location and forwards it to the place marker
    function getLocationFromAddress(listAddress, origin){
        var locationResult = listAddress.LocationResult[0];
        var coordinates = [locationResult.Location.X_Lambert72, locationResult.Location.Y_Lambert72];
        if (origin === 'from'){
            setFromMarker(coordinates);
        } else {
            setToMarker(coordinates);
        }
    }
    /* retrieve text from clicked li in FROM (suggestionlist),
     Delete list items and place marker
     */
    $("#autocompleteFrom").on("click", "li", function () {
        var text = $(this).text();
        console.log(text);
        $(this).closest("ul").prev("div").find("input").val(text);
        $(this).siblings().addBack().addClass("ui-screen-hidden");

        // Retrieve text and forward to retrieve coordinates
        var parameters = {
            q : text,
            c : 1
        };

        crabAPI(urlLocation, parameters, getLocationFromAddress, 'from');
    });
    /* retrieve text from clicked li in FROM (suggestionlist),
     Delete list items and place marker
     */
    $("#autocompleteTo").on("click", "li", function () {
        var text = $(this).text();
        // console.log(text);
        $(this).closest("ul").prev("div").find("input").val(text);
        $(this).siblings().addBack().addClass("ui-screen-hidden");

        // Retrieve Coordinates and forward to place marker
        var parameters = {
            q : text,
            c : 1
        };

        crabAPI(urlLocation, parameters, getLocationFromAddress, 'to');
    });

    // From Map Location
    var btnFromMapLocation = document.getElementById("btnFromMapLocation");
    btnFromMapLocation.addEventListener('click', function fromMapLocation(){
        // Mobile Design 'close panel'
        if (window.innerWidth < 700) {
            $("#routingPanel").panel("close");
        }

        map.once('click', function(event){
            var coord = event.coordinate;

            var parameters = {
                q : coord[0] + ',' + coord[1],
                c : 1
            };

            crabAPI(urlLocation, parameters, formatAddressFromLocation, 'from');
            setFromMarker(coord);

            // Mobile Design 'open panel'
            if (window.innerWidth < 700) {
                $("#routingPanel").panel("open");
            }
        });
    } );
    // To Map Location
    var btnToMapLocation = document.getElementById("btnToMapLocation");
    btnToMapLocation.addEventListener('click', function toMapLocation(){
        // Mobile Design 'close panel'
        if (window.innerWidth < 700) {
            $("#routingPanel").panel("close");
        }

        map.once('click', function(event){
            var coord = event.coordinate;

            var parameters = {
                q : coord[0] + ',' + coord[1],
                c : 1
            };

            crabAPI(urlLocation, parameters, formatAddressFromLocation, 'to');
            setToMarker(coord);

            // Mobile Design 'open panel'
            if (window.innerWidth < 700) {
                $("#routingPanel").panel("open");
            }
        });
    } );
    var positionFromFeature = new ol.Feature();
    positionFromFeature.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/flag-map-marker2.svg",
            anchorOrigin: "bottom-right",
            scale: 0.05
        })
    }));
    var positionToFeature = new ol.Feature();
    positionToFeature.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/flag-map-marker2.svg",
            anchorOrigin: "bottom-right",
            scale: 0.05
        })
    }));
    // Set location marker
    function setFromMarker(position){
        positionFromFeature.setGeometry(position ?
            new ol.geom.Point(position) : null);

        fromMarker = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [positionFromFeature]
            })
        });
        map.addLayer(fromMarker);

        // place the coordinates as arbitrary data to the element
        $("#autocompleteFrom").data('coordinates', position);
        checkMarker('from');
    }
    function setToMarker(position){
        positionToFeature.setGeometry(position ?
            new ol.geom.Point(position) : null);

        toMarker = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [positionToFeature]
            })
        });
        map.addLayer(toMarker);

        // place the coordinates as arbitrary data to the element
        $("#autocompleteTo").data('coordinates', position);
        checkMarker('to');
    }

    // NAVIGATION FUNCTIONS
    var navigationMarker;
    var fromMarker;
    var toMarker;
    // Variable geolocation creation
    var geolocation = new ol.Geolocation({
        projection: map.getView().getProjection(),
        tracking: false,
        trackingOptions: {
            enableHighAccuracy: true,
            maximumAge: 5000
        }
    });

    var handleGetPosition = function() {
        var trackingwasalreadyon = geolocation.getTracking();
        if(trackingwasalreadyon){
            geolocation.setTracking(false);
            map.removeLayer(navigationMarker);
        } else {
            geolocation.setTracking(true); getPosition();
            // Mobile Design 'close panel'
            if (window.innerWidth < 700) {
                $("#routingPanel").panel("close");
            }
        }
    };

    function getPosition() {
        // Navigation markers
        var accuracyFeature = new ol.Feature();

        var navigation = new ol.Feature();
        navigation.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#ff7f00'
                }),
                stroke: new ol.style.Stroke({
                    color: '#2a3141',
                    width: 3
                })
            })
        }));

        geolocation.on('change:accuracyGeometry', function () {
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        });

        geolocation.on('change:position', function () {
            var pos = geolocation.getPosition();
            navigation.setGeometry(pos ?
                new ol.geom.Point(pos) : null);
            view.setCenter(pos);
            view.setZoom(12);
        });
        navigationMarker = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [accuracyFeature, navigation]
            })
        });

        map.addLayer(navigationMarker);
    }
    var navigateBtn = document.getElementById("btnNavigation");
    navigateBtn.addEventListener('click', handleGetPosition, false);
    navigateBtn.addEventListener('touchstart', handleGetPosition, false);


    // CURRENT LOCATIONS
    var btnFromCurrentLocation = document.getElementById("btnFromCurrentLocation");
    btnFromCurrentLocation.addEventListener('click', function fromCurrentLocation(){
        new ol.Geolocation({
            projection: map.getView().getProjection(),
            tracking: true,
            trackingOptions: {
                enableHighAccuracy: true
            }
        })
            .once('change', function() {
                var position = this.getPosition();
                var speed = this.getSpeed();
                var altitude = this.getAltitude();
                var heading = this.getHeading();

                var parameters = {
                    q : position[0] + ',' + position[1],
                    c : 1
                };

                crabAPI(urlLocation, parameters, formatAddressFromLocation, 'from');
                setFromMarker(position);

                // this.setTracking(false);
            });
    });
    var btnToCurrentLocation = document.getElementById("btnToCurrentLocation");
    btnToCurrentLocation.addEventListener('click', function toCurrentLocation(){
        new ol.Geolocation({
            projection: map.getView().getProjection(),
            tracking: true,
            trackingOptions: {
                enableHighAccuracy: true
            }
        })
            .once('change', function() {
                var position = this.getPosition();
                var speed = this.getSpeed();
                var altitude = this.getAltitude();
                var heading = this.getHeading();

                var parameters = {
                    q : position[0] + ',' + position[1],
                    c : 1
                };

                crabAPI(urlLocation, parameters, formatAddressFromLocation, 'to');
                setToMarker(position);

                // this.setTracking(false);
            });
    });

    // WMS getfeatureInfo
    var viewProjection = view.getProjection();
    var viewResolution = view.getResolution();
    var parkingRTList = ['Sint-Michiels', 'Sint-Pietersplein', 'Vrijdagmarkt', 'Savaanstraat', 'Ramen', 'Reep'];
    const url_parkings_online = "http://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json";

    // Get Real-time Parking Info
    function getParkingRTInfo(url, parameters, success, name){
        $.getJSON({
                url: url,
                data: parameters,
                dataType: 'json'
            },
            function(jsonresults){
                success(jsonresults, name);
            });
    }
    // Parse parkinggarage result to acquire wanted garage data
    function parseParking(results, name){
        // console.log(results);
        for(var i = 0; i < results.length; i++){
            if(results[i].description === name){
                var capacityRT = results[i].parkingStatus.availableCapacity;
                // console.log(capacityRT);
                // Append the result to the pop-up
                content.appendChild(document.createElement('br'));
                content.appendChild(document.createElement('br'));
                content.appendChild(document.createTextNode('Current available parking spots: '));
                content.appendChild(document.createTextNode(capacityRT));
            }
        }
    }

    map.on('click', function(evt) {
        // ParkingGarage
        if (garagesWms.getVisible()){
            var urlGarage = garagesWms.getSource().getGetFeatureInfoUrl(
                evt.coordinate, view.getResolution(), viewProjection,
                {
                    'INFO_FORMAT': 'text/javascript'
                });
            if (urlGarage) {
                // console.log("Garage:" + urlGarage);
                $.ajax({
                    url: urlGarage,
                    dataType: 'jsonp',
                    jsonpCallback: 'parseResponse'
                }).then(function(response) {
                    var parser = new ol.format.GeoJSON();
                    var results = parser.readFeatures(response);
                    if (results.length) {
                        var info =[];
                        for (var i = 0, ii = results.length; i < ii; ++i) {
                            info.push('<h4 class="popUpHeader">Parking Garage Information</h4>');
                            info.push('Name: ' + results[i].get('naam'));
                            info.push('Address: ' + results[i].get('address'));
                            info.push('Capacity: ' + results[i].get('capaciteit'));
                            info.push('Contact: ' + results[i].get('contact'));
                            info.push('<a href=' + results[i].get('url') + " target='_blank'>Visit Parking Garage Website </a>");
                            // Retrieve real-time data if available
                            if (parkingRTList.indexOf(results[i].get('naam')) >= 0){
                                var parkingName = (results[i].get('naam'));
                                getParkingRTInfo(url_parkings_online, {}, parseParking, parkingName);
                            }
                        }
                        // Create pop-up
                        if (info){
                            var infoFormat = info.join('<br>');
                            content.innerHTML = '<code>' + infoFormat + '</code>';
                            overlay.setPosition(evt.coordinate);
                        }
                    }
                    infoPr(evt);
                });
            }
        } else {
            infoPr(evt);
        }
    });

    function infoPr(evt) {
        if (prWms.getVisible()){
            var urlPR = prWms.getSource().getGetFeatureInfoUrl(
                evt.coordinate, view.getResolution(), viewProjection,
                {
                    'INFO_FORMAT': 'text/javascript'
                });
            if (urlPR) {
                // console.log("Parking:" + urlPR);
                $.ajax({
                    url: urlPR,
                    dataType: 'jsonp',
                    jsonpCallback: 'parseResponse'
                }).then(function(response) {
                    var parser = new ol.format.GeoJSON();
                    var results = parser.readFeatures(response);
                    //console.log(response);
                    // console.log(results);
                    if (results.length) {
                        var info =[];
                        for (var i = 0, ii = results.length; i < ii; ++i) {
                            info.push('<h4 class="popUpHeader">Park + Ride Information</h4>');
                            info.push('Name: ' + results[i].get('naam'));
                            info.push('Address: ' + results[i].get('address'));
                            info.push('Capacity: ' + results[i].get('capacity'));
                            info.push('Status: ' + results[i].get('status'));
                            info.push('<a href=' + results[i].get('url') + " target='_blank'>Visit PR Website </a>");
                        }
                    }
                    // Create pop-up
                    if (info){
                        var infoFormat = info.join('<br>');
                        content.innerHTML = '<code>' + infoFormat + '</code>';
                        overlay.setPosition(evt.coordinate);
                    }
                    infoParkingAreas(evt);
                });
            }
        } else {
            infoParkingAreas(evt);
        }
    }

    function infoParkingAreas(evt) {
        if (parkingareasWms.getVisible()){
            var urlParkingAreas = parkingareasWms.getSource().getGetFeatureInfoUrl(
                evt.coordinate, view.getResolution(), viewProjection,
                {
                    'INFO_FORMAT': 'text/javascript'
                });
            if (urlParkingAreas) {
                // console.log(urlParkingAreas);
                $.ajax({
                    url: urlParkingAreas,
                    dataType: 'jsonp',
                    jsonpCallback: 'parseResponse'
                }).then(function(response) {
                    var parser = new ol.format.GeoJSON();
                    var results = parser.readFeatures(response);
                    // console.log(response);
                    // console.log(results);
                    if (results.length) {
                        var info =[];
                        for (var i = 0, ii = results.length; i < ii; ++i) {
                            info.push('<h4 class="popUpHeader">Parking Area Information</h4>');
                            info.push('Zone: ' + results[i].get('zone'));
                            if (results[i].get('url')){
                                info.push('<a href=' + results[i].get('url') + " target='_blank'>Visit Parking Area </a>");
                            }
                        }
                    }
                    // Create pop-up
                    if (info){
                        var infoFormat = info.join('<br>');
                        content.innerHTML = '<code>' + infoFormat + '</code>';
                        overlay.setPosition(evt.coordinate);
                    }
                    infoCirculationAreas(evt);
                });
            }
        } else {
            infoCirculationAreas(evt);
        }
    }
    function infoCirculationAreas(evt) {
        if (circulationWms.getVisible()){
            var urlCirculationAreas = circulationWms.getSource().getGetFeatureInfoUrl(
                evt.coordinate, view.getResolution(), viewProjection,
                {
                    'INFO_FORMAT': 'text/javascript'
                });
            if (urlCirculationAreas) {
                // console.log(urlCirculationAreas);
                $.ajax({
                    url: urlCirculationAreas,
                    dataType: 'jsonp',
                    jsonpCallback: 'parseResponse'
                }).then(function(response) {
                    var parser = new ol.format.GeoJSON();
                    var results = parser.readFeatures(response);
                    // console.log(response);
                    // console.log(results);
                    if (results.length) {
                        var info =[];
                        for (var i = 0, ii = results.length; i < ii; ++i) {
                            info.push('<h4 class="popUpHeader">Circulation Area Information</h4>');
                            info.push('Zone: ' + results[i].get('zone'));
                            info.push('Name: ' + results[i].get('naam'));
                        }
                    }
                    // Create pop-up
                    if (info){
                        var infoFormat = info.join('<br>');
                        content.innerHTML = '<code>' + infoFormat + '</code>';
                        overlay.setPosition(evt.coordinate);
                    }
                    infoParkingAeral(evt);
                });
            }
        } else {
            infoParkingAeral(evt);
        }
    }

    function infoParkingAeral(evt) {
        if (grbWms.getVisible()){
            var urlInfoParkingAreas = parkingarealWms.getSource().getGetFeatureInfoUrl(
                evt.coordinate, view.getResolution(), viewProjection,
                {
                    'INFO_FORMAT': 'text/javascript'
                });
            if (urlInfoParkingAreas) {
                // console.log(urlInfoParkingAreas);
                $.ajax({
                    url: urlInfoParkingAreas,
                    dataType: 'jsonp',
                    jsonpCallback: 'parseResponse'
                }).then(function(response) {
                    var parser = new ol.format.GeoJSON();
                    var results = parser.readFeatures(response);
                    var zone;
                    //console.log(response);
                    //console.log(results);
                    if (results.length) {
                        var info =[];
                        for (var i = 0, ii = results.length; i < ii; ++i) {

                            if(results[i].get('pregime') === '0'){
                                zone = 'Blauwe tariezone';
                            } else if (results[i].get('pregime') === '1'){
                                zone = 'Rode tariefzone';
                            } else if (results[i].get('pregime') === '2'){
                                zone = 'Oranje tariefzone';
                            } else if (results[i].get('pregime') === '3'){
                                zone = 'Gele tariefzone';
                            } else if (results[i].get('pregime') === '4'){
                                zone = 'Groene tariefzone';
                            } else if (results[i].get('pregime') === '5'){
                                zone = 'Vrij parkeren';
                            } else if (results[i].get('pregime') === '6'){
                                zone = 'Bewonersparkeren';
                            } else if (results[i].get('pregime') === '7'){
                                zone = 'Tijdsvenster (Voorbehouden tijdens specifiek deel van de dag (meer dan 1 dag per week))';
                            } else if (results[i].get('pregime') === '8'){
                                zone = 'Voorbehouden (Voorbehouden ifv doelgroep, altijd de hele dag)';
                            } else if (results[i].get('pregime') === '9'){
                                zone = 'Foutparkeren (plaatsen waar geparkeerd wordt, hoewel er geen wettelijke parkeermogelijkheden zijn)';
                            }
                            info.push('<h4 class="popUpHeader">Street Parking Information</h4>');
                            info.push('Parking specification: ' + zone);
                            info.push('Capacity: ' + results[i].get('capaciteit'));
                            if (results[i].get('opmerkinge')){
                                info.push('Remark: ' + results[i].get('opmerkinge'));
                            }
                        }
                    }
                    // Create pop-up
                    if (info){
                        var infoFormat = info.join('<br>');
                        content.innerHTML = '<code>' + infoFormat + '</code>';
                        overlay.setPosition(evt.coordinate);
                    }
                });
            }
        }
    }

    // Check From and to input
    function checkMarker(origin){
        var coordinates;
        if (origin === 'from'){
            coordinates = $("#autocompleteFrom").data('coordinates');
            if (coordinates){
                // Check actual coordinates
                if (coordinates[0] < 86792 || coordinates[0] > 124899
                    || coordinates[1] < 175136 || coordinates[1] > 212609){
                    clearLocationMarker('from');
                    return (false);
                } else {
                    return (true);
                }
            } else {
                clearLocationMarker('from');
                return (false);
            }
        } else {
            coordinates = $("#autocompleteTo").data('coordinates');
            if (coordinates){
                // Check actual coordinates
                if (coordinates[0] < 86792 || coordinates[0] > 124899
                    || coordinates[1] < 175136 || coordinates[1] > 212609) {
                    clearLocationMarker('to');
                    return (false);
                } else {
                    return (true);
                }
            } else {
                clearLocationMarker('to');
                return (false);
            }
        }
    }

    // Clear error input and possible markers
    function clearLocationMarker(origin){
        if (origin === 'from'){
            alert("Error with 'From location' input was given!");
            document.getElementById('filter-input-from').value = "";
            document.getElementById('filter-input-from').focus();
            if (map.getLayers(fromMarker)) {
                map.removeLayer(fromMarker);
            }
        } else {
            alert("Error with 'To location' input was given!");
            document.getElementById('filter-input-to').value = "";
            document.getElementById('filter-input-to').focus();
            if (map.getLayers(toMarker)) {
                map.removeLayer(toMarker);
            }
        }
    }

    // check date and time input
    function checkTime(time){
        if (time === ''){
            alert('No time of departure was given!');
            document.getElementById('time-input').focus();
        } else {
            return(true);
        }
    }
    function checkDate(date){
        if (date === ''){
            alert('No date of departure was given!');
            document.getElementById('date-input').focus();
        } else {
            return(true);
        }
    }

    ////// Calculate and Reset Button
    var btnRoute = document.getElementById("btnRoute");
    btnRoute.addEventListener('click', function btnRoute(){
        $('#routingInfoCollapseHeader').collapsible("collapse");
        document.getElementById('routingLayersCollapse').className = "layerType animateMe ui-disabled";
        document.getElementById('routingInfoCollapseHeader').className = "routingInfoCollapsible ui-disabled";
        // enable routing Info collapsible and Routing Layer checkboxes
        // Good? document.getElementById('routingInfoCollapseHeader').className = "routingInfoCollapsible ui-disabled";
        // Good? document.getElementById('routingLayersCollapseHeader').className = "ui-collaspible-set ui-disabled";
        // collapse routing info
        //
        // collapse routing layers collapsible
        // $('#routingLayersCollapse').collapsible("collapse");
        // Clear Routing Layers
        clearRoutingLayers();
        // Clear Public Transport Information
        document.getElementById('prPublicTransportInfo').innerHTML = "";
        document.getElementById('garagePublicTransportInfo').innerHTML = "";
        // $('#InfoPtCollapsible').listview('refresh');
        // Get the input from the form
        var fromAddress = document.getElementById("filter-input-from").value;
        var fromCoordinates = $("#autocompleteFrom").data('coordinates');
        var toAddress  = document.getElementById("filter-input-to").value;
        var toCoordinates = $("#autocompleteTo").data('coordinates');
        var date = document.getElementById("date-input").value;
        var time = document.getElementById("time-input").value;
        var duration = document.getElementById("duration").value;
        var postTransportWalk = document.getElementById("postWalk");
        var postTransportBike = document.getElementById("postBike");
        var postTransportBus = document.getElementById("postBus");

        var postTransport;
        if (postTransportWalk.checked){
            postTransport = 'pedestrian';
        } else if (postTransportBike.checked){
            postTransport = 'bicycle';
        } else if (postTransportBus.checked){
            postTransport = 'bus'
        }
        // Check Input
        if (checkMarker('from') && checkMarker('to') && checkTime(time) && checkDate(date)){
            // console.log('good to send query!');
            routeInput = {
                fromAddress : fromAddress,
                fromLb72 : fromCoordinates,
                fromWgs84 : ol.proj.transform(fromCoordinates, lb72, 'EPSG:4326'),
                toAddress : toAddress,
                toLb72 : toCoordinates,
                toWgs84 : ol.proj.transform(toCoordinates, lb72, 'EPSG:4326'),
                date : date,
                time : time,
                dateTime : date + 'T' + time + ':59',
                duration : duration,
                postTransport : postTransport
            };
            routingMain();

        } else {
            console.log('ERROR in input, not ready to send query!');
        }

    });

    var btnReset = document.getElementById("btnReset");
    btnReset.addEventListener('click', function btnReset(){
        // Collapse routing lists
        collapseLists();
        // Reset the values from the input form
        document.getElementById("filter-input-from").value = "";
        document.getElementById("filter-input-to").value = "";
        document.getElementById("date-input").value = "";
        document.getElementById("time-input").value = "";
        $("#duration").val("4").selectmenu('refresh');
        $('#postWalk').prop('checked', true).checkboxradio('refresh');
        $('#postBike').prop('checked', false).checkboxradio('refresh');
        $("#autocompleteFrom").data('coordinates', 0);
        $("#autocompleteTo").data('coordinates', 0);
        routeInput = '';
        // Disable Navigation and clear marker
        /*
         if (map.getLayers(navigationMarker)){
         geolocation.setTracking(false);
         map.removeLayer(navigationMarker);
         }
         */
        // Clear Markers
        if (map.getLayers(fromMarker)){
            map.removeLayer(fromMarker);
        }
        if (map.getLayers(toMarker)){
            map.removeLayer(toMarker);
        }
        // Clear Routing layers
        clearRoutingLayers();

        // Clear Public Transport Information
        document.getElementById('prPublicTransportInfo').innerHTML = "";
        document.getElementById('garagePublicTransportInfo').innerHTML = "";

        // disable routing Info collapsible
        // Good? $('#routingInfoCollapseHeader').collapsible("collapse");
        // disable routing layers collapsible
        // document.getElementById('routingLayersCollapseHeader').setAttribute("data-collapsed","true");
        // Good? $('#routingLayersCollapse').collapsible("collapse");
        document.getElementById('routingLayersCollapse').className = "layerType animateMe ui-disabled";
        document.getElementById('routingInfoCollapseHeader').className = "routingInfoCollapsible ui-disabled";
    });

    function clearRoutingLayers(){
        for(var i = 0; i < vectorLayers.length; i++) {
            map.getLayers().forEach(function (el) {
                if (vectorLayers.indexOf(el.get('name')) >= 0) {
                    map.removeLayer(el);
                }
            })
        }
    }
    var vectorLayers = [
        'parkingGarageCar','parkingGarageWalkBike','prCar','prWalkBike','carGarageLabel','carGarageCircle','walkGarageLabel','walkGarageCircle','bikeGarageLabel','bikeGarageCircle'
        ,'carPrLabel','carPrCircle','walkPrLabel','walkPrCircle','bikePrLabel','bikePrCircle','ptPrBus','ptPrBusLabel','ptPrBusLabelCircle','ptPrTram','ptPrTramLabel','ptPrTramLabelCircle'
        ,'ptPrWalk','ptPrWalkLabel','ptPrWalkLabelCircle','ptGarageBus','ptGarageBusLabel','ptGarageBusLabelCircle','ptGarageTram','ptGarageTramLabel','ptGarageTramLabelCircle'
        ,'ptGarageWalk','ptGarageWalkLabel','ptGarageWalkLabelCircle'
    ];
    var vectorLayersPr = [
        'prCar','prWalkBike','carPrLabel','carPrCircle','walkPrLabel','walkPrCircle','bikePrLabel','bikePrCircle','ptPrBus','ptPrBusLabel'
        ,'ptPrBusLabelCircle','ptPrTram','ptPrTramLabel','ptPrTramLabelCircle','ptPrWalk','ptPrWalkLabel','ptPrWalkLabelCircle'
    ];
    var vectorLayersGarage = [
        ,'parkingGarageCar','parkingGarageWalkBike','carGarageLabel','carGarageCircle','walkGarageLabel','walkGarageCircle','bikeGarageLabel'
        ,'bikeGarageCircle','ptGarageBus','ptGarageBusLabel','ptGarageBusLabelCircle','ptGarageTram','ptGarageTramLabel','ptGarageTramLabelCircle'
        ,'ptGarageWalk','ptGarageWalkLabel','ptGarageWalkLabelCircle'
    ];

    //////////////////////////////////////////////////////////////////////////////////////////
    function routingMain() {
        if (routeInput.postTransport === 'bus') {
            prRoutePrep(function () {
                routingTomTom(routeInput['fromWgs84'], routeInput['prWgs84'], 'prTo', routeInput['dateTime'], function () {
                    parseTomTom('prTo', function () {
                        routingDeLijn(routeInput['prLb72'], routeInput['prTo'].summary, function () {
                            parseDeLijn('prFrom', function () {
                                parkingGarageRoutePrep(function () {
                                    routingTomTom(routeInput['fromWgs84'], routeInput['parkingGarageWgs84'], 'parkingGarageTo', routeInput['dateTime'], function () {
                                        parseTomTom('parkingGarageTo', function () {
                                            routingDeLijn(routeInput['parkingGarageLb72'], routeInput['parkingGarageTo'].summary, function () {
                                                parseDeLijn('parkingGarageFrom', function () {
                                                    infoRoutingPr(function () {
                                                        getParkingRTRoutingInfo(function () {
                                                            parseRTParking(function () {
                                                                infoRoutingGarage(function () {
                                                                    parkingCost(function () {
                                                                        placeRoutingInfo('pr', function () {
                                                                            placeRoutingInfo('garage', function () {
                                                                                placePtRoutingInfo('pr', function(){
                                                                                    placePtRoutingInfo('parkingGarage', function() {
                                                                                        routingVisible();
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        } else {
            prRoutePrep(function () {
                routingTomTom(routeInput['fromWgs84'], routeInput['prWgs84'], 'prTo', routeInput['dateTime'], function () {
                    parseTomTom('prTo', function () {
                        routingTomTom(routeInput['prWgs84'], routeInput['toWgs84'], 'prFrom', routeInput['prTo'].summary.arrivalTime, function () {
                            parseTomTom('prFrom', function () {
                                parkingGarageRoutePrep(function () {
                                    routingTomTom(routeInput['fromWgs84'], routeInput['parkingGarageWgs84'], 'parkingGarageTo', routeInput['dateTime'], function () {
                                        parseTomTom('parkingGarageTo', function () {
                                            routingTomTom(routeInput['parkingGarageWgs84'], routeInput['toWgs84'], 'parkingGarageFrom', routeInput['parkingGarageTo'].summary.arrivalTime, function () {
                                                parseTomTom('parkingGarageFrom', function () {
                                                    infoRoutingPr(function () {
                                                        getParkingRTRoutingInfo(function () {
                                                            parseRTParking(function () {
                                                                infoRoutingGarage(function () {
                                                                    parkingCost(function () {
                                                                        placeRoutingInfo('garage', function () {
                                                                            placeRoutingInfo('pr', function () {
                                                                                routingVisible();
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
    }

    var routeInput;
    var wgs84Sphere = new ol.Sphere(6378137);

    // Calculate closest parking garage and append to routeInfo object
    function parkingGarageRoutePrep(callback) {
        var distanceParkingEnd = 9999999;
        var parking;
        var parkingWgs84;
        var parkingGarageCoordinates = {
            Ramen: [104261.52507237, 194111.628304237],
            Tolhuis: [104914.491334221, 195108.245492673],
            Vrijdagmarkt: [104911.184161729, 194287.448811265],
            'Sint-Michiels': [104405.133736929, 193908.246798581],
            'Center Parking': [104675.679452555, 193621.97038464],
            Kouter: [104768.46873339, 193526.063520768],
            Savaanstraat: [104731.329651437, 193387.873590265],
            Reep: [105257.015142947, 193728.824085264],
            Zuid: [105258.431472301, 193241.026439877],
            'Sint-Pietersplein': [104918.584255497, 192631.183140187],
            Dampoort: [105886.143549601, 194179.763123978],
            'Gent Sint-Pieters': [103445.436261294, 192061.429281077]
        };
        for (var key in parkingGarageCoordinates) {
            var parkingWgs84Local = ol.proj.transform(parkingGarageCoordinates[key], lb72, 'EPSG:4326');
            var distance = wgs84Sphere.haversineDistance(routeInput['toWgs84'], parkingWgs84Local);
            if (distance < distanceParkingEnd) {
                distanceParkingEnd = distance;
                parking = key;
                parkingWgs84 = parkingWgs84Local;
            }
        }
        routeInput['parkingGarage'] = parking;
        routeInput['parkingGarageWgs84'] = parkingWgs84;
        routeInput['parkingGarageLb72'] = parkingGarageCoordinates[parking];

        callback();
    }
    // Calculate closest P+R and append to routeInfo object
    function prRoutePrep(callback) {
        var distanceParkingEnd = 9999999;
        var pr;
        var prWgs84;
        var prCoordinates = {
            Galveston : [ 104672.33956734474, 196228.45899770464 ],
            Vliegtuiglaan : [ 106150.79792687579, 196197.59182534833 ],
            'PR Oostakker' : [ 108545.83423999447, 196149.07709892374 ],
            Rozebroeken : [ 107501.09289556358, 194641.33262214623 ],
            Bellevue : [ 105488.41710226591, 191963.39673850033 ],
            'P+R Gentbrugge' : [ 107048.90091688254, 191834.10509330314 ],
            'Gentbrugge Arsenaal' : [ 107183.34733433856, 191549.56893824413 ],
            Moscou : [ 106643.29685623545, 191215.18145850673 ],
            Maaltepark : [ 103299.38060924545, 190519.14461244922 ],
            Hekers : [ 103791.64330844249, 188268.05159905273 ],
            'Sint-Pietersstation' : [ 103420.91774656725, 192067.56715576351 ],
            Watersportbaan : [ 102081.19550714568, 193533.22268539481 ],
            'Mariakerke Post' : [ 101610.26417827702, 196473.75978833344 ],
            Neptunus : [ 103491.36783998852, 197649.16459892411 ],
            Industrieweg : [ 103952.8322399895, 198914.64449892566 ]
        };
        for (var key in prCoordinates) {
            var prWgs84Local = ol.proj.transform(prCoordinates[key], lb72, 'EPSG:4326');
            var distance = wgs84Sphere.haversineDistance(routeInput['toWgs84'], prWgs84Local);
            if (distance < distanceParkingEnd) {
                distanceParkingEnd = distance;
                pr = key;
                prWgs84 = prWgs84Local;
            }
        }
        routeInput['pr'] = pr;
        routeInput['prWgs84'] = prWgs84;
        routeInput['prLb72'] = prCoordinates[pr];

        callback();
    }

    var tomTomData;
    function routingTomTom(fromLocal, toLocal, route, departure, callback){
        urlBase = 'https://api.tomtom.com/routing/1/calculateRoute/';
        urlConstruct = urlBase + fromLocal[1] + ',' + fromLocal[0] + ':' + toLocal[1] + ',' + toLocal[0] + '/json?key=###ADDYOURKEYHERE###';
        var travelMode;
        if (route.slice(-2) === 'To'){
            travelMode = 'car';
        } else {
            travelMode = routeInput['postTransport'];
        }

        var parameters = {
            routeType : 'fastest',
            traffic : 'true',
            departAt : departure,
            travelMode : travelMode,
            computeTravelTimeFor : 'all'
        };

        $.getJSON({
                url: urlConstruct,
                data: parameters,
                dataType: 'json'
            },
            function(jsonresults){
                tomTomData = jsonresults;
                callback();
            }
        );
    }

    function parseTomTom(route, callback) {
        var carPolylines = {};
        var walkPolylines = {};
        var bikePolylines = {};
        var carPoints = {};
        var walkPoints = {};
        var bikePoints = {};
        // console.log(results);
        var routeLocal = {
            summary : tomTomData.routes[0].summary
        };
        // Retrieve the coordinates from json and add them as an array to a local variable
        var polyLine = [];
        var points = tomTomData.routes[0].legs[0].points;
        for (i in points) {
            var lat = points[i]['latitude'];
            var lon = points[i]['longitude'];
            polyLine.push([lon, lat]);
        }

        // Create Linestring from coordinates
        var geom = new ol.geom.LineString(polyLine);
        // Transform the linestring from wgs84 to Lambert72
        geom.transform('EPSG:4326', lb72);
        // Add the geometry to the routingObject
        routeLocal['geometry'] = geom;
        routeInput[route] = routeLocal;
        // Get middle of linestring
        var coordinateMiddleLinestring = geom.getCoordinateAt(0.5);
        var point = new ol.geom.Point(coordinateMiddleLinestring);

        // console.log(routeInput);
        if (route === 'prTo' || route === 'parkingGarageTo'){
            carPolylines[0] = geom;
            carPoints[0] = point;
        } else if (route === 'prFrom' || route === 'parkingGarageFrom'){
            if (routeInput.postTransport === 'pedestrian'){
                walkPolylines[0] = geom;
                walkPoints[0] = point;
            } else if (routeInput.postTransport === 'bicycle'){
                bikePolylines[0] = geom;
                bikePoints[0] = point;
            }
        }

        // Check if objects exist and forward them to the drawing function
        if (Object.getOwnPropertyNames(carPolylines).length !== 0){
            createDrawLayer(route, 'car', carPolylines, carPoints);
        }
        if (Object.getOwnPropertyNames(walkPolylines).length !== 0){
            createDrawLayer(route, 'walk', walkPolylines, walkPoints);
        }
        if (Object.getOwnPropertyNames(bikePolylines).length !== 0){
            createDrawLayer(route, 'bike', bikePolylines, bikePoints);
        }
        callback();
    }

    var deLijnData;

    // Public Transport Routing
    function routingDeLijn(from, start, callback){
        // http://docs.delijn.apiary.io/#reference/routeplanner/get?console=1
        // Construct local variables
        var startX = Math.round(from[0]);
        var startY = Math.round(from[1]);
        var endX = Math.round(routeInput.toLb72[0]);
        var endY = Math.round(routeInput.toLb72[1]);
        var dateYear = start.arrivalTime.slice(0, 4);
        var dateMonth = start.arrivalTime.slice(5, 7);
        var dateDay = start.arrivalTime.slice(8, 10);
        var date = dateDay + '-' + dateMonth + '-' + dateYear;
        var time = start.arrivalTime.slice(11, 16);
        // Add max 4 minutes to startTime to ensure PT routing
        var timeHour = time.slice(0, 2);
        var timeMin = time.slice(3, 5);
        if (timeMin < 57){
            if ((parseInt(timeMin) + 3) < 10){
                time = timeHour + ':0' + (parseInt(timeMin) + 3);
            } else {
                time = timeHour + ':' + (parseInt(timeMin) + 3);
            }
        } else {
            if (timeHour !== 23) {
                time = (parseInt(timeHour) + 1) + ':' + '01';
            } else {
                time = '23:59';
            }
        }
        var urlBase = 'https://www.delijn.be/rise-api-core/reisadvies/routes/Gent/Gent/';
        var urlEnd = '/1/on/on/of/of/of/eng';
        var urlConstruct = urlBase + startX + '/' + startY + '/' + endX + '/' + endY + '/' + date + '/' + time + urlEnd;
        // console.log(urlConstruct);

        $.getJSON({
                url: urlConstruct,
                dataType: 'json'
            },
            function(jsonresults){
                deLijnData = jsonresults;
                callback();
            }
        );
    }

    // Parse jsonResults from deLijnRouting
    function parseDeLijn(route, callback){
        var walkPolylines = {};
        var busPolylines = {};
        var tramPolylines = {};
        var walkPoints = {};
        var busPoints = {};
        var tramPoints = {};
        // var name = route + 'PublicTransport';
        var routeEndTime = 999999;
        var routeDuration;
        var routing;
        var distanceTotal = 0;
        var routingLocalParsed = {
            summary : {},
            geometry: {},
            subroutes : {}
        };
        // Find parkingEnd to adjust found public transport routes
        var parkingEnd;
        if (route === 'prFrom'){
            parkingEnd = routeInput['prTo'].summary.arrivalTime;
        } else {
            parkingEnd = routeInput['parkingGarageTo'].summary.arrivalTime;
        }
        var parkingEndSeconds = ((parkingEnd.slice(11, 13)*(60*60)) + (parkingEnd.slice(14, 16)*60));
        // retrieve fastest route from array
        for (i in deLijnData.reiswegen){
            // Find startTime in seconds
            var startPt = deLijnData.reiswegen[i].startTime;
            var startPtSeconds = ((startPt.slice(0, 2)*(60*60)) + (startPt.slice(3, 5)*60));
            // If the route starts later than parkingEnd
            if (startPtSeconds > parkingEndSeconds){
                // console.log(durationLocal);
                // Calculate duration in seconds
                var durationLocal = deLijnData.reiswegen[i].duration;
                var durationRe = new RegExp('^([0-9]{1,2})u([0-9]{1,2})min$');
                var durationTest = durationRe.exec(durationLocal);
                var hoursDuration = durationTest[1];
                var minutesDuration = durationTest[2];
                routeDuration = (hoursDuration * (60*60)) + (minutesDuration *60);

                // Calculate on EndTime
                var endTimeLocal = deLijnData.reiswegen[i].endTime;
                var hoursEnd = endTimeLocal.slice(0, 2);
                var minutesEnd = endTimeLocal.slice(3, 5);
                var EndSeconds = (hoursEnd * (60*60)) + (minutesEnd * 60);
                // Take the route with the fastest endTime
                if (EndSeconds < routeEndTime){
                    routeEndTime = EndSeconds;
                    routing = deLijnData.reiswegen[i];
                }
            }
        }
        if (routeEndTime !== 999999){
            // Reverse date
            var endDate = routing.endDate;
            var endDateReversed = endDate.split("-").reverse().join("-");
            // Parse  general data into routingLocalObject
            routingLocalParsed.summary['departureTime'] = routing.startTime;
            routingLocalParsed.summary['arrivalTime'] = endDateReversed + 'T' + routing.endTime + ":00+02:00";
            routingLocalParsed.summary['travelTimeInSeconds'] = routeDuration;
            routingLocalParsed.summary['distanceFoot'] = routing.teVoet;
            routingLocalParsed.summary['detour'] = routing.heeftOmleidingen;

            var countLocal = 0;
            // Retrieve the different routing Coordinates from the several subroutes
            for (i in routing.reiswegStappen){
                var lastRoute = ((routing.reiswegStappen.length) - 1);
                // GEOMETRY
                // Get coordinates and create linestring and point in middle
                var routeLocal = routing.reiswegStappen[i];
                var polyline = [];
                var coordinates = routeLocal.coordinaten;
                var transportation = routeLocal.type;
                var transportationType = routeLocal.vervoerType;
                if (coordinates){
                    for ( i in coordinates){
                        var coordinateX = coordinates[i].x;
                        var coordinateY = coordinates[i].y;
                        polyline.push([coordinateX, coordinateY]);
                    }
                }
                // Get middle of linestring
                var geom = new ol.geom.LineString(polyline);
                // console.log(geom);
                var coordinateMiddleLinestring = geom.getCoordinateAt(0.5);
                var point = new ol.geom.Point(coordinateMiddleLinestring);

                // PARSE
                // Parse  subrouting data into routingLocalObject
                var distance = routeLocal.afstand;
                distanceTotal += distance;
                var subObject = {
                    departure : routeLocal['start'],
                    end : routeLocal['end'],
                    distance : distance,
                    startLocation : routeLocal.startLocatie,
                    endLocation : routeLocal.aankomstLocatie
                };
                var type;
                var lineNumber;
                var lineDescription;

                if (transportation === "WANDELEN"){
                    //Geometry
                    walkPolylines[i] = geom;
                    walkPoints[i] = point;
                    // Create the missing variables
                    type = 'walk';
                    lineNumber = '';
                    lineDescription = '';
                } else {
                    if (transportationType === "bus"){
                        //Geometry
                        busPolylines[i] = geom;
                        busPoints[i] = point;
                        // Create the missing variables
                        type = 'bus';
                        lineNumber = routeLocal.lijn.lijnNummerPubliek;
                        lineDescription = routeLocal.lijn.omschrijving;
                    } else if (transportationType === "tram"){
                        //Geometry
                        tramPolylines[i] = geom;
                        tramPoints[i] = point;
                        // Create the missing variables
                        type = 'tram';
                        lineNumber = routeLocal.lijn.lijnNummerPubliek;
                        lineDescription = routeLocal.lijn.omschrijving;
                    }
                }
                // append missing variables to subObject
                subObject['type'] = type;
                subObject['lineNumber'] = lineNumber;
                subObject['lineDescription'] = lineDescription;
                // Append geometry to routingLocalObject
                routingLocalParsed.geometry[countLocal] = {
                    polylines: geom,
                    points : point
                };
                // Append subObect to LocalObject
                routingLocalParsed.subroutes[countLocal] = subObject;

                countLocal += 1;
            }
            // Check if geometryObjects exist and forward them to the drawing function
            if (Object.getOwnPropertyNames(walkPolylines).length !== 0){
                createDrawLayer(route, 'walkPt', walkPolylines, walkPoints);
            }
            if (Object.getOwnPropertyNames(busPolylines).length !== 0){
                createDrawLayer(route, 'bus', busPolylines, busPoints);
            }
            if (Object.getOwnPropertyNames(tramPolylines).length !== 0){
                createDrawLayer(route, 'tram', tramPolylines, tramPoints);
            }

            // Append to localROutingObject to the RoutingInput
            routingLocalParsed.summary['lengthInMeters'] = distanceTotal;
            routeInput[route] = routingLocalParsed;

            callback();
        } else {
            alert('No Route for Public Transport could be calculated');
            clearRoutingLayers();
            document.getElementById('routingLayersCollapse').className = "layerType animateMe ui-disabled";
            document.getElementById('routingInfoCollapseHeader').className = "routingInfoCollapsible ui-disabled";
        }

    }

    // Draw the vector layers
    // LineLayers
    var parkingGarageCar;
    var parkingGarageWalkBike;
    var prCar;
    var prWalkBike;
    // Labels
    var carGarageLabel;
    var carGarageCircle;
    var walkGarageLabel;
    var walkGarageCircle;
    var bikeGarageLabel;
    var bikeGarageCircle;
    var carPrLabel;
    var carPrCircle;
    var walkPrLabel;
    var walkPrCircle;
    var bikePrLabel;
    var bikePrCircle;
    // P+R Public TransportLayers
    var ptPrBus;
    var ptPrBusLabel;
    var ptPrBusLabelCircle;
    var ptPrTram;
    var ptPrTramLabel;
    var ptPrTramLabelCircle;
    var ptPrWalk;
    var ptPrWalkLabel;
    var ptPrWalkLabelCircle;
    // ParkingGarage Public TransportLayers
    var ptGarageBus;
    var ptGarageBusLabel;
    var ptGarageBusLabelCircle;
    var ptGarageTram;
    var ptGarageTramLabel;
    var ptGarageTramLabelCircle;
    var ptGarageWalk;
    var ptGarageWalkLabel;
    var ptGarageWalkLabelCircle;

    function createDrawLayer(origin, type, polylines, points) {
        // create linestring
        var polylineSource = new ol.source.Vector({});
        var labelSource = new ol.source.Vector({});
        var circleSource = new ol.source.Vector({});
        //Loop through the objects create geometry and append to vectorSource
        for (i in polylines){
            var linestring_feature = new ol.Feature({
                geometry: polylines[i]
            });
            polylineSource.addFeature(linestring_feature);
        }
        for (i in points){
            var point_feature = new ol.Feature({
                geometry: points[i]
            });
            labelSource.addFeature(point_feature);
            circleSource.addFeature(point_feature);
        }
        if (origin === 'prTo'){
            // Create layers
            prCar = new ol.layer.Vector({
                source: polylineSource,
                style: prCarStyle
            });
            carPrLabel = new ol.layer.Vector({
                source: labelSource,
                style: carPrImage
            });
            carPrCircle = new ol.layer.Vector({
                source: circleSource,
                style: generalPrPtCircle
            });
            // Draw the layers on the map
            map.addLayer(prCar);
            map.addLayer(carPrCircle);
            map.addLayer(carPrLabel);
            // set Name
            prCar.set('name', 'prCar');
            carPrCircle.set('name', 'carPrCircle');
            carPrLabel.set('name', 'carPrLabel');
            // Set Z-Index
            prCar.setZIndex(10);
            carPrCircle.setZIndex(11);
            carPrLabel.setZIndex(12);
        } else if (origin === 'parkingGarageTo'){
            // Create layers
            parkingGarageCar = new ol.layer.Vector({
                source: polylineSource,
                style: garageCarStyle
            });
            carGarageLabel = new ol.layer.Vector({
                source: labelSource,
                style: carGarageImage
            });
            carGarageCircle = new ol.layer.Vector({
                source: circleSource,
                style: generalGaragePtCircle
            });
            // Draw the layers on the map
            map.addLayer(parkingGarageCar);
            map.addLayer(carGarageCircle);
            map.addLayer(carGarageLabel);
            // set Name
            parkingGarageCar.set('name', 'parkingGarageCar');
            carGarageCircle.set('name', 'carGarageCircle');
            carGarageLabel.set('name', 'carGarageLabel');
            // Set Z-Index
            carGarageCircle.setZIndex(11);
            carGarageLabel.setZIndex(12);
        } else if (origin === 'prFrom'){
            if (type === 'walk'){
                // Create layers
                prWalkBike = new ol.layer.Vector({
                    source: polylineSource,
                    style: prWalkBikeStyle
                });
                walkPrLabel = new ol.layer.Vector({
                    source: labelSource,
                    style: walkPrImage
                });
                walkPrCircle = new ol.layer.Vector({
                    source: circleSource,
                    style: generalPrPtCircle
                });
                // Draw the layers on the map
                map.addLayer(prWalkBike);
                map.addLayer(walkPrCircle);
                map.addLayer(walkPrLabel);
                // set Name
                prWalkBike.set('name', 'prWalkBike');
                walkPrCircle.set('name', 'walkPrCircle');
                walkPrLabel.set('name', 'walkPrLabel');
                // Set Z-Index
                prWalkBike.setZIndex(10);
                walkPrCircle.setZIndex(11);
                walkPrLabel.setZIndex(12);
            } else if (type === 'bike'){
                // Create layers
                prWalkBike = new ol.layer.Vector({
                    source: polylineSource,
                    style: prWalkBikeStyle
                });
                bikePrLabel = new ol.layer.Vector({
                    source: labelSource,
                    style: bikePrImage
                });
                bikePrCircle = new ol.layer.Vector({
                    source: circleSource,
                    style: generalPrPtCircle
                });
                // Draw the layers on the map
                map.addLayer(prWalkBike);
                map.addLayer(bikePrCircle);
                map.addLayer(bikePrLabel);
                // set Name
                prWalkBike.set('name', 'prWalkBike');
                bikePrCircle.set('name', 'bikePrCircle');
                bikePrLabel.set('name', 'bikePrLabel');
                // Set Z-Index
                prWalkBike.setZIndex(10);
                prWalkBike.setZIndex(11);
                prWalkBike.setZIndex(12);
            } else if (type === 'walkPt'){
                // Create layers
                ptPrWalk = new ol.layer.Vector({
                    source: polylineSource,
                    style: prWalkBikeStyle
                });
                ptPrWalkLabel = new ol.layer.Vector({
                    source: labelSource,
                    style: walkImagePrPt
                });
                ptPrWalkLabelCircle = new ol.layer.Vector({
                    source: circleSource,
                    style: walkImagePtPrCircle
                });
                // Draw the layers on the map
                map.addLayer(ptPrWalk);
                map.addLayer(ptPrWalkLabelCircle);
                map.addLayer(ptPrWalkLabel);
                // set Name
                ptPrWalk.set('name', 'ptPrWalk');
                ptPrWalkLabelCircle.set('name', 'ptPrWalkLabelCircle');
                ptPrWalkLabel.set('name', 'ptPrWalkLabel');
                // Set Z-Index
                ptPrWalk.setZIndex(10);
                ptPrWalkLabelCircle.setZIndex(11);
                ptPrWalkLabel.setZIndex(12);
            } else if (type === 'bus'){
                // Create layers
                ptPrBus = new ol.layer.Vector({
                    source: polylineSource,
                    style: prCarStyle
                });
                ptPrBusLabel = new ol.layer.Vector({
                    source: labelSource,
                    style: busImagePrPt
                });
                ptPrBusLabelCircle = new ol.layer.Vector({
                    source: circleSource,
                    style: generalPrPtCircle
                });
                // Draw the layers on the map
                map.addLayer(ptPrBus);
                map.addLayer(ptPrBusLabelCircle);
                map.addLayer(ptPrBusLabel);
                // set Name
                ptPrBus.set('name', 'ptPrBus');
                ptPrBusLabelCircle.set('name', 'ptPrBusLabelCircle');
                ptPrBusLabel.set('name', 'ptPrBusLabel');
                // Set Z-Index
                ptPrBus.setZIndex(10);
                ptPrBusLabelCircle.setZIndex(11);
                ptPrBusLabel.setZIndex(12);
            } else if (type === 'tram'){
                // Create layers
                ptPrTram = new ol.layer.Vector({
                    source: polylineSource,
                    style: prCarStyle
                });
                ptPrTramLabel = new ol.layer.Vector({
                    source: labelSource,
                    style: tramImagePrPt
                });
                ptPrTramLabelCircle = new ol.layer.Vector({
                    source: circleSource,
                    style: generalPrPtCircle
                });
                // Draw the layers on the map
                map.addLayer(ptPrTram);
                map.addLayer(ptPrTramLabelCircle);
                map.addLayer(ptPrTramLabel);
                // set Name
                ptPrTram.set('name', 'ptPrTram');
                ptPrTramLabelCircle.set('name', 'ptPrTramLabelCircle');
                ptPrTramLabel.set('name', 'ptPrTramLabel');
                // Set Z-Index
                ptPrTram.setZIndex(10);
                ptPrTramLabelCircle.setZIndex(11);
                ptPrTramLabel.setZIndex(12);
            }
        } else if (origin === 'parkingGarageFrom'){
            if (type === 'walk'){
                // Create layers
                parkingGarageWalkBike = new ol.layer.Vector({
                    source: polylineSource,
                    style: garageWalkBikeStyle
                });
                walkGarageLabel = new ol.layer.Vector({
                    source: labelSource,
                    style: walkGarageImage
                });
                walkGarageCircle = new ol.layer.Vector({
                    source: circleSource,
                    style: generalGaragePtCircle
                });
                // Draw the layers on the map
                map.addLayer(parkingGarageWalkBike);
                map.addLayer(walkGarageCircle);
                map.addLayer(walkGarageLabel);
                // set Name
                parkingGarageWalkBike.set('name', 'parkingGarageWalkBike');
                walkGarageCircle.set('name', 'walkGarageCircle');
                walkGarageLabel.set('name', 'walkGarageLabel');
                // Set Z-Index
                walkGarageCircle.setZIndex(11);
                walkGarageLabel.setZIndex(12);
            } else if (type === 'bike'){
                // Create layers
                parkingGarageWalkBike = new ol.layer.Vector({
                    source: polylineSource,
                    style: garageWalkBikeStyle
                });
                bikeGarageLabel = new ol.layer.Vector({
                    source: labelSource,
                    style: bikeGarageImage
                });
                bikeGarageCircle = new ol.layer.Vector({
                    source: circleSource,
                    style: generalGaragePtCircle
                });
                // Draw the layers on the map
                map.addLayer(parkingGarageWalkBike);
                map.addLayer(bikeGarageCircle);
                map.addLayer(bikeGarageLabel);
                // set Name
                parkingGarageWalkBike.set('name', 'parkingGarageWalkBike');
                bikeGarageCircle.set('name', 'bikeGarageCircle');
                bikeGarageLabel.set('name', 'bikeGarageLabel');
                // Set Z-Index
                bikeGarageCircle.setZIndex(11);
                bikeGarageLabel.setZIndex(12);
            } else if (type === 'walkPt'){
                // Create layers
                ptGarageWalk = new ol.layer.Vector({
                    source: polylineSource,
                    style: garageWalkBikeStyle
                });
                ptGarageWalkLabel = new ol.layer.Vector({
                    source: labelSource,
                    style: walkImageGaragePt
                });
                ptGarageWalkLabelCircle = new ol.layer.Vector({
                    source: circleSource,
                    style: walkImagePtGarageCircle
                });
                // Draw the layers on the map
                map.addLayer(ptGarageWalk);
                map.addLayer(ptGarageWalkLabelCircle);
                map.addLayer(ptGarageWalkLabel);
                // set Name
                ptGarageWalk.set('name', 'ptGarageWalk');
                ptGarageWalkLabelCircle.set('name', 'ptGarageWalkLabelCircle');
                ptGarageWalkLabel.set('name', 'ptGarageWalkLabel');
                // Set Z-Index
                ptGarageWalkLabelCircle.setZIndex(11);
                ptGarageWalkLabel.setZIndex(12);
            } else if (type === 'bus'){
                // Create layers
                ptGarageBus = new ol.layer.Vector({
                    source: polylineSource,
                    style: garageCarStyle
                });
                ptGarageBusLabel = new ol.layer.Vector({
                    source: labelSource,
                    style: busImageGaragePt
                });
                ptGarageBusLabelCircle = new ol.layer.Vector({
                    source: circleSource,
                    style: generalGaragePtCircle
                });
                // Draw the layers on the map
                map.addLayer(ptGarageBus);
                map.addLayer(ptGarageBusLabelCircle);
                map.addLayer(ptGarageBusLabel);
                // set Name
                ptGarageBus.set('name', 'ptGarageBus');
                ptGarageBusLabelCircle.set('name', 'ptGarageBusLabelCircle');
                ptGarageBusLabel.set('name', 'ptGarageBusLabel');
                // Set Z-Index
                ptGarageBusLabelCircle.setZIndex(11);
                ptGarageBusLabel.setZIndex(12);
            } else if (type === 'tram'){
                // Create layers
                ptGarageTram = new ol.layer.Vector({
                    source: polylineSource,
                    style: garageCarStyle
                });
                ptGarageTramLabel = new ol.layer.Vector({
                    source: labelSource,
                    style: tramImageGaragePt
                });
                ptGarageTramLabelCircle = new ol.layer.Vector({
                    source: circleSource,
                    style: generalGaragePtCircle
                });
                // Draw the layers on the map
                map.addLayer(ptGarageTram);
                map.addLayer(ptGarageTramLabelCircle);
                map.addLayer(ptGarageTramLabel);
                // set Name
                ptGarageTram.set('name', 'ptGarageTram');
                ptGarageTramLabelCircle.set('name', 'ptGarageTramLabelCircle');
                ptGarageTramLabel.set('name', 'ptGarageTramLabel');
                // Set Z-Index
                ptGarageTramLabelCircle.setZIndex(11);
                ptGarageTramLabel.setZIndex(12);
            }
        }
    }
    // Style of image labels
    var carGarageImage = new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/car_garage.svg",
            anchorOrigin: "bottom-right",
            scale: 0.26
            // opacity: 0.8
        })
    });
    var carPrImage = new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/car_pr.svg",
            anchorOrigin: "bottom-right",
            scale: 0.26
            // opacity: 0.8
        })
    });
    var walkGarageImage = new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/walk_garage.svg",
            anchorOrigin: "bottom-right",
            scale: 0.05
        })
    });
    var walkPrImage = new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/walk_pr.svg",
            anchorOrigin: "bottom-right",
            scale: 0.05
        })
    });
    var bikeGarageImage = new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/bike_garage.svg",
            anchorOrigin: "bottom-right",
            scale: 0.06
        })
    });
    var bikePrImage = new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/bike_pr.svg",
            anchorOrigin: "bottom-right",
            scale: 0.06
        })
    });
    // P+R Public Transport
    var walkImagePrPt = new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/walk_pr.svg",
            anchorOrigin: "bottom-right",
            scale: 0.035
        })
    });
    var walkImagePtPrCircle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 12,
            fill: new ol.style.Fill({
                color: [255, 255, 255, 0.8]
            }),
            stroke: new ol.style.Stroke({
                color: [0, 170, 255, 1],
                width: 1
            })
        })
    });
    var generalPrPtCircle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 17,
            fill: new ol.style.Fill({
                color: [255, 255, 255, 0.8]
            }),
            stroke: new ol.style.Stroke({
                color: [0, 170, 255, 1],
                width: 1
            })
        })
    });
    var busImagePrPt = new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/bus_ptPr.svg",
            scale: 0.08
        })
    });
    var tramImagePrPt = new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/tram_ptPr.svg",
            scale: 0.07
        })
    });
    // Parking Garage Public Transport
    var walkImageGaragePt = new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/walk_garage.svg",
            anchorOrigin: "bottom-right",
            scale: 0.035
        })
    });
    var walkImagePtGarageCircle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 12,
            fill: new ol.style.Fill({
                color: [255, 255, 255, 0.8]
            }),
            stroke: new ol.style.Stroke({
                color: [190, 0, 255, 1],
                width: 1
            })
        })
    });
    var generalGaragePtCircle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 17,
            fill: new ol.style.Fill({
                color: [255, 255, 255, 0.8]
            }),
            stroke: new ol.style.Stroke({
                color: [190, 0, 255, 1],
                width: 1
            })
        })
    });
    var busImageGaragePt = new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/bus_ptGarage.svg",
            scale: 0.08
        })
    });
    var tramImageGaragePt = new ol.style.Style({
        image: new ol.style.Icon({
            src: "resources/css/images/myspot_icons/tram_ptGarage.svg",
            scale: 0.07
        })
    });
    // Style of RoutingVectorLayers
    var garageCarStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: [190, 0, 255, 0.8],
            width: 4
        })
    });
    var garageWalkBikeStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: [190, 0, 255, 0.8],
            width: 4,
            lineDash: [6]
        })
    });
    var prCarStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: [0, 170, 255, 0.8],
            width: 4
        })
    });
    var prWalkBikeStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: [0, 170, 255, 0.8],
            width: 4,
            lineDash: [6]
        })
    });

    // Get P+R feature info for routing info
    function infoRoutingPr(callback) {
        var urlPR = prWms.getSource().getGetFeatureInfoUrl(
            routeInput.prLb72, viewResolution, viewProjection,
            {
                'INFO_FORMAT': 'text/javascript'
            });
        if (urlPR) {
            // console.log("Parking:" + urlPR);
            $.ajax({
                url: urlPR,
                dataType: 'jsonp',
                jsonpCallback: 'parseResponse'
            }).then(function (response) {
                var parser = new ol.format.GeoJSON();
                var results = parser.readFeatures(response);
                //console.log(response);
                // console.log(results);
                if (results.length) {
                    var info = [];
                    for (var i = 0, ii = results.length; i < ii; ++i) {
                        info.push('Name: ' + results[i].get('naam'));
                        info.push('Address: ' + results[i].get('address'));
                        info.push('Capacity: ' + results[i].get('capacity'));
                        info.push('Status: ' + results[i].get('status'));
                        info.push('<a href=' + results[i].get('url') + " target='_blank'>Visit PR Website </a>");
                        routeInput['prAddress'] = results[i].get('address');
                    }
                    routeInput['prParkingInfo'] = info.join('<br>');
                    //console.log(info);
                    callback();
                }
            });
        }
    }
    // Get ParkingGarage feature info for routing info
    function infoRoutingGarage(callback) {
        var urlGarage = garagesWms.getSource().getGetFeatureInfoUrl(
            routeInput.parkingGarageLb72, view.getResolution(), viewProjection,
            {
                'INFO_FORMAT': 'text/javascript'
            });
        if (urlGarage) {
            // console.log("Garage:" + urlGarage);
            $.ajax({
                url: urlGarage,
                dataType: 'jsonp',
                jsonpCallback: 'parseResponse'
            }).then(function (response) {
                var parser = new ol.format.GeoJSON();
                var results = parser.readFeatures(response);
                if (results.length) {
                    var info = [];
                    for (var i = 0, ii = results.length; i < ii; ++i) {
                        info.push('Name: ' + results[i].get('naam'));
                        info.push('Address: ' + results[i].get('address'));
                        info.push('Capacity: ' + results[i].get('capaciteit'));
                        info.push('Contact: ' + results[i].get('contact'));
                        info.push('<a href=' + results[i].get('url') + " target='_blank'>Visit Parking Garage Website </a>");
                        info.push('<br>' + routeInput.parkingRt);
                        routeInput['parkingGarageAddress'] = results[i].get('address');
                    }
                    if (info) {
                        routeInput['parkingGarageParkingInfo'] = info.join('<br>');
                        callback();
                    }
                }
            });
        }
    }

    // Get Real-time parking Garage info for routing info
    var parkingRt;
    function getParkingRTRoutingInfo(callback){
        // console.log(routeInput.parkingGarage);
        if (parkingRTList.indexOf(routeInput.parkingGarage) >= 0) {
            $.getJSON({
                    url: url_parkings_online,
                    data: {},
                    dataType: 'json'
                },
                function (jsonresults) {
                    //console.log(jsonresults);
                    parkingRt = jsonresults;
                    callback();
                });
        } else {
            callback()
        }
    }
    // Parse parking garage RealTime result to acquire wanted garage data
    function parseRTParking(callback){
        // console.log(results);
        if (parkingRt !== undefined){
            for(var i = 0; i < parkingRt.length; i++){
                if(parkingRt[i].description === routeInput.parkingGarage){
                    routeInput.parkingRt = 'Current available parking spots: ' + parkingRt[i].parkingStatus.availableCapacity;
                    callback();
                }
            }
        } else {
            routeInput.parkingRt = 'No real-time data available.';
            callback();
        }
    }
    var parkingRates = {
        rotation : {
            day : {
                0:0, 1:2, 2:4, 3:6, 4:7.5, 5:9, 6:11, 7:13.5, 8:16, 9:18.5, 10:21, 11:23.5, 12:26
            },
            night : {
                0:0, 1:1.5, 2:3, 3:4.5, 4:6, 5:6, 6:6, 7:6, 8:6, 9:6, 10:6, 11:6, 12:6
            }
        },
        mixed : {
            day : {
                0:0, 1:2, 2:6, 3:6, 4:7.5, 5:9, 6:10, 7:11, 8:12, 9:13, 10:14, 11:14, 12:14
            },
            night : {
                0:0, 1:1.5, 2:3, 3:4.5, 4:6, 5:6, 6:6, 7:6, 8:6, 9:6, 10:6, 11:6, 12:6
            }
        },
        zuid : {
            day : {
                0:0, 1:1.8, 2:3.6, 3:5.6, 4:7.2, 5:8.7, 6:10, 7:11.3, 8:12.3, 9:13.3, 10:13.8, 11:14.5, 12:14.5
            },
            night : {
                0:0, 1:1.8, 2:3.6, 3:4, 4:4, 5:4, 6:4, 7:4, 8:4, 9:4, 10:4, 11:4, 12:4
            }
        },
        kouter : {
            day : {
                0:0, 1:2, 2:3.8, 3:5.8, 4:6.8, 5:7.8, 6:8.8, 7:9.8, 8:10.8, 9:11.8, 10:12.8, 11:13.8, 12:14.9
            },
            night : {
                0:0, 1:2, 2:3.8, 3:4, 4:4, 5:4, 6:4, 7:4, 8:4, 9:4, 10:4, 11:4, 12:4
            }
        },
        center : {
            day : {
                0:0, 1:1.8, 2:3.6, 3:5.6, 4:6.6, 5:7.6, 6:8.6, 7:9.6, 8:10.6, 9:11.6, 10:12.6, 11:13.6, 12:14.6
            },
            night : {
                0:0, 1:1.8, 2:3, 3:3, 4:3, 5:3, 6:3, 7:3, 8:3, 9:3, 10:3, 11:3, 12:3
            }
        },
        dampoort : {
            day : {
                0:0, 1:1.63, 2:3.26, 3:4.89, 4:6.52, 5:8.15, 6:9.78, 7:11.41, 8:13.04, 9:14.67, 10:16.29, 11:16.29, 12:16.29
            },
            night : {
                0:0, 1:1.12, 2:2.24, 3:3, 4:3, 5:3, 6:3, 7:3, 8:3, 9:3, 10:3, 11:3, 12:3
            }
        },
        sintPieters : {
            day : {
                0:0, 1:2.04, 2:4.08, 3:6.12, 4:8.16, 5:10.2, 6:12.24, 7:14.28, 8:16.32, 9:17.61, 10:17.61, 11:17.61, 12:17.61
            },
            night : {
                0:0, 1:2.04, 2:4.08, 3:6.12, 4:8.16, 5:10.2, 6:12.24, 7:14.28, 8:16.32, 9:17.61, 10:17.61, 11:17.61, 12:17.61
            }
        }

    };
    // Week for costCalculations
    var weekday=new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";

    // Calculate parkingCost
    function parkingCost(callback){
        var parkingStart = routeInput.parkingGarageTo.summary.arrivalTime;
        var parkingStartSlice = parseInt(parkingStart.slice(11,13));
        var parkingDuration = parseInt(routeInput.duration);
        var parkingEnd = parkingStartSlice + parkingDuration;
        var costDay;
        var costNight;
        var parkingRate;
        // Get day of the week
        var date = new Date(parkingStart);
        var day = weekday[date.getDay()];

        // retrieve the correct rate for the parking
        if (routeInput.parkingGarage === 'Reep' || routeInput.parkingGarage === 'Sint-Michiels' || routeInput.parkingGarage === 'Vrijdagmarkt'){
            parkingRate = parkingRates.rotation;
        } else if (routeInput.parkingGarage === 'Savaanstraat' || routeInput.parkingGarage === 'Ramen' || routeInput.parkingGarage === 'Sint-Pietersplein' || routeInput.parkingGarage === 'Tolhuis'){
            parkingRate = parkingRates.mixed;
        } else if (routeInput.parkingGarage === 'Zuid'){
            parkingRate = parkingRates.zuid;
        } else if (routeInput.parkingGarage === 'Kouter'){
            parkingRate = parkingRates.kouter;
        } else if (routeInput.parkingGarage === 'Kouter'){
            parkingRate = parkingRates.kouter;
        } else if (routeInput.parkingGarage === 'Center Parking'){
            parkingRate = parkingRates.center;
        } else if (routeInput.parkingGarage === 'Dampoort'){
            parkingRate = parkingRates.dampoort;
        } else if (routeInput.parkingGarage === 'Gent Sint-Pieters'){
            parkingRate = parkingRates.sintPieters;
        }

        // Retrieve the correct rate for day and night
        var rateDay = parkingRate.day;
        var rateNight = parkingRate.night;
        // variables for amount of day and night
        var nightTime;
        var dayTime;

        //console.log( parkingStart + ' | ' + parkingStartSlice + ' | ' + parkingDuration + ' | ' + parkingEnd, ' | ' + day);
        //console.log(parkingRate);
        //console.log(rateNight);
        // console.log(rateDay);
        if (parkingStartSlice >= 7 && parkingStartSlice <= 19 && parkingStartSlice !== 0){
            if (day === 'Sunday'){
                // If day is sunday
                costNight = rateNight[parkingDuration];
                costDay = 0;
            } else if (parkingEnd > 19){
                // Start between 7-19, end after 19
                nightTime = parkingEnd - 19;
                dayTime = parkingDuration - nightTime;
                costNight = rateNight[nightTime];
                costDay = rateDay[dayTime];
            } else {
                // Start and end between 7-19
                costDay = rateDay[parkingDuration];
                costNight = 0;
            }
        } else {
            if (parkingEnd >= 31){
                // Start after 19, end after 7 (next day)
                if (day === 'Saturday'){
                    costNight = rateNight[parkingDuration];
                    costDay = 0;
                } else {
                    nightTime = parkingEnd -31;
                    dayTime = parkingDuration - nightTime;
                    costDay = rateDay[dayTime];
                    costNight = rateNight[nightTime];
                }
            } else if (parkingEnd > 19 && parkingEnd < 31){
                // Start after 19, end before 7
                costNight = rateNight[parkingDuration];
                costDay = 0;
            } else if (parkingEnd < 7){
                // Start after 19, end before 7
                costNight = rateNight[parkingDuration];
                costDay = 0;
            }
            else if (parkingEnd >= 7) {
                // Start after 19, end after 7 (next day)
                if (day === 'Saturday') {
                    costNight = rateNight[parkingDuration];
                    costDay = 0;
                } else {
                    dayTime = parkingEnd - 7;
                    nightTime = parkingDuration - dayTime;
                    costDay = rateDay[dayTime];
                    costNight = rateNight[nightTime];
                }
            }
        }

        var costTotal = costNight + costDay;
        routeInput.parkingCost = (Math.round(costTotal*Math.pow(10, 2))/Math.pow(10, 2));
        callback();
    }


    // Create objects from the html elements
    var prElements = {
        parkingInfo : document.getElementById('prParkingInfo'),
        startDateTime : document.getElementById('prStartDateTime'),
        parkingTime : document.getElementById('prParkingTime'),
        endTime : document.getElementById('prEndTime'),
        distanceCar : document.getElementById('prDistanceCar'),
        imageContainer : document.getElementById('prImageContainer'),
        durationCar : document.getElementById('prDurationCar'),
        distancePostTransport : document.getElementById('prDistancePostTransport'),
        durationPostTransport : document.getElementById('prDurationPostTransport'),
        distanceTotal : document.getElementById('prDistanceTotal'),
        durationTotal : document.getElementById('prDurationTotal'),
        cost : document.getElementById('prCost')
    };
    var garageElements = {
        parkingInfo : document.getElementById('garageParkingInfo'),
        startDateTime : document.getElementById('garageStartDateTime'),
        parkingTime : document.getElementById('garageParkingTime'),
        endTime : document.getElementById('garageEndTime'),
        distanceCar : document.getElementById('garageDistanceCar'),
        imageContainer : document.getElementById('garageImageContainer'),
        durationCar : document.getElementById('garageDurationCar'),
        distancePostTransport : document.getElementById('garageDistancePostTransport'),
        durationPostTransport : document.getElementById('garageDurationPostTransport'),
        distanceTotal : document.getElementById('garageDistanceTotal'),
        durationTotal : document.getElementById('garageDurationTotal'),
        cost : document.getElementById('garageCost'),
        pt : document.getElementById('garagePublicTransportInfo')
    };

    // Place info into routing info
    function placeRoutingInfo(origin, callback){
        var elements;
        var parkingTime;
        var endTime;
        var distanceCar;
        var distancePostTransport;
        var durationToParkingSeconds;
        var durationFromParkingSeconds;
        var parkingInfo;
        var cost;
        var startTime = routeInput.time;
        // Define variables
        if (origin === 'pr'){
            elements = prElements;
            parkingTime = routeInput['prTo'].summary.arrivalTime;
            endTime = routeInput['prFrom'].summary.arrivalTime;
            distanceCar = (Math.round(((routeInput['prTo'].summary.lengthInMeters)/1000)*Math.pow(10, 2))/Math.pow(10, 2));
            distancePostTransport = (Math.round(((routeInput['prFrom'].summary.lengthInMeters)/1000)*Math.pow(10, 2))/Math.pow(10, 2));
            durationToParkingSeconds = routeInput['prTo'].summary.travelTimeInSeconds;
            durationFromParkingSeconds = routeInput['prFrom'].summary.travelTimeInSeconds;
            parkingInfo = routeInput['prParkingInfo'];
            cost = 'Free of cost!'
        } else {
            elements = garageElements;
            parkingTime = routeInput['parkingGarageTo'].summary.arrivalTime;
            endTime = routeInput['parkingGarageFrom'].summary.arrivalTime;
            distanceCar = (Math.round(((routeInput['parkingGarageTo'].summary.lengthInMeters)/1000)*Math.pow(10, 2))/Math.pow(10, 2));
            distancePostTransport = (Math.round(((routeInput['parkingGarageFrom'].summary.lengthInMeters)/1000)*Math.pow(10, 2))/Math.pow(10, 2));
            durationToParkingSeconds = routeInput['parkingGarageTo'].summary.travelTimeInSeconds;
            durationFromParkingSeconds = routeInput['parkingGarageFrom'].summary.travelTimeInSeconds;
            parkingInfo = routeInput['parkingGarageParkingInfo'];
            cost = "\u20AC &nbsp;" + routeInput.parkingCost;
        }
        // Convert time from seconds to hours, minutes, seconds
        var timeTo = new Date(null);
        timeTo.setSeconds(durationToParkingSeconds);
        var timeFrom = new Date(null);
        timeFrom.setSeconds(durationFromParkingSeconds);
        var timeTotal = new Date(null);
        var durationTotal;
        // Endtime in seconds

        var endHour = endTime.slice(11, 13);
        var endMin = endTime.slice(14, 16);
        var endSec = endTime.slice(17, 19);
        var endTotalSec = parseInt(endHour * (60*60)) + parseInt(endMin *60) + parseInt(endSec);
        // StartTime in seconds
        var startHour = startTime.slice(0, 2);
        var startMin = startTime.slice(3, 5);
        var startTotalSec = (parseInt(startHour * (60*60)) + parseInt(startMin *60));
        var durationTotal;
        if (endTotalSec < startTotalSec){
            durationTotal = (parseInt(endTotalSec) + (24 * (60 * 60))) - parseInt(startTotalSec);
        } else {
            durationTotal = parseInt(endTotalSec) - parseInt(startTotalSec);
        }

        timeTotal.setSeconds(durationTotal);

        // Place content Parking Info
        elements.parkingInfo.innerHTML = parkingInfo;

        // Place Parking Cost
        elements.cost.innerHTML = cost;

        // Place content RoutingSpecifications
        elements['startDateTime'].innerHTML = 'Start:<br>' + routeInput['date'] + '<br>' + startTime + ' h';
        elements['parkingTime'].innerHTML = 'Parking:<br>' + parkingTime.slice(11,16) + ' h';
        elements['endTime'].innerHTML = 'Arrival:<br>' + endTime.slice(0, 10) + '<br>' +  endTime.slice(11,16) + ' h';
        elements['distanceCar'].innerHTML = distanceCar + ' km';
        elements['distancePostTransport'].innerHTML = distancePostTransport + ' km';
        elements['distanceTotal'].innerHTML = 'Total:<br>' + ((distancePostTransport + distanceCar).toFixed(2)) + ' km';
        elements['durationCar'].innerHTML = timeTo.toISOString().substr(11, 8);
        elements['durationPostTransport'].innerHTML = timeFrom.toISOString().substr(11, 8);
        elements['durationTotal'].innerHTML = 'Total:<br>' + timeTotal.toISOString().substr(11, 8);

        // Disable and enable the correct postTransport Images
        if (routeInput.postTransport === "pedestrian"){
            document.getElementById('bikeImage1').style.visibility = 'hidden';
            document.getElementById('busImage1').style.visibility = 'hidden';
            document.getElementById('walkImage1').style.visibility = 'visible';
            document.getElementById('bikeImage2').style.visibility = 'hidden';
            document.getElementById('busImage2').style.visibility = 'hidden';
            document.getElementById('walkImage2').style.visibility = 'visible';
        } else if (routeInput.postTransport === "bicycle"){
            document.getElementById('bikeImage1').style.visibility = 'visible';
            document.getElementById('busImage1').style.visibility = 'hidden';
            document.getElementById('walkImage1').style.visibility = 'hidden';
            document.getElementById('bikeImage2').style.visibility = 'visible';
            document.getElementById('busImage2').style.visibility = 'hidden';
            document.getElementById('walkImage2').style.visibility = 'hidden';
        } else if (routeInput.postTransport === "bus"){
            document.getElementById('bikeImage1').style.visibility = 'hidden';
            document.getElementById('busImage1').style.visibility = 'visible';
            document.getElementById('walkImage1').style.visibility = 'hidden';
            document.getElementById('bikeImage2').style.visibility = 'hidden';
            document.getElementById('busImage2').style.visibility = 'visible';
            document.getElementById('walkImage2').style.visibility = 'hidden';

        }
        // console.log(elements);
        // console.log(routeInput);
        callback();
    }
    // Place Public transport info
    function placePtRoutingInfo(origin, callback){
        var baseElement;
        var subroutesContainer;
        var routesLength;
        var lastRoute;
        var addressToLocal;
        var addressFromLocal;
        if (origin === 'pr'){
            baseElement = "#prPublicTransportInfo";
            subroutesContainer = routeInput.prFrom.subroutes;
            routesLength = Object.keys(subroutesContainer).length;
            lastRoute = (routesLength - 1);
            addressFromLocal = routeInput.prAddress;
            subroutesContainer['0'].startLocation = addressFromLocal.replace("\n", "<br>");
            addressToLocal = routeInput.toAddress;
            subroutesContainer[lastRoute].endLocation = addressToLocal.replace(",", "<br>");
        } else {
            baseElement = "#garagePublicTransportInfo";
            subroutesContainer = routeInput.parkingGarageFrom.subroutes;
            routesLength = Object.keys(subroutesContainer).length;
            lastRoute = (routesLength - 1);
            addressFromLocal = routeInput.parkingGarageAddress;
            subroutesContainer['0'].startLocation = addressFromLocal.replace("\n", "<br>");
            addressToLocal = routeInput.toAddress;
            subroutesContainer[lastRoute].endLocation = addressToLocal.replace(",", "<br>");
        }

        for (route in subroutesContainer){
            var startTime = subroutesContainer[route].departure;
            var startLocation = subroutesContainer[route].startLocation;
            var endTime = subroutesContainer[route].end;
            var endLocation = subroutesContainer[route].endLocation;
            var distance = subroutesContainer[route].distance;
            var lineNumber = subroutesContainer[route].lineNumber;
            var lineDescription = subroutesContainer[route].lineDescription;
            var type;
            var content;

            // Create content Dynamically to append to the unordered list
            if (subroutesContainer[route].type === 'walk'){
                if (distance === 0){
                    type = 'Wait';
                } else {
                    type = 'Walk';
                }
                // Create content Dynamically to append to the unordered list
                content =
                '<li data-role="list-divider" class="ptListDivider"><div class="ptListDividerText">' + type + '</div><div class="ptListDividerTextLeft">'+ distance + ' m' + '</div></li>'+
                '<li>'+
                    '<div class="ui-content">'+
                        '<div class="ui-grid-a">'+
                            '<div class="ui-block-a">'+
                                '<p class="wrapListItem">Start: ' + startTime + ' h<br>' + startLocation + '</p>'+
                            '</div>'+
                            '<div class="ui-block-b">'+
                                '<p class="wrapListItem">End: ' + endTime + ' h<br>' + endLocation + '</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</li>';
                // Append created content
                $(baseElement).append(content);
                // refresh the element (for jquery mobile styling)
                $(baseElement).listview('refresh');
            } else {
                if (subroutesContainer[route].type === 'bus'){
                    type = 'Bus';
                } else {
                    type = 'Tram';
                }
                // Create content Dynamically to append to the unordered list
                content =
                    '<li data-role="list-divider" class="ptListDivider"><div class="ptListDividerText">' + type + '</div><div class="ptListDividerTextLeft">'+ distance + ' m' + '</div></li>'+
                    '<li>'+
                        '<div class="ui-content">'+
                            '<div class="ui-grid-a">'+
                                '<div class="ui-block-a">'+
                                    '<p class="wrapListItem">Start: ' + startTime + ' h<br>' + startLocation + '</p>'+
                                '</div>'+
                                '<div class="ui-block-b">'+
                                    '<p class="wrapListItem">End: ' + endTime + ' h<br>' + endLocation + '</p>'+
                                '</div>'+
                            '</div>'+
                            '<hr class="horizontalLine">' +
                            '<p class="wrapListItem">Line Number: ' + lineNumber + '<br>Description: ' + lineDescription + '</p>' +
                        '</div>'+
                    '</li>';
                // Append created content
                $(baseElement).append(content);
                // refresh the element (for jquery mobile styling)
                $(baseElement).listview('refresh');
            }
        }
        callback();
    }
    function routingVisible(){
        document.getElementById('routingInfoCollapseHeader').className = "routingInfoCollapsible";
        document.getElementById('routingLayersCollapseHeader').className = "ui-collaspible-set";
        // expand routing-info
        $('#routingInfoCollapseHeader').collapsible("expand");

        // set visibility of public transport
        if (routeInput.postTransport === 'bus'){
            $('.publicTransportMainDiv').show();
        } else {
            $('.publicTransportMainDiv').hide();
        }
        console.log(routeInput);
    }
    // TESTING
    function collapseLists(){
        $('#prInfoCollapsible').trigger('collapse');
        $('#routingInfoCollapseHeader').collapsible("collapse");
        /*cannot call methods on collapsible prior to initialization
        $('#routingLayersCollapseHeader').collapsible("collapse");
        */
        // $('#prInfoCollapsible animateMe').collapsible("collapse");
        // data-collapsed="true"
    }

    // ROUTING LAYERS CHECKBOXES
    document.getElementById('routingPR').onclick = function(){
        if (this.checked) {
            map.getLayers().forEach(function(el) {
                if (vectorLayersPr.indexOf(el.get('name')) >= 0){
                    el.setVisible(true);
                }
            })
        } else {
            map.getLayers().forEach(function(el) {
                if (vectorLayersPr.indexOf(el.get('name')) >= 0){
                    el.setVisible(false);
                }
            })
        }
    };
    document.getElementById('routingGarage').onclick = function(){
        if (this.checked) {
            map.getLayers().forEach(function(el) {
                if (vectorLayersGarage.indexOf(el.get('name')) >= 0){
                    el.setVisible(true);
                }
            })
        } else {
            map.getLayers().forEach(function(el) {
                if (vectorLayersGarage.indexOf(el.get('name')) >= 0){
                    el.setVisible(false);
                }
            })
        }
    };
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Set visibility of the layers off if desired at start-up
inhabtitantsWms.setVisible(false);
circulationWms.setVisible(false);
parkingareasWms.setVisible(false);
taxiWms.setVisible(false);
cambioWms.setVisible(false);
bluebikeWms.setVisible(false);
orthoWms.setVisible(false);

// Layer Checkboxes on/off
// ROUTING LAYERS are in the map function
// PR LAYER
document.getElementById("p+r").onclick = function (){
    if (this.checked) {
        prWms.setVisible(true);
    } else {
        prWms.setVisible(false);
    }
};
// PARKINGGARAGE LAYER
document.getElementById("parkingGarage").onclick = function (){
    if (this.checked) {
        garagesWms.setVisible(true);
    } else {
        garagesWms.setVisible(false);
    }
};
// TRAINSTATIONS LAYER
document.getElementById("trainStations").onclick = function (){
    if (this.checked) {
        stationsWms.setVisible(true);
    } else {
        stationsWms.setVisible(false);
    }
};
// BLUEBIKE LAYER
document.getElementById("blueBike").onclick = function (){
    if (this.checked) {
        bluebikeWms.setVisible(true);
    } else {
        bluebikeWms.setVisible(false);
    }
};
// CAMBIO LAYER
document.getElementById("cambio").onclick = function (){
    if (this.checked) {
        cambioWms.setVisible(true);
    } else {
        cambioWms.setVisible(false);
    }
};
// TAXI LAYER
document.getElementById("taxi").onclick = function (){
    if (this.checked) {
        taxiWms.setVisible(true);
    } else {
        taxiWms.setVisible(false);
    }
};
// PARKINGAREAS LAYER
document.getElementById("parkingAreas").onclick = function (){
    if (this.checked) {
        parkingareasWms.setVisible(true);
        circulationWms.setVisible(false);
        inhabtitantsWms.setVisible(false);
    } else {
        parkingareasWms.setVisible(false);
    }
};
// CIRCULATION LAYER
document.getElementById("circulationPlan").onclick = function (){
    if (this.checked) {
        parkingareasWms.setVisible(false);
        circulationWms.setVisible(true);
        inhabtitantsWms.setVisible(false);
    } else {
        circulationWms.setVisible(false);
    }
};
// INHABITANTS LAYER
document.getElementById("inhabitants").onclick = function (){
    if (this.checked) {
        parkingareasWms.setVisible(false);
        circulationWms.setVisible(false);
        inhabtitantsWms.setVisible(true);
    } else {
        inhabtitantsWms.setVisible(false);
    }
};
// NONE LAYER
document.getElementById("none").onclick = function () {
    if (this.checked) {
        parkingareasWms.setVisible(false);
        circulationWms.setVisible(false);
        inhabtitantsWms.setVisible(false);
    }
};
// INFO LAYER
document.getElementById("info").onclick = function (){
    if (this.checked) {
        infoWms.setVisible(true);
    } else {
        infoWms.setVisible(false);
    }
};
// MYSPOT LAYER
document.getElementById("myspot").onclick = function (){
    if (this.checked) {
        grbWms.setVisible(true);
        infoWms.setVisible(true);
        $('#info').prop('checked', true).checkboxradio('refresh');
        orthoWms.setVisible(false);
    } else {
        grbWms.setVisible(false);
    }
};
// ORTHO LAYER
document.getElementById("ortho").onclick = function (){
    if (this.checked) {
        grbWms.setVisible(false);
        infoWms.setVisible(false);
        $('#info').prop('checked', false).checkboxradio('refresh');
        orthoWms.setVisible(true);
    } else {
        orthoWms.setVisible(false);
    }
};

proj4.defs([
// van https://epsg.io/3857
    [
        'EPSG:3857',
        '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'],
    [
        'EPSG:4326',
        '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
// van https://epsg.io/31370
    [
        'EPSG:31370',
        '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs'
    ]
]);

/*
TESTING
$( ".InfoCollapsible" ).on( "collapsibleexpand", function( event, ui ) {
    console.log(event);
    console.log(ui);
    $('.InfoPtCollapsible animateMe').trigger('collapse');
} );
*/



