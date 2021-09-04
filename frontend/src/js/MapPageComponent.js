import React, { Component } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import '../css/MapPageComponent.css';

// firebase and firestore configuration

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/firestore";
/*
given data describing organizations that take donations,
create an array of Marker components for each organization
*/
const firebaseConfig = {
	apiKey: "AIzaSyDIOcp1QzYL4brFaErWQzON9PQhi-1iyu0",
	authDomain: "donation-station-8204b.firebaseapp.com",
	projectId: "donation-station-8204b",
	storageBucket: "donation-station-8204b.appspot.com",
	messagingSenderId: "438288415599",
	appId: "1:438288415599:web:d8c568e9ad358516bbc69a",
	measurementId: "G-Q7K1NMDGFW"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


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

// Class to represent each donation center
/*
component representing the Map Page
*/
class MapPageComponent extends Component {

	constructor(props) {
		super(props)
		this.donationCenters = [];
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

		db.collection("locations").get().then((items) => {
			items.forEach((doc) => {
				this.donationCenters.push(doc.data());
			})
		})
		console.log(this.donationCenters);
		var items = this.donationCenters;
		setTimeout(() => { console.log(this.state.items); }, 2000);
		this.setState({
			isLoaded: true,
			items: items
		})
		
		getMapCards(this.state.items);
		getMapMarkers(this.state.items);
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
