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

    const buttons = [
      ["Rotate Left", "rotate", 20, google.maps.ControlPosition.LEFT_CENTER],
      ["Rotate Right", "rotate", -20, google.maps.ControlPosition.RIGHT_CENTER],
      ["Tilt Down", "tilt", 20, google.maps.ControlPosition.TOP_CENTER],
      ["Tilt Up", "tilt", -20, google.maps.ControlPosition.BOTTOM_CENTER],
    ];
    buttons.forEach(([text, mode, amount, position]) => {
      const controlDiv = document.createElement("div");
      const controlUI = document.createElement("button");
      controlUI.classList.add("ui-button");
      controlUI.innerText = `${text}`;
      controlUI.addEventListener("click", () => {
        adjustMap(mode, amount);
      });
      controlDiv.appendChild(controlUI);
      map.controls[position].push(controlDiv);
    });
  
    const adjustMap = function (mode, amount) {
      switch (mode) {
        case "tilt":
          map.setTilt(map.getTilt() + amount);
          break;
        case "rotate":
          map.setHeading(map.getHeading() + amount);
          break;
        default:
          break;
      }
    };
  }

  function setCoordinates(){
    var geocoder = new google.maps.Geocoder()
    var coordinates = geocoder.geocode({address : vueMap.locationTitle})
  }

  function changeLocation(){
    map.setCenter(new google.maps.LatLng(vueMap.coordinateX, vueMap.coordinateY));
  }
  