import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      stationList: []
    }
  }

  componentDidMount() {
    this.fetchAPIdata();
    this.loadMap(); // call loadMap function to load the google map
  }

  fetchAPIdata() {
    fetch('https://api.jcdecaux.com/vls/v1/stations?apiKey=3285a16c411343447c02ece4a54228f4d7c9a4ff&contract=Seville')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({ // add data from the API in the empty stationList array initialized empty in the state
        isLoaded: true,
        stationList: data
      })
      console.log('hello', this.state.stationList)
    })
    .catch(error => console.log('Request failed', error));
  }


  loadMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign({}, {
        center: {lat: 37.392529, lng: -5.994072}, // sets center of google map to Seville.
        zoom: 14, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

    }
  }

  render() {
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      width: '90vw', // 90vw basically means take up 90% of the width screen. px also works.
      height: '90vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
    }

    const {google} = this.props; // sets props equal to google

    this.state.stationList.map( stations => { // iterate through locations saved in state
      const marker = new google.maps.Marker({ // creates a new Google maps Marker object
        position: {lat: stations.position.lat, lng: stations.position.lng}, // sets position of marker to specified location
        map: this.map, // sets markers to appear on the map we just created on line 35
        title: stations.name // the title of the marker is set to the name of the location
      });

      var name = stations.name;
      var availableStands = stations.available_bike_stands;
      var availableBikes = stations.available_bikes;
      var totalStands = stations.bike_stands;

      var contentString = '<div id="content">'+
        '<h1 id="firstHeading" class="firstHeading">'+name+'</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Bike stands available</b> : '+availableStands+'</p>'+
        '<p><b>Bikes available</b> : '+availableBikes+'</p>'+
        '<p><b>Bike stands in total</b> : '+totalStands+'</p>'+
        '</div>'+
        '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });
    })

    return ( // in our return function you must return a div with ref='map' and style.
      <div ref="map" style={style}>
        loading map...
      </div>
    )
  }
}
