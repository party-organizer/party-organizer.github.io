var vueMap = new Vue({
    el: '#map',
    data: {
        locationTitle: 'Kaunas',
        coordinateX: -25.363882,
        coordinateY: 131.044922
    }
})

var setLocation = new Vue({
    el: '#set-location',
    data: {
      message: ''
    },
    methods:{
        setLocation: function(event){
            vueMap.locationTitle = this.message;
            changeLocation();
        }
    }
})

var map;
var marker;

function initMap() {
    var myLatlng = new google.maps.LatLng(vueMap.coordinateX,vueMap.coordinateY);

    var mapOptions = {
        zoom: 18,
        center: myLatlng
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Place a draggable marker on the map
    marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable:true,
        title:"Drag me!"
    });
    
    marker.addListener("dragend", () => {
      console.log("Marker moved")
      setCoordinates(marker.getPosition().lat(), marker.getPosition().lng())
    });
  
  }

  async function setCoordinates(coordinateX, coordinateY){
    vueMap.coordinateX = coordinateX;
    vueMap.coordinateY = coordinateY;
    await loadLocation()
    updateParty();
  }

  async function changeLocation(){
    var geocoder = new google.maps.Geocoder()
    var coordinates = await geocoder.geocode({address : vueMap.locationTitle})
    vueMap.coordinateX = coordinates.results[0].geometry.location.lat()
    vueMap.coordinateY = coordinates.results[0].geometry.location.lng()
    await loadLocation()
    updateParty();
  }
  
  async function loadLocation(){
    var newPosition = await new google.maps.LatLng(vueMap.coordinateX, vueMap.coordinateY)
    marker.setPosition(newPosition)
    map.setCenter(newPosition)
    marker.position = newPosition
  }