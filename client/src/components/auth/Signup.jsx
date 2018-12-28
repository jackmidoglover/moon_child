import React from 'react';
import './auth.css';

export class Signup extends React.Component {
    state = {

    };

    render(){
        return(
            <div className="col s12 m4 offset-m4">
                <div className="card horizontal">
                    <div className="card-image">
                        <img src="../../assets/moon.jpeg" alt="Moon setting over water"/>
                    </div>
                    <div className="card-stacked">
                    <div className="card-content">
                        <h2 className="center">Sign Up!</h2>
                        This is some content
                    </div>
                    <div class="card-action">
                        <a href="#">This is a link</a>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;