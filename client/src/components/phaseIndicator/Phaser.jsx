import React from 'react';
import './phaser.css';
import api from '../../utils/api';
import moment from 'moment';


export class Phaser extends React.Component {
    state = {
        latitude: 39.8097,
        longitude: -98.5556,
        date: moment().format("YYYYMMDD"),
        timezone: -6,
        moonPhase: '',
        moonRise: '',
        moonSet: '',
        moonIllumination: '',
        phaserClass: ''
    }

    phaserClassSet = (phase, illumination) => {
        // Condition to check gibbous
        if (.97 >= illumination >= .67){
            if (phase === "Waxing Gibbous"){
            return "gibbousWax";
            }
            else if (phase === "Waning Gibbous"){
                return "gibbousWane";
            }
        }
        // Condition to check for full
        else if (illumination >= .98){
            return "fullMoon";
        }
        // Condition to check for half moon wane or wax
        else if ( .66 >= illumination >= .44){
            if (phase === "Waxing Crescent" || phase === "Waxing Crescent"){
                return "waxHalfMoon";
            }
            else if (phase === "Waning Gibbous" || phase === "Waning Crescent"){
                return "waneHalfMoon";
            }
        }
        // condition to check for crescent (larger)
        else if (.43 >= illumination >= .15){
            if (phase === "Waning Crescent"){
            return "waneCrescent";
            }
            else if (phase === "Waxing Crescent"){
                return "waxCrescent";
            }
        }
        // condition to check for crescent (smaller)
        else if (.11 >= illumination >= .0016){
            if (phase === "Waning Crescent"){
                return "sliverWane";
            }
            else if (phase === "Waxing Crescent"){
                return "sliverWax";
            }
        }
        // condition to check for new moon
        else if (.0015 >= illumination){
            return "newMoon";
        }
    }

    componentWillMount(){
        console.log(this.state.date);
        api.querySolunar(this.state.latitude, this.state.longitude, this.state.date, this.state.timezone).then(moonData => {
            console.log(moonData);
            const moonRise = moonData.data.moonRise;
            const moonSet = moonData.data.moonSet;
            const moonIllumination = moonData.data.moonIllumination;
            const moonPhase = moonData.data.moonPhase;
            this.setState({
                moonPhase: moonPhase,
                moonRise: moonRise, 
                moonSet: moonSet,
                moonIllumination: moonIllumination,
                phaserClass: this.phaserClassSet(moonPhase, moonIllumination)
            });
            console.log(this.state);
        })
    }

    render(){
        return(
            <div>
                <div className="moonContainer">
                    <div className={this.state.phaserClass}></div>
                </div>
            </div>
        )
    };
};

export default Phaser;