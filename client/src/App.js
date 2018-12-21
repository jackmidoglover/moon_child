import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import '../node_modules/materialize-css/dist/css/materialize.css';
import '../node_modules/materialize-css/sass/components/_icons-material-design.scss';
import Phaser from './components/phaseIndicator/Phaser';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Phaser />
        <div className="row">
          <div className="col m6 offset-m3 center">
            <button class="btn waves-effect waves-light amber btnM"> Sign In  <i class="fas fa-sign-in-alt"></i>
            </button>
            <button class="btn waves-effect waves-light amber btnM">Sign Up  <i class="fas fa-user-plus"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
