import React from 'react';
import Phaser from "./../components/phaseIndicator/Phaser";
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';

export class Home extends React.Component{
  state = {
    signUpClicked: false, 
    logInClicked: false
  };

  signUpHandler = () => {
    this.setState({
      signUpClicked: !this.state.signUpClicked
    });
  }

  logInHandler = () => {
    console.log(this.state);
    this.setState({
      logInClicked: !this.state.logInClicked
    });
  }
  render(){
   return(
    <div className="row">
      {!!this.state.signUpClicked ? <Signup /> : null}
      {!!this.state.logInClicked ? <Login /> : null}
    <Phaser />
    <div className="row">
      <div className="col m6 offset-m3 center">
        <button className="btn waves-effect waves-light amber btnM" onClick={this.logInHandler}> Sign In  <i className="fas fa-sign-in-alt"></i>
        </button>
        <button className="btn waves-effect waves-light amber btnM" onClick={this.signUpHandler}>Sign Up  <i className="fas fa-user-plus"></i>
        </button>
      </div>
    </div>
  </div>
   )
  }
};

export default Home;