import React from 'react';
import './phaser.css';
import api from '../../utils/api';
import moment from 'moment';


export class Phaser extends React.Component {
    state = {
        latitude: 39.8097,
        longitude: 98.5556,
        date: moment().format("YYYYMMDD"),
        timezone: -6,
        moonPhase: '',
        moonRise: '',
        moonSet: '',
        moonIllumination: '',
        phaserClass: ''
    }

    componentWillMount(){
        console.log(this.state.date);
        api.querySolunar(this.state.latitude, this.state.longitude, this.state.date, this.state.timezone).then(moonData => {
            const moonRise = moonData.data.moonRise;
            const moonSet = moonData.data.moonSet;
            const moonIllumination = moonData.data.moonIllumination;
            const moonPhase = moonData.data.moonPhase;
            this.setState({
                moonPhase: moonPhase,
                moonRise: moonRise, 
                moonSet: moonSet,
                moonIllumination: moonIllumination
            });
            console.log(this.state);
        })
    }

    render(){
        return(
            <div>
                <div className="moonContainer">
                    <div className="gibbousWax"></div>
                </div>
            </div>
        )
    };
};

export default Phaser;