import React, { Component } from "react";

import "../css/HomeComponent.css";

class HomeComponent extends Component {

  constructor(props){
    super(props)

    this.state = {"testApiMessage": null}
  }

  componentDidMount(){
    fetch("http://localhost:3001/api").then(
      (data)=>{
        return data.json()
      }
    ).then(
      (data)=>{
        this.setState({"testApiMessage": data.message})
      }
    )
  }

  render() {
    return (
      <div>
        <div className="changing-gradient-background home-background" />
        <div className="home-container">
          <div className="heading">Welcome to Donation Station</div>
          <div className="text-medium">Where would you like to donate?</div>
          <div className="text-medium">{this.state.testApiMessage}</div>
          <input className="search-bar" placeholder="Enter your zip code here"></input>
        </div>

      </div>
    )
  }

}
export default HomeComponent;
