import React, { Component } from "react";

import "../css/HomeComponent.css";

class HomeComponent extends Component {

  render() {
    return (
      <div>
        <div className="changing-gradient-background home-background" />
        <div className="home-container">
          <div className="heading">Welcome to Donation Station</div>
          <div className="text-medium">Where would you like to donate?</div>
          <input className="search-bar" placeholder="Enter your zip code here"></input>
        </div>

      </div>
    )
  }

}
export default HomeComponent;
