const path = require('path');

const ajax = {
    request: function ajaxRequest(method, path, callback) {
      let xmlhttp = new XMLHttpRequest();      
          // params  = typeof data === 'string' ? data 
          //           : Object.keys(data).map( k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) ).join('&');  
  
      xmlhttp.open(method, path, true);
  
      xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {           
            return callback(xmlhttp.responseText);
          }
      };
  
      xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
      xmlhttp.send();
      xmlhttp;
    }
};

function ClickHandler() {

    this.audio = (req, res) => {
      console.log(req.params, path.resolve(__dirname))
      
    }

    this.weatherstack = (req, res) => {
        if(req.header('origin') === 'https://localhost:3000') {
          let data = {"request":{"type":"City","query":"New York, United States of America","language":"en","unit":"m"},"location":{"name":"New York","country":"United States of America","region":"New York","lat":"40.714","lon":"-74.006","timezone_id":"America\/New_York","localtime":"2020-01-07 14:08","localtime_epoch":1578406080,"utc_offset":"-5.0"},"current":{"observation_time":"07:08 PM","temperature":6,"weather_code":113,"weather_icons":["https:\/\/assets.weatherstack.com\/images\/wsymbols01_png_64\/wsymbol_0001_sunny.png"],"weather_descriptions":["Sunny"],"wind_speed":7,"wind_degree":350,"wind_dir":"N","pressure":1016,"precip":0,"humidity":41,"cloudcover":0,"feelslike":5,"uv_index":3,"visibility":16,"is_day":"yes"}}
    
          return res.json(JSON.stringify(data));
        }
        
        let url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK}&units=f&query=${req.body.query}`;
    
        //console.log(req.get('Access-Control-Allow-Origin'))
        ajax.request('GET', url, (data) => {  
           res.json(data);
        });
      }    

};

module.exports = ClickHandler;