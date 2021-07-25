import React, {Component} from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import '../css/MapPageComponent.css';

/*
given data describing organizations that take donations,
create an array of Marker components for each organization
*/
function getMapMarkers(data){
  var markers = []

  for(let i = 0; i < data.length; i++){

    let marker = <Marker key={i} position={data[i].latlng}>
    </Marker>

    markers.push(marker);
  }

  return markers;
}

class MapPageComponent extends Component{

  constructor(props){
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
  componentDidMount(){
    this.setState({
      isLoaded: true,
      items: [
        {name: "Test1", type:"test", latlng:[30.26, -97.74], address:"Austin, TX", description:"this is a test"},
        {name: "Test2", type:"test", latlng:[30.27, -97.8], address:"Austin, TX", description:"this is a test"},
        {name: "Test3", type:"test", latlng:[30.25, -97.9], address:"Austin, TX", description:"this is a test"},
        {name: "Test4", type:"test", latlng:[30.24, -97.85], address:"Austin, TX", description:"this is a test"},
        {name: "Test5", type:"test", latlng:[30.25, -97.81], address:"Austin, TX", description:"this is a test"}
      ]
    })
  }

  render(){

    //if the data has loaded, return the map and list of organizations
    if(this.state.isLoaded){

      var markers = getMapMarkers(this.state.items);

      return (
        <div className="map-page">
          <div className="org-div">
            <div className="search-inputs">
              <input className="map-page-searchbar" placeholder="Location..."></input>
            </div>
            <div className="org-list-container">
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
