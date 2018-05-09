import React, { Component } from 'react';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react'
// import child component
import MapContainer from './MapContainer'


class App extends Component {
  render() {
    return (
      <div>
        <h1> Shared Bikes in Seville </h1>
 {/* MOST IMPORTANT: Here we are passing the Google Maps props down to the MapContainer component as 'google'. */}
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBNgSV_7c3ZTwf0BQBiuzXcFeXY2VYTnco',
})(App)
