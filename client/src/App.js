import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import '../node_modules/materialize-css/dist/css/materialize.min.css';

class App extends Component {
  render() {
    return (
      <div>
          <Header />
      </div>
    );
  }
}

export default App;
