import React, { Component } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import '../css/MapPageComponent.css';

/*
given data describing organizations that take donations,
create an array of Marker components for each organization
*/
function getMapMarkers(data) {
  var markers = []

  for (let i = 0; i < data.length; i++) {
    markers.push(
      <Marker key={i} position={data[i].latlng}>
      </Marker>
    );
  }

  return markers;
}

/*
given data describing organizations that take donations,
create a set of Card components for each organization
*/
function getMapCards(data) {
  var cards = []

  for (let i = 0; i < data.length; i++) {
    cards.push(
      <CardComponent key={i} data={data[i]} />
    )
  }

  return cards;
}

/*
card component for containing a single organization's data
*/
class CardComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>

        <div className="search-card">
          <div className="search-card-body">
            <div className="search-card-title">{this.props.data.name}</div>
            <div className="search-card-type">{this.props.data.type}</div>
            <div className="search-card-desc"> {this.props.data.description}</div>
          </div>
        </div>
      </div>



    )
  }
}

/*
component representing the Map Page
*/
class MapPageComponent extends Component {

  constructor(props) {
    super(props)

    //position defaults to austin texas is this.props.position has not been specified
    //TODO : change this to get browser location
    this.state = {
      position: this.props.position ? this.props.position : [30.26, -97.74],
      isLoaded: false,
      items: []
    }
  }

  /*
  load locations near the passed in position prop,
  if no prop exists, default to austin or the user's current location
  */
  componentDidMount() {
    this.setState({
      isLoaded: true,
      items: [
        { name: "Test1", type: "test", latlng: [30.26, -97.74], address: "Austin, TX", description: "this is a test" },
        { name: "Test2", type: "test", latlng: [30.27, -97.8], address: "Austin, TX", description: "this is a test" },
        { name: "Test3", type: "test", latlng: [30.25, -97.9], address: "Austin, TX", description: "this is a test" },
        { name: "Test4", type: "test", latlng: [30.24, -97.85], address: "Austin, TX", description: "this is a test" },
        { name: "Test5", type: "test", latlng: [30.25, -97.81], address: "Austin, TX", description: "this is a test" }
      ]
    })
  }

  render() {

    //if the data has loaded, return the map and list of organizations
    if (this.state.isLoaded) {

      var markers = getMapMarkers(this.state.items);
      var cards = getMapCards(this.state.items);

      return (
        <div className="map-page">
          <div className="org-div">
            <div className="search-inputs">
              <div className="searchbar-container">
                <input id="map-page-searchbar" placeholder="Location..."></input>
              </div>
              <div className="search-dropdown-container">
                <label for="cars">Choose a car:</label>

                <select name="cars" id="cars">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="search-button-container">
                <button className="search-button"> > </button>
              </div>
            </div>
            <div className="org-list-container">
              {cards}
            </div>
          </div>

          <div className="map-div">
            <MapContainer id="map-container" center={this.state.position} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markers}
            </MapContainer>
          </div>
        </div>
      )

      //if the data has not loaded, return a loading icon
    } else {
      return (
        <div className="loading-icon-container">
          <div className="loading-icon"></div>
        </div>
      )
    }
  }
}

export default MapPageComponent;
