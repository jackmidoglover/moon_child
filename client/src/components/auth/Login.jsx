import React from 'react';
import './auth.css';

export class Login extends React.Component {
    state = {

    };

    render(){
        return(
            <div className="col s12 m4 offset-m4">
                <div className="card horizontal">
                    <div className="card-image">
                        <img src="/assets/images/dawnmoon.jpg" alt="Moon setting over water" className="moon" />
                    </div>
                    <div className="card-stacked">
                    <div className="card-content">
                        <h2 className="center">Log in</h2>
                        This is some content
                    </div>
                    <div className="card-action">
                        <a href="#">This is a link</a>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;