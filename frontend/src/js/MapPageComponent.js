import React, { Component } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import '../css/MapPageComponent.css';

import db from './firebase.config.js';
import { collection, getDocs } from "firebase/firestore";

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
tests whether datapoints have required fields
*/
function verify_document(doc){

	let verified = true;

	verified = verified && doc.latlng && Array.isArray(doc.latlng) && doc.latlng.length === 2;
	verified = verified && doc.name && typeof(doc.name) === "string";
	verified = verified && doc.type && typeof(doc.type) === "string";
	verified = verified && doc.description && typeof(doc.description) === "string";

	return verified;
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

// Class to represent each donation center
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

		let my_items = []

		db.collection("locations").get().then((querySnapshot) => {
			querySnapshot.forEach(function(doc){
				let data = doc.data();
				if(verify_document(data))
					my_items.push(doc.data())
			})

			this.setState({
				items: my_items,
				isLoaded: true
			})
		});
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
								<label>Choose a car:</label>

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
