import '../css/Navbar.css';

import React, {Component} from 'react';

import {NavLink} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHome, faHandsHelping, faBook } from '@fortawesome/free-solid-svg-icons'

class Navbar extends Component{
  constructor(props){
    super(props);

    this.state = {
      display_dropdown: false
    };

    this.toggle_dropdown.bind(this);
  }

  toggle_dropdown(){
    this.setState({display_dropdown : !this.state.display_dropdown})
  }

  render(){
    return (
      <div className="navbar light-grey">
        <FontAwesomeIcon icon={faBars} className="burger" onClick={()=>{this.toggle_dropdown()}}/>

        <div className="navbar-link" href="/">
          <NavLink to="/" activeClassName="text-color-1" exact>
            <FontAwesomeIcon icon={faHome} className="navbar-icon" /> Donation Station
          </NavLink>
        </div>
        <div className="navbar-link" href="/map">
          <NavLink to="/map" activeClassName="text-color-1" exact>
            <FontAwesomeIcon icon={faHandsHelping} className="navbar-icon" /> Donate
          </NavLink>
        </div>
        <div className="navbar-link" href="/about">
          <NavLink to="/about" activeClassName="text-color-1" exact>
            <FontAwesomeIcon icon={faBook} className="navbar-icon" /> About
          </NavLink>
        </div>

        <div className="navbar-dropdown" style={{display: this.state.display_dropdown ? 'block' : 'none'}}>
          <div className="navbar-dropdown-link">
            <NavLink to="/" activeClassName="text-color-1" exact onClick={()=>{this.toggle_dropdown()}}>
              <FontAwesomeIcon icon={faHome} className="navbar-icon" /> Home
            </NavLink>
          </div>
          <div className="navbar-dropdown-link">
            <NavLink to="/map" activeClassName="text-color-1" exact onClick={()=>{this.toggle_dropdown()}}>
              <FontAwesomeIcon icon={faHandsHelping} className="navbar-icon" /> Donate
            </NavLink>
          </div>
          <div className="navbar-dropdown-link">
            <NavLink to="/about" activeClassName="text-color-1" exact onClick={()=>{this.toggle_dropdown()}}>
              <FontAwesomeIcon icon={faBook} className="navbar-icon" /> About
            </NavLink>
          </div>
        </div>

      </div>
    )
  }
}

export default Navbar;
