import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Header from './components/header/Header';
import '../node_modules/materialize-css/dist/css/materialize.css';
import Navbarre from './components/navbar/Navbar';
import Wrapper from './components/Wrapper/Wrapper';
import About from './pages/About';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Calendar from './pages/Calendar';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
      <Router>
        <div>
          <Navbarre />
          <Header />
            <Wrapper>
              <Route exact path="/" component={Home} />
              <Route exact path="/Home" component={Home} />
              <Route exact path="/About" component={About} />
              <Route exact path="/Journal" component={Journal} />
              <Route exact path="/Calendar" component={Calendar} />
            </Wrapper>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
