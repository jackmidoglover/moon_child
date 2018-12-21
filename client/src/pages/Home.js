import React from 'react';
import Phaser from "./../components/phaseIndicator/Phaser";

const Home = () => (
    <div>
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
)

export default Home;