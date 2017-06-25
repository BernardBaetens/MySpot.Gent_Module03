<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MySpot</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://openlayers.org/en/v4.1.1/css/ol.css" type="text/css" />
  <link rel="stylesheet" href="resources/css/MySpot_Theme.min.css" />
  <link rel="stylesheet" href="resources/css/jquery.mobile.icons.min.css" />
  <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile.structure-1.4.5.min.css"  type="text/css"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Text+Me+One" type='text/css' />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway" type='text/css' />
  <link rel="stylesheet" href="resources/css/myspot.css" type="text/css" />
  <link rel="shortcut icon" href="resources/css/images/myspot_icons/Rafa_icon.png" />
  <link href="http://cdn.jtsage.com/jtsage-datebox/4.1.1/jtsage-datebox-4.1.1.jqm.min.css" rel="stylesheet" type="text/css" />
</head>
<body>
<!-- page -->
<div data-role="page" id="page1" data-theme="c">
  <!-- Header -->
  <div data-role="header" data-position="fixed" class="mainHeader" data-tap-toggle="false">
    <a href="#routingPanel" data-role="button" class="ui-btn-left btn-header" data-icon="navigation" data-iconpos="right" >ROUTING</a>
    <h1 id="mainHeaderText1">MySpot.Gent</h1>
    <a href="#layerPanel" class="ui-btn-right btn-header" data-icon="bullets">LAYERS</a>
  </div> <!-- end header -->

  <!-- main map -->
  <div id="mapContainer">
    <div id="map" class="map">
    </div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
    <div id="rafaMapContainer">
      <a href="https://github.com/BernardBaetens/MySpot.Gent_Module03" target="_blank"><img src="resources/css/images/myspot_icons/RafaReversed.png" id="rafaMap"></a>
    </div>
  </div>

  <!-- left panel ROUTING -->
  <div data-role="panel" data-position="left" id="routingPanel" data-display="overlay" data-theme="c" data-dismissible="false" data-swipe-close="false">
    <!-- panel header -->
    <div data-role="header" class="mainHeader">
      <h1 id="mainHeaderText2">ROUTING</h1>
      <a href="#page1" class="ui-btn ui-icon-carat-l ui-btn-icon-notext ui-btn-left" data-rel="close" id="btn-back1"></a>
    </div>
    <!-- Navigation Button -->
    <div id="btnNavigationDiv">  <!-- link action in javascript -->
      <button id="btnNavigation" class="ui-btn ui-btn-c ">
        <label id="btnNavigationText">Navigation</label>
        <i class="fa fa-compass fa-2x"></i>
      </button>
    </div>
    <!-- user input form -->
    <div class="ui-collaspible-set">
      <div data-role="collapsible" class="userInputCollapsible animateMe initExpand" data-theme="b" data-collapsed-icon="carat-d" data-expanded-icon="carat-u">
        <h1>USER INPUT</h1>
        <div class="ui-content">
          <form action="#" method="post" id="formInput">
            <div class="ui-field-contain" id="inputFromContainer"> <!-- From -->
              <div class="ui-filterable inputTextContainer">
                <label for="filter-input-from">From:</label>
                <input id="filter-input-from" data-type="search" placeholder="Search address here...">
                <ul class="autocomplete" data-role="listview" data-inset="true" data-filter="true" data-input="#filter-input-from" id="autocompleteFrom"></ul>
              </div>
              <div class="inputButtons">
                <div class="btnLocation">
                  <a href="#" class="ui-btn btnMapLocation" id="btnFromMapLocation">
                    <i class="fa fa-map-marker locationBtn"></i>
                  </a>
                </div>
                <div class="btnCurrent">
                  <a href="#" class="ui-btn btnMapLocation" id="btnFromCurrentLocation">
                    <i class="fa fa-crosshairs locationBtn"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="ui-field-contain" id="inputToContainer"> <!-- To -->
              <div class="ui-filterable inputTextContainer">
                <label for="filter-input-to">To:</label>
                <input id="filter-input-to" data-type="search" placeholder="Search address here...">
                <ul class="autocomplete" data-role="listview" data-inset="true" data-filter="true" data-input="#filter-input-to" id="autocompleteTo"></ul>
              </div>
              <div class="inputButtons">
                <div class="btnLocation">
                  <a href="#" class="ui-btn btnMapLocation" id="btnToMapLocation">
                    <i class="fa fa-map-marker locationBtn"></i>
                  </a>
                </div>
                <div class="btnCurrent">  <!-- link action in javascript -->
                  <a href="#" class="ui-btn btnMapLocation" id="btnToCurrentLocation">
                    <i class="fa fa-crosshairs locationBtn"></i>
                  </a>
                </div>
              </div>
            </div><!-- end to container -->
            <div class="ui-field-contain" id="dateContainer" > <!-- Date and time-->
              <div class="ui-grid-a">
                <div class="ui-block-a" >
                  <label for="date-input">Departure date:</label>
                  <input type="text" id="date-input" data-role="datebox" data-options='{"mode":"flipbox"}'>
                </div>
                <div class="ui-block-b">
                  <label for="time-input">Departure time:</label>
                  <input type="text" id="time-input" data-role="datebox" data-options='{"mode":"timeflipbox"}'>
                </div>
              </div>
            </div><!-- end date and time picker container -->
            <div class="ui-field-contain" id="durationContainer">
              <label for="duration">Duration:</label>
              <select name="duration" id="duration" data-mini="true">
                <option value="1">&nbsp;less than 1 hour</option>
                <option value="2">&nbsp;2 hours</option>
                <option value="3">&nbsp;3 hours</option>
                <option value="4">&nbsp;4 hours</option>
                <option value="5">&nbsp;5 hours</option>
                <option value="6">&nbsp;6 hours</option>
                <option value="8">&nbsp;8 hours</option>
                <option value="10">&nbsp;10 hours</option>
                <option value="12">&nbsp;12 hours</option>
              </select>
            </div> <!-- end duration container -->
            <div class="ui-field-contain" id="postTransportContainer">
              <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true" > <!-- post transport -->
                <label for="postTransport" id="postTransport"></label>
                <legend id="postTransportLegend">Post-parking transport:</legend>
                <input name="postTransport" id="postWalk" value="on" checked="checked" type="radio">
                <label for="postWalk" data-mini="true"><i class="fa fa-male fa-lg"></i></label>
                <input name="postTransport" id="postBike" value="off" type="radio" >
                <label for="postBike"><i class="fa fa-bicycle fa-lg"></i></label>
                <input name="postTransport" id="postBus" value="other" type="radio">
                <label for="postBus"><i class="fa fa-bus fa-lg"></i></label>
              </fieldset>
            </div>
            <hr class="horizontalLine">
            <div class="ui-field-contain" id="submitResetContainer">
              <div id="btnRouteContainer">
                <a href="#" class="ui-btn" id="btnRoute">Calculate Route</a>
              </div>
              <div id="btnResetContainer">
                <a href="#" class="ui-btn" id="btnReset">Reset</a>
              </div>
            </div> <!-- end submit reset buttons -->
          </form> <!-- end form -->
        </div> <!-- end form content -->
      </div> <!-- end collapsible form -->
    </div>

    <!-- routing info -->
    <div data-role="collapsible" class="routingInfoCollapsible ui-disabled" data-theme="b" data-collapsed="true" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" id="routingInfoCollapseHeader" >
      <h1>ROUTING INFO</h1>
      <!-- P+R Information -->
      <div class="ui-collaspible-set routingInfoMain">
        <div data-role="collapsible" class="InfoCollapsible animateMe" data-theme="b" data-collapsed="true" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" data-mini="true" >
          <h2 class="'nestedColaps">Park + Ride</h2>
          <ul data-role="listview" data-inset="false" class="routingInfoList1" id="prInfoCollapsible">
            <li data-role="list-divider">Parking Info</li>
            <li>
              <p class="wrapListItem" id="prParkingInfo"></p>
            </li>
          </ul>
          <ul data-role="listview" data-inset="false" class="routingInfoList1"> <!-- cost Parking -->
            <li data-role="list-divider">Parking Cost</li>
            <li >
              <p id="prCost"></p>
            </li>
          </ul>
          <ul data-role="listview" data-inset="false" class="routingInfoSeperator">
            <br><br>
          </ul>
          <ul data-role="listview" data-inset="false" class="routingInfoList1"> <!-- Routing Duration -->
            <li data-role="list-divider" class="routingSpecificationsList">Routing Specifications</li>
            <li>
              <div class="ui-content">
                <div class="ui-grid-d">
                  <div class="ui-block-a">
                    <p class="wrapListItem" id="prStartDateTime">
                    </p> <!-- Start Time -->
                  </div>
                  <div class="ui-block-b">
                  </div>
                  <div class="ui-block-c">
                    <p class="wrapListItem" id="prParkingTime">
                    </p> <!-- Parking Time -->
                  </div>
                  <div class="ui-block-d">
                  </div>
                  <div class="ui-block-e">
                    <p class="wrapListItem" id="prEndTime">
                    </p> <!-- Time of Destination -->
                  </div>
                </div>
              </div>
              <hr class="horizontalLine" id="prHorizontalLine">
              <div class="ui-content">
                <div class="ui-grid-d">
                  <div class="ui-block-a">
                    <p class="totalDistance">Distance:</p>
                    <p class="totalDuration">Duration:</p>
                  </div>
                  <div class="ui-block-b">
                    <p class="wrapListItem" id="prDistanceCar"> <!-- Distance Car -->
                    </p>
                    <p class="wrapListItem" id="prImageContainer">
                      <img src="resources/css/images/myspot_icons/car.svg" class="routingImage"> <!-- Car Image -->
                    </p>
                    <p class="wrapListItem" id="prDurationCar">
                    </p><!-- Car Transport Duration -->
                  </div>
                  <div class="ui-block-c">
                    <img src="resources/css/images/myspot_icons/pr.png" class="routingImage routingInfoParkingIcon" id="routingInfoParkingIconPr"> <!-- parking image -->
                  </div>
                  <div class="ui-block-d">
                    <p class="wrapListItem" id="prDistancePostTransport"> <!-- Distance Post Transport -->
                    </p>
                    <p class="wrapListItem">
                      <img src="resources/css/images/myspot_icons/walk.svg" class="routingImageWalk" id="walkImage1"> <!-- Image of post Transport -->
                      <img src="resources/css/images/myspot_icons/bike.svg" class="routingImageBike" id="bikeImage1">
                      <img src="resources/css/images/myspot_icons/bus.svg" class="routingImageBus" id="busImage1">
                    </p>
                    <p class="wrapListItem" id="prDurationPostTransport">
                    </p><!-- Post Transport Duration -->
                  </div>
                  <div class="ui-block-e">
                    <p class="wrapListItem totalDistance" id="prDistanceTotal">
                    </p><!-- Distance to Parking -->
                    <p class="wrapListItem totalDuration" id="prDurationTotal">
                    </p><!-- Duration to Parking -->
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!-- Public Transport Info -->
          <div class="ui-collaspible-set publicTransportMainDiv">
            <div data-role="collapsible" class="InfoPtCollapsible animateMe" data-theme="b" data-collapsed="true" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" data-mini="true">
              <h2 class="'nestedColaps">Public Transport Info</h2>
              <ul data-role="listview" data-inset="false" id="prPublicTransportInfo">
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Parking Garage Information -->
      <div class="ui-collaspible-set routingInfoMain">
        <div data-role="collapsible" class="InfoCollapsible animateMe" data-theme="b" data-collapsed="true" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" data-mini="true">
          <h2 class="'nestedColaps">Parking Garage</h2>
          <ul data-role="listview" data-inset="false" class="routingInfoList1"> <!-- Parking Info -->
            <li data-role="list-divider">Parking Info</li>
            <li>
              <p class="wrapListItem" id="garageParkingInfo">
              </p>
            </li>
          </ul>
          <ul data-role="listview" data-inset="false" class="routingInfoList1"> <!-- cost Parking -->
            <li data-role="list-divider">Parking Cost</li>
            <li>
              <p id="garageCost">
              </p>
            </li>
          </ul>
          <ul data-role="listview" data-inset="false" class="routingInfoSeperator">
            <br><br>
          </ul>
          <ul data-role="listview" data-inset="false" class="routingInfoList2"> <!-- Routing Duration -->
            <li data-role="list-divider" class="routingSpecificationsList">Routing Specifications</li>
            <li>
              <div class="ui-content">
                <div class="ui-grid-d">
                  <div class="ui-block-a">
                    <p class="wrapListItem" id="garageStartDateTime">
                    </p> <!-- Start Time -->
                  </div>
                  <div class="ui-block-b">
                  </div>
                  <div class="ui-block-c">
                    <p class="wrapListItem" id="garageParkingTime">
                    </p> <!-- Parking Time -->
                  </div>
                  <div class="ui-block-d">
                  </div>
                  <div class="ui-block-e">
                    <p class="wrapListItem" id="garageEndTime">
                    </p> <!-- Time of Destination -->
                  </div>
                </div>
              </div>
              <hr class="horizontalLine" id="garageHorizontalLine">
              <div class="ui-content">
                <div class="ui-grid-d">
                  <div class="ui-block-a">
                    <p class="totalDistance">Distance:</p>
                    <p class="totalDuration">Duration:</p>
                  </div>
                  <div class="ui-block-b">
                    <p class="wrapListItem" id="garageDistanceCar"> <!-- Distance Car -->
                    </p>
                    <p class="wrapListItem">
                      <img src="resources/css/images/myspot_icons/car.svg" class="routingImage"> <!-- Car Image -->
                    </p>
                    <p class="wrapListItem" id="garageDurationCar">
                    </p><!-- Car Transport Duration -->
                  </div>
                  <div class="ui-block-c" id="garageImageContainer">
                    <img src="resources/css/images/myspot_icons/park-garage_02.svg" class="routingImage routingInfoParkingIcon" id="routingInfoParkingIconGarage"> <!-- parking image -->
                  </div>
                  <div class="ui-block-d">
                    <p class="wrapListItem" id="garageDistancePostTransport"> <!-- Distance Post Transport -->
                    </p>
                    <p class="wrapListItem">
                      <img src="resources/css/images/myspot_icons/walk.svg" class="routingImageWalk" id="walkImage2"> <!-- Image of post Transport -->
                      <img src="resources/css/images/myspot_icons/bike.svg" class="routingImageBike" id="bikeImage2">
                      <img src="resources/css/images/myspot_icons/bus.svg" class="routingImageBus" id="busImage2">
                    </p>
                    <p class="wrapListItem" id="garageDurationPostTransport">
                    </p><!-- Post Transport Duration -->
                  </div>
                  <div class="ui-block-e">
                    <p class="wrapListItem totalDistance" id="garageDistanceTotal">
                    </p><!-- Distance to Parking -->
                    <p class="wrapListItem totalDuration" id="garageDurationTotal">
                    </p><!-- Duration to Parking -->
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!-- Public Transport Info -->
          <div class="ui-collaspible-set publicTransportMainDiv">
            <div data-role="collapsible" class="InfoPtCollapsible animateMe" data-theme="b" data-collapsed="true" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" data-mini="true">
              <h2 class="'nestedColaps">Public Transport Info</h2>
              <ul data-role="listview" data-inset="false" id="garagePublicTransportInfo">
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div> <!-- end routing info -->
    <!-- panel footer -->
    <div data-role="footer" data-position="fixed" class="mainFooter" data-tap-toggle="false">
    </div> <!-- end footer -->
  </div> <!-- end routing panel -->

  <!-- right panel layers -->
  <div data-role="panel" data-position="right" id="layerPanel" data-display="overlay" data-theme="c" data-dismissible="false" data-swipe-close="false">
    <!-- panel header -->
    <div data-role="header" class="mainHeader">
      <h1 id="mainHeaderText3">LAYERS</h1>
      <a href="#page1" class="ui-btn ui-icon-carat-r ui-btn-icon-notext ui-btn-right btn-header" data-rel="close" id="btn-back2"></a>
    </div>
    <!-- layers lists -->
    <div class="ui-collaspible-set" id="routingLayersCollapseHeader">
      <div data-role="collapsible" class="layerType animateMe ui-disabled" data-theme="b" data-collapsed="true" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" id="routingLayersCollapse">
        <h1>ROUTING LAYERS</h1>
        <div class="ui-field-contain">
          <label for="routingPR"><img src="resources/css/images/myspot_icons/prRoute.png" class="routingLabel">&emsp;&nbsp;P+R Route</label>
          <input type="checkbox" name="routingLayer" id="routingPR" value="routingPR" data-mini="true" checked="checked">
        </div>
        <div class="ui-field-contain">
          <label for="routingGarage"><img src="resources/css/images/myspot_icons/garageRoute.png" class="routingLabel">&emsp;&nbsp;Parking Garage Route</label>
          <input type="checkbox" name="routingLayer" id="routingGarage" value="routingGarage" data-mini="true" checked="checked">
        </div>
      </div>
    </div>
    <div class="ui-collaspible-set">
      <div data-role="collapsible" class="layerType animateMe initExpand" data-theme="b" data-collapsed-icon="carat-d" data-expanded-icon="carat-u">
        <h1>POI</h1>
        <div class="ui-field-contain">
          <label for="p+r"><img src="resources/css/images/myspot_icons/pr.png" class="lyrImage">&emsp;&nbsp;P+R<i class="fa fa-info-circle info"></i></label>
          <input type="checkbox" name="poi" id="p+r" value="p+r" data-mini="true" checked="checked">
        </div>
        <div class="ui-field-contain">
          <label for="parkingGarage"><img src="resources/css/images/myspot_icons/park-garage_02.svg" class="lyrImage">
            &emsp;Parking Garage<i class="fa fa-info-circle info"></i></label>
          <input type="checkbox" name="poi" id="parkingGarage" value="parkingGarage" data-mini="true" checked="checked">
        </div>
        <div class="ui-field-contain">
          <label for="trainStations"><img src="resources/css/images/myspot_icons/train.svg" class="lyrImage">
            &emsp;Train Stations</label>
          <input type="checkbox" name="poi" id="trainStations" value="trainStations" data-mini="true" checked="checked">
        </div>
        <div class="ui-field-contain">
          <label for="blueBike"><i class="fa fa-bicycle fa-lg lyrImage"></i>
            &emsp;Blue Bike</label>
          <input type="checkbox" name="poi" id="blueBike" value="blueBike" data-mini="true" >
        </div>
        <div class="ui-field-contain">
          <label for="cambio"><img src="resources/css/images/myspot_icons/transport_rental_car.svg" class="lyrImage">
            &emsp;Cambio</label>
          <input type="checkbox" name="poi" id="cambio" value="cambio" data-mini="true" >
        </div>
        <div class="ui-field-contain">
          <label for="taxi"><img src="resources/css/images/myspot_icons/transport_taxi_rank.svg" class="lyrImage">
            &emsp;Taxi</label>
          <input type="checkbox" name="poi" id="taxi" value="taxi" data-mini="true" >
        </div>
      </div>
    </div>
    <div class="ui-collaspible-set">
      <div data-role="collapsible" class="layerType animateMe" data-theme="b" data-collapsed-icon="carat-d" data-expanded-icon="carat-u">
        <h1>PUBLIC TRANSPORT</h1>
        <div class="ui-field-contain">
          <label for="ptStops"><img src="resources/css/images/myspot_icons/bus-stop.svg" class="lyrImage">
            &emsp;Stops</label>
          <input type="checkbox" name="pt" id="ptStops" value="ptStops" data-mini="true">
        </div>
        <div class="ui-field-contain">
          <label for="ptLinesAll"><img src="resources/css/images/myspot_icons/ptAll.png" class="routingLabel">
            &emsp;All Lines</label>
          <input type="checkbox" name="pt" id="ptLinesAll" value="ptLinesAll" data-mini="true">
        </div>
        <div class="ui-field-contain" id="ptLinesSingle">
          <select name="ptSingle" id="ptSingle" data-mini="true">
            <option value="empty" class="ptSingleList">No single line</option>'
          </select>
        </div>
      </div>
    </div>
    <div class="ui-collaspible-set">
      <div data-role="collapsible" class="layerType animateMe initExpand" data-theme="b" data-collapsed-icon="carat-d" data-expanded-icon="carat-u">
        <h1>ZONES</h1>
        <fieldset data-role="controlgroup">
          <input type="radio" name="zone" id="parkingAreas" value="parkingAreas" data-mini="true">
          <label for="parkingAreas">Parking Area's<i class="fa fa-info-circle info"></i></label>
          <input type="radio" name="zone" id="circulationPlan" value="circulationPlan" data-mini="true">
          <label for="circulationPlan">Circulation Plan<i class="fa fa-info-circle info"></i></label>
          <input type="radio" name="zone" id="inhabitants" value="inhabitants" data-mini="true">
          <label for="inhabitants">Inhabitants</label>
          <input type="radio" name="zone" id="none" value="none" data-mini="true" checked="checked">
          <label for="none">None</label>
        </fieldset>
      </div>
    </div>
    <div class="ui-collaspible-set">
      <div data-role="collapsible" class="layerType animateMe" data-theme="b" data-collapsed-icon="carat-d" data-expanded-icon="carat-u">
        <h1>BASE MAP</h1>
        <div class="ui-field-contain infolayer">
          <label for="info">Information<i class="fa fa-info-circle info"></i></label>
          <input type="checkbox" name="other" id="info" value="info" data-mini="true" checked="checked">
        </div>
        <fieldset data-role="controlgroup">
          <input type="radio" name="basemap" id="ortho" value="basemap" data-mini="true">
          <label for="ortho">Aerial</label>
          <input type="radio" name="basemap" id="myspot" value="myspot" data-mini="true" checked="checked">
          <label for="myspot">MySpot</label>
        </fieldset>
      </div>
    </div>
    <!-- panel footer -->
    <div data-role="footer" data-position="fixed" class="mainFooter" data-tap-toggle="false">
    </div> <!-- end footer -->
  </div> <!-- end layer panel -->

  <!-- footer -->
  <div data-role="footer" data-position="fixed" class="mainFooter" data-tap-toggle="false">
    <h1 id="mainFooterText">Geo-ICT Module 3</h1>
  </div> <!-- end footer -->
</div> <!-- end page 1 -->
<!-- Loading page at startup -->
<div id="loading"></div>

<!-- Scripts -->
<script src="https://openlayers.org/en/v4.1.1/build/ol.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.4.3/proj4-src.js" type="text/javascript"></script>
<script
        src="https://code.jquery.com/jquery-2.2.4.min.js"
        integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
        crossorigin="anonymous"></script>
<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
<script src="resources/js/jquery.loader.js"></script>
<script src="https://use.fontawesome.com/d0a5636f45.js"></script>
<script src="http://cdn.jtsage.com/jtsage-datebox/4.1.1/jtsage-datebox-4.1.1.jqm.min.js" type="text/javascript"></script>
<script src="resources/js/myspot.js"></script>
</body>
</html>
