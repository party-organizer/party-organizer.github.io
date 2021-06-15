var vueMap = new Vue({
    el: '#map',
    data: {
        locationTitle: 'Copenhagen',
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
            updateParty();
            changeLocation();
        }
    }
})

var map;

function initMap() {
    var myLatlng = new google.maps.LatLng(vueMap.coordinateX,vueMap.coordinateY);

    var mapOptions = {
        zoom: 4,
        center: myLatlng
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Place a draggable marker on the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable:true,
        title:"Drag me!"
    });
  }

  function setCoordinates(){
    var geocoder = new google.maps.Geocoder()
    var coordinates = geocoder.geocode({address : vueMap.locationTitle})
  }

  function changeLocation(){
    map.setCenter(new google.maps.LatLng(vueMap.coordinateX, vueMap.coordinateY));
  }
  