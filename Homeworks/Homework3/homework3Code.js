
var OSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })

//defines the coordinates for each park
//var longitudePark0 = stateParks.features[0].geometry.coordinates[0]
//var latitudePark0 = stateParks.features[0].geometry.coordinates[1]

//park icon that is displayed on map
var parkIcon = L.icon({ 
    iconUrl: './ncLogo.png',   
    iconSize: [25,25],
    popupAnchor: [0,0] 
    });

//this adds each icon to the map and creates the bind popup
    //the bind popup references the geoJSON '+features.properties.Name'
var myCircles = L.geoJSON(stateParks, {
    pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {icon: parkIcon}).bindPopup('This is '+feature.properties.Name +'.');}
}).addTo(map);


//this variable is called for in the layer control 
var baseLayers = {
    "Open Street Map": OSM,
    "ESRI": Esri_WorldImagery
    };

//this variable is called for in layer control 'the text in single quotes' is what shows up on the map
var overlayMaps = {
    'NC State Parks': myCircles,
};

//this variable adds layers to the map!
var layerControl = L.control.layers(baseLayers,overlayMaps).addTo(map)
