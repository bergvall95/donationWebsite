import '../css/App.css';

import React, { Component } from 'react';

import { Route, BrowserRouter } from "react-router-dom";

import HomeComponent from './HomeComponent.js';
import MapComponent from './MapComponent.js';
import AboutComponent from './AboutComponent.js';
import Navbar from './Navbar.js';

function App() {

  return (
    <div>
      <BrowserRouter basename="/">

        <Navbar />

        <div className="page-content">
          <Route exact path="/" component={HomeComponent} />
          <Route path="/map" component={MapComponent} />
          <Route path="/about" component={AboutComponent} />
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
