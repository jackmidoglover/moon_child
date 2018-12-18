import React from 'react';
import './phaser.css';
import api from '../../utils/api';
import moment from 'moment';


export class Phaser extends React.Component {
    state = {
        latitude: '',
        longitude: '',
        date: moment(),
        timezone: '',
        moonPhase: '',
        moonRise: '',
        moonSet: ''
    }

    render(){
        return(
            <div>
                <div className="moonContainer">
                    <div className="waneCrescent">
                    </div>
                </div>
            </div>
        )
    };
};

export default Phaser;