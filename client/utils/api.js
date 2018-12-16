const axios = require('axios');

const solunarURL = "https://api.solunar.org/solunar/";

class API{
    constuctor(latitude, longitude, date, z){
        this.latitude = latitude;
        this.longitude = longitude;
        this.date = date;
        this.z = z;
    }
    querySolunar(latitude, longitude, date, z){
        if(!latitude || !longitude || !date || !z ){
            throw new Error("Must have query paramters: latitude, longitude, date, timezone");
        } else if (isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude)) || isNaN(parseFloat(date)) || isNaN(parseFloat(z))){
            throw new Error("Query parameters must be a number or a number string");
        }
       return axios.get(solunarURL + `${latitude}, ${longitude}, ${date}, ${z}`);
    };
};

module.exports = API;