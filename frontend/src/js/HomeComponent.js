import React, { Component } from "react";

import "../css/HomeComponent.css";

import Geocoder from './Geocoder.js';

class HomeComponent extends Component {

  constructor(props){
    super(props)

    this.state = {
      search_input: ""
    }

    this.geocoder = new Geocoder();

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount(){
    this.geocoder = new Geocoder();
  }

  handleSearchChange(e){
    this.setState({
      input: e.target.value
    })
  }

  handleButtonClick(){
    //convert address to latitude longitude and route to the map page
    this.geocoder.geocode(this.state.input).then(
      (response)=>{
        this.props.history.push({
          pathname: '/map',
          state: response
        })
      },
      (err)=>{
        console.log(err)
      }
    );
  }

  render() {
    return (
      <div>
        <div className="changing-gradient-background home-background" />
        <div className="home-container">
          <div className="heading">Welcome to Donation Station</div>
          <div className="text-medium">Where would you like to donate?</div>
          <input
            className="search-bar"
            onChange={this.handleSearchChange}
            placeholder="Enter your zip code here">
          </input>
          <button
            onClick={this.handleButtonClick}>
            Search
          </button>
          <div className="text-medium">Location Searching Provided by Nominatim</div>
        </div>

      </div>
    )
  }

}
export default HomeComponent;
