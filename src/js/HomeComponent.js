import React, {Component} from "react";

import "../css/HomeComponent.css";

class HomeComponent extends Component{

  render(){
    return (
      <div>
        <div className="changing-gradient-background home-background"/>

        <div className="heading">Heading</div>
        <div className="subheading">Subheading</div>
        <div className="text-large">Large Text</div>
        <div className="text-medium">Medium Text</div>
        <div className="text-small">Small Text</div>
      </div>
    )
  }

}
export default HomeComponent;
