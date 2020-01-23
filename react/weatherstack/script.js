import ReactDOM from "react-dom";
import React, { Component } from "react";

import '../../public/css/weatherstack.css'

      
        // Main React Component
      class App extends React.Component {
        constructor(props) {
          super(props);
          this.changeHandler = this.changeHandler.bind(this);
          this.submitHandler = this.submitHandler.bind(this);
          this.getStandard   = this.getStandard.bind(this);
          this.getMetric     = this.getMetric.bind(this);
          this.keydown       = this.keydown.bind(this); 
          this.state = {
            url: '/query/weatherstack',
            placeholder: 'enter a city, zip, or postal code',
            value   : '',
            current : {},
            location: {},
            standard: 1
          };
        }
  
        componentDidMount() {
            // Logs geolocation error
          const logError = (error) => {
            if(error.message.indexOf("Only secure origins are allowed") === 0) {
              return alert("Only secure origins are allowed");
            }
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
            }        
          }        
            // Geolocation API
          navigator.geolocation ? (
            navigator.geolocation.getCurrentPosition( (geo) => {   
              let coords = geo.coords;
  
              this.searchWeather(coords.latitude + ',' + coords.longitude);
  
            }, logError )
          ):(
            alert("Geolocation is not supported by this browser.")
          );
          
          document.getElementById('search-input').focus();

          this.standard = document.getElementById('standard');
          this.metric   = document.getElementById('metric'); 
          
          this.standard.addEventListener('click', this.getStandard);
          this.metric.addEventListener('click', this.getMetric);
          document.addEventListener('keydown', this.keydown);
        }
  
        componentWillUnMount() {
          this.standard.removeEventListener('click', this.getStandard);
          this.metric.removeEventListener('click', this.getMetric);    
          document.removeEventListener('keydown', this.keydown);     
        }
  
          // listener for input value
        changeHandler(event) {
          event.preventDefault();
          if(this.state.placeholder.indexOf('!') !== -1 ) {
            this.setState({placeholder : 'enter a city, zip, or postal code'})
          } 
  
          this.setState({
              value: event.target.value
          });
        } 
  
          // search button or keyboard enter 
        submitHandler() {
            // checks if input has value
          var value = !this.state.value.length ? (
            sessionStorage.getItem('local') 
          ):( 
            this.state.value
          );
  
            // checks value
          value ? this.searchWeather(value) : alert('No geolocation data stored.');
        }
  
          // calls weather api
        searchWeather(location) {
          this.AjaxTimer = setTimeout( () => {
            alert('Unfortunately, the API call timed out. Please try again.')
          }, 10000);
  
          ajax.ready(ajax.request(this.state.url, {query: location}, (json) => {
            let data = JSON.parse(json);
            clearTimeout(this.AjaxTimer);
            // verify data 
            if(data.hasOwnProperty('success') && !data.success) {
              this.setState({
                value: '',
                placeholder: 'Oops! Try another location.'
              });
              alert(data.error['info']);
            }
  
            // convert default pressure to standard measurment
            data.current.pressure = convert.pressure('mb', data.current.pressure);
  
            this.setState((state) => {
              return {
                current  : state.current = data.current,
                location : state.location = data.location,
              }
            });

            this.setStyle(true);
            let locale = data.location;
            this.clock = new Date(data.location.localtime).toLocaleString().replace(/:\d\d([ ap]|$)/, "$1");
            this.condition = data.current.weather_descriptions[0];
            this.imgSrc    = data.current.weather_icons[0];
            this.humidity  = data.current.humidity;
            this.wind_dir  = data.current.wind_dir;
            this.location  = locale.name ? locale.name + ', ' + locale.region 
                                         : 'failed to retrieve location...';
  
            getWallpaper(data.current.weather_code);
            this.setState({value: ''});
          }));    
        }
  
          // style standard/metric buttons when engaged
        setStyle(standard) {
          if(standard) { // Standard on 
            this.standard.classList.add('standard-on')       
            this.standard.style.borderTop = '1px solid grey';
            this.standard.style.borderLeft = '0px solid dimgrey';
            this.standard.style.borderRight = '1px solid dimgrey';
                         // Metric off  
            this.metric.classList.remove('metric-on')
            this.metric.style.borderTop = '2px solid white';
            this.metric.style.borderLeft = '2px solid white';
            this.metric.style.borderRight = '2px solid grey';  
          } else {       // Standard off 
            this.standard.classList.remove('standard-on')
            this.standard.style.borderTop = '2px solid white';
            this.standard.style.borderLeft = '2px solid grey';
            this.standard.style.borderRight = '2px solid white';
                         // Metric on
            this.metric.classList.add('metric-on')
            this.metric.style.borderTop = '1px solid grey';
            this.metric.style.borderLeft = '1px solid dimgrey';
            this.metric.style.borderRight = '0px solid dimgrey';
          }  
        }
  
          // shows Standard/Imperial units (default)
        getStandard() {
          // prevents consecutive conversions
          if(!this.state.standard) {    
            let curr = this.state.current;
            this.setState({       
                standard : 1,
                current : {
                  temperature : convert.temp('c', curr.temperature),
                  feelslike   : convert.temp('c', curr.feelslike),
                  wind_speed  : convert.wind('kph', curr.wind_speed),
                  pressure    : convert.pressure('mb', curr.pressure)
                }
            });
            this.setStyle(true);  
          }
        }
  
          // shows Metric units
        getMetric() {
          // prevent consecutive conversions
          if(this.state.standard) { 
            let curr = this.state.current
            this.setState({
                standard : 0,
                current : {
                  temperature : convert.temp('f', curr.temperature),
                  feelslike   : convert.temp('f', curr.feelslike),
                  wind_speed  : convert.wind('mph', curr.wind_speed),
                  pressure    : convert.pressure('in', curr.pressure)          
                }        
            });
            this.setStyle(false);
          }
        }
  
          // listener for 'Enter' key
        keydown(event) {
          if(event.keyCode === 13) {
            this.submitHandler();
          }
        }   
  
        render() {
          let temp, wind, feels, baro;
          let current = this.state.current;
  
          this.state.standard ? (
            temp  = current.temperature + "&deg;F",
            feels = current.feelslike + "&deg;F",
            wind  = current.wind_speed + ' mph',
            baro  = current.pressure + ' in.'   
          ):(
            temp  = current.temperature + "&deg;C",
            feels = current.feelslike + "&deg;C",
            wind  = current.wind_speed + ' km/h',
            baro  = current.pressure + ' mb.'
          );
  
          return(
            <ErrorBoundary>
              <div className='content'>
                <div id='header' className='row'>
                  <div className='col'>
                    <header>
                      <h1 className="location" 
                        dangerouslySetInnerHTML={{__html: this.location}} />
                      <p
                        dangerouslySetInnerHTML={{__html: this.location? 
                          'Current Weather' : 'Checking for local weather...'}}/>
                    </header>
                  </div>
                </div><br />
                <MainSection
                   temperature={temp}
                   humidity={this.humidity + '%'}
                   conditions={this.condition}
                   imgSrc={this.imgSrc}
                   ambient={feels}
                   winds={this.wind_dir + ' @ ' + wind}
                   barometric={baro}
                   clock={this.clock}
                   standard={this.getStandard}
                   metric={this.getMetric}             
                  />
                <div id='footer' className='row'>
                  <div className='col'>
                    <div id='search'>
                      <input id="search-input" 
                             type="text" 
                             name="newLocation" 
                             value={this.state.value}
                             placeholder={this.state.placeholder}
                             size="25"
                             onChange={this.changeHandler}
                             /><br />
                      <input id='search-bttn' 
                             className="button" 
                             type="button" 
                             value="Search" 
                             onClick={this.submitHandler}
                              />
                      <a id='attribution' 
                         href="https://www.weatherstack.com"
                         rel="noreferrer"
                         dangerouslySetInnerHTML={{__html: "Weather data by weatherstack.com"}}/>
                    </div>
                  </div>
                </div> 
              </div>
            </ErrorBoundary>
          )
        }
  
      };
  
        // Display for weather info
      const MainSection = (props) => {
        var obj = {};
  
          // validate props object / create new object if no data available
        if(!props.conditions) {      
            Object.keys(props).forEach( key => {
              if(key === 'conditions') {
                obj[key] = '...loading'
              } else
              if(key === 'imgSrc') {
                obj[key] = "https://zi8s1g.bn.files.1drv.com/y4mb56rijLM4v-R8vNReudfVFTAvuJgw_nGA5i9xuqs9XB2w4lvSSeW1NBkD6vR6C-xr95cP-aiwAxhS98AcUP4UnIPU6xdqgEe-bRlnlL1QXNCwrBYlMPhKKd8gAFA5WtxT3E59AcbzZqTpXRBCJK9xW6eNaiQc_lsu7GS0bHqs8mTJNBytv7K9dfO_Mn6BwOk8vGKqU6Cj_9m377ZdyceOg?width=64&height=64&cropmode=none";
              } else {
                obj[key] = '--';
              }
            });
          props = obj;
          }
  
          return(
            <ErrorBoundary>
              <div id='main-section'>
                <div id='main' className='row'>
                  <div id='top-left' className='col'>
                    <p className="data temperature">Temperature:<br />
                      <span dangerouslySetInnerHTML={{__html: props.temperature}}/>
                    </p>
                    <p className="data humidity">Humidity:<br />{props.humidity}</p>
                  </div>
                  <div id='top-center' className='col'>
                    <p className="conditions" 
                       dangerouslySetInnerHTML={{__html: props.conditions}} />
                    <img className="iconImage" src={props.imgSrc} />
                    <p className="ambient">Feels Like:<br/>
                      <span dangerouslySetInnerHTML={{__html: props.ambient}} />
                    </p>
                  </div>
                  <div id='top-right'className='col'>
                    <p className="data winds">Winds:<br />{props.winds}</p>
                    <p className="data barometric">Pressure:<br /> 
                       <span dangerouslySetInnerHTML={{__html: props.barometric}} />
                    </p>
                  </div>
                </div>
                <div id='sub-main' className='row'>
                  <div id='bottom-left' className='col'>
                    <button id="standard" className='button' onClick={() => props.standard}>Standard</button>
                  </div>
                  <div id='bottom-center' className='col'>
                    <p className="clock" dangerouslySetInnerHTML={{__html: props.clock}} />
                  </div>
                  <div id='bottom-right' className='col'>
                    <button id="metric" className='button' onClick={() => props.metric}>Metric</button>
                  </div>
                </div>
              </div><br />        
            </ErrorBoundary>
          );
      }  
  
        // Error class React Component
      class ErrorBoundary extends React.Component {
          constructor(props) {
            super(props);
            this.state = { hasError: false };
          }
          static getDerivedStateFromError(error) {
            // Update state so the next render will show the fallback UI.
            return { hasError: true };
          }
          componentDidCatch(error, info) {
            // Display fallback UI
            this.setState({ hasError: true });
            // log the error to console 
            console.log(error, info);   
          }
          render() {
            if (this.state.hasError) {
              // You can render any custom fallback UI
              return <h3>Um...Something went wrong.</h3>;
            }
            return this.props.children;
          };
      }; 
  
        // Configure ajax call
      const ajax = {
        ready: function ready(fn) {
         
          if (typeof fn !== 'function') return;
          if (document.readyState === 'complete') return fn();
  
          document.addEventListener('DOMContentLoaded', fn, false);
        },
        request: function ajaxRequest(url, data, callback) {
          let path = '../api' + url;
          let xmlhttp = new XMLHttpRequest(),      
              params  = typeof data === 'string' ? data 
                        : Object.keys(data).map( k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) ).join('&');  
               console.log('path', path)         
          xmlhttp.open('POST', path, true);
  
          xmlhttp.onreadystatechange = function () {
  
              if(xmlhttp.readyState === 4 && xmlhttp.status === 200 || 
                 xmlhttp.readyState === 4 && xmlhttp.status === 500
                ) {
                clearTimeout(this.AjaxTimer);
                if(xmlhttp.status === 500) return alert('CORS authorization failed.');
                
                let res = JSON.parse(xmlhttp.response);
                if(res.statusCode === 400) return alert(res.response.body);
  
                return callback(res);
              }
          };
  
          xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
 
          xmlhttp.send(params);
          xmlhttp;
        }
      };
  
        // Convert standard/metric
      const convert =  {
  
            temp: function(sym, temp){
              let results = sym === 'f' ? (temp-32)*5/9 
                                        : (temp*9/5) + 32;
              return Math.round(results);
            },
            wind: function(sym, speed) {
              let results = sym === 'mph' ? speed*1.60934
                                          : speed*.6214;
              return Math.round(results);
            },
           pressure: function(sym, press) {
             let results = sym === 'mb' ? ((29.92*press)/1013.25).toFixed(2)
                                        : Math.round(press*33.8637526);
             return results
           }
  
      } 
  
        // Background wallpaper
      const getWallpaper = (code) => {
        const background = {
            113 : "a9zbgg.by.files.1drv.com/y4mR2nqc8dlGmkfQigpMUkxZ_-4fSTsI_06OvIvmEvG72rUkbb4W0xZbVRbdrnEkAXiXMK9HxKY1Ai5zw7POoJZoo5JboIf-Aexfmyb9RI_5dY0xsrgIkRfILGda9FMMOlfqNAg_ZqFTxDViTTk3OCMqVdP0yXYnPEINPxfi81S4BZx0aze2LvppKOon8ra_Ie0c2_0eIR40_qQyBfeFjVj8A",
            116 : "0ge17a.by.files.1drv.com/y4mRiIgk3IgJ55I3EeFOXDhNtYgRElctwH2ya78-JGEoXGQ7UCFTK1SKA_gXQgZbhm0HH2aqkcI3285F1ojlST10pvlq5Uml4VEuG-zXa8nGRAccuGL0aRb5P4MkpkLGdk9T701403qIBhO4t6DStXw0kwxuYFiMQM7c_LCRPTZwF33dJSA3FQKQarZTgSTxYQq8tyz4g6Gyi7chqFbbyZnvg",
            119 : "a9bj1q.by.files.1drv.com/y4mlhsgH9H2zDuVNeY3_N10GNVtbLKS9I0G_J_KKDwYpnB3362ZRB6TXyHKwDyBCjaGhX38c5ebJidn7T_V0QmxxIiCUjCFuF8SDcF0fbqQtB46ZyyBHPllAX_9CL0R5qiJkwnvrN8M26mHGDJw-SAfnVUYnICtzkxqbvohRciwiAs0bI0nCuyDyEQ2AO9ZI8ndz0hma_Hn-eephmHq2wqEgQ",
            122 : "0gghvg.by.files.1drv.com/y4m-Yi4o4S8uSbyKkIMEiQPXPAmUHRf3K9Ul3ieh9h8Qtc2rON0q2-lM1mLRXWfgGNJJUoyd_SsUD_GgvZbjL_Ovhn-aT1yoN7CTrLD5IC7oJPxfu43vGJx8ol_6KJcmrMniujVzk4GDvQ3qDG_OUvrjHM3pIDlLoPk5ioclldrb2oHoJ5sCeM3NlIVbSySm-TdsuFqdE76EjvF5WmBxX93FA", 
            143 : "a9zwva.by.files.1drv.com/y4mSAuecSi6XvgY4pzOPMsGBXzHfQEH_QYYx2zBIsINzcgu9sZyW-5HrMIsa92wSoLxhZtFeBy8bIy8ElxpyaaDerJsNeVX2sT3_HVWjQvKDJ0dKJExCKaEW-6qP-UEvcVtHQCZYr7MknXb0jmQGh1hVg3l13dXyB4t8DauceYWkd32z7NiL0Vk2MsF5MuaUS1H_mwWK3RgFehrWtVNdDjakg",
            248 : "0ghjgq.by.files.1drv.com/y4m13undXdHLXBI8KI9pWt5BfnPibPrgJp-hmxJt__ictAst3l6Z8cLEp7TGY5yAHS2fftUBlegWYoyclPK90VMxPeEVaWXOezN7GVJrbxxx_K7GBMpCe2go2_ck0PnsGAlaHlwjRTTvMnuMyADfjmUOzHHH1S87xf5-rzrINbi9jRMcY-ywNplQMhXvXrEDwnHA1fPw1Fd0tn11tB0WfSb_Q",
            260 : "mnhseq.by.files.1drv.com/y4m9-TE7dATWlFx13HH8PEOATpw5IRv2s1ErFwb6198Kl-tHow7TFSAkRC5HXJV358ZzK8t0tA4PEuj6T5ZOcVYzj1muZECjoQk14sEv_MabatKiWG1W2eBE71WoLxIaRJXvjPmam--H55wdE54WkQLuA5sQjbB5Kn3ibdI7Kpo2iwBu-vlprN9SBAn3EGJeVrfXunVPRYb-bMzzZjG1uC1aQ",
            263 : "0ggadw.by.files.1drv.com/y4mJOh6oMa2_z9sQnyrWYQeNCyp6n2pRC8EwrvRQQGmoARVDYLAcooASiEieCrI8DbOHtk0oUeSTSSsPl4utGsrY1xE05nIV-pLs99o8ISfnwiNpHqlGR77_86fYQr7t2KV4Q7er0_W-aHubA3TXAu99LqWpIGdQO8gRa4YSDzbNGcUreiEdtYGrfGV3UjbefZG5S-Lly41Igjgt_NlrmqKbw",
            305 : "kzhpgw.by.files.1drv.com/y4m79lcftgNm1KjFNlWnHEYJRs0BHsT7Yi53hpFBWFfrTnhfLbZjulznG7kEuReIoRv3C2O-nPCJ9NzUXStR0JsS391gNtdCQkSxwN2JoGOFoA3GXsKWELs5mjUxSEvcOo1JmLaXgvoD2nHk-je9Cw8AfBgPHbEUjB-os7aVWd0HeAWhilQduY4QcAoYui-1hb89vuj4meBvGUz3CaJCQ36lg",
           356 : "0ghqag.by.files.1drv.com/y4mZbtgY5Gi7yOL_IrQoDtcBIZumc1RjS6hpelHit_ifBX3s6UCJZSh92oCPz47Rc8zAnGEOe9_MtGvLcxpt7P3MWzg9ahwzQgw4AiBeoBRZ3O7bDdmBrBdDOgaqH1rKGzAs9F6hE2bz_MgSTqF6TJpSMIWX0d-5meLoQ6TK-By2bRdbi4WBxqmoLzwp_PDg5kv4EIYe6MglDADQiCu3ORuxw", 
           179 : "kzfqka.by.files.1drv.com/y4mBQroSNgNVDfoWQPjqX6BoSI7rr-ajmYJ4wLxGLOnpspp0DU0ELx1RZqSKfIMOpg-ccNtVd1HRw8jgTWSyv0GW514li_zvbRIYJb5JDgV5Uehv1nzhXDgIoGbjUtei4P_PK6x8sasrA9zG9UZmtogHvJc4SmZgzO8FvJ9WyjR8OMyykno0yzHSMCOjpU6-1E-FgPLpNIdFm1eFiTSMLp-DQ",
           323 : "0gfr1q.by.files.1drv.com/y4miyWd9aGE-HD7Ox6TpFSToIltzBqv8RNl9DFs2yxNfmjJJGWc8Y9GHjnH5j-z2CaaDmPFdZyN1k6oJws6c7UzYTsSNHl4seZ2A2PSjGkbcQ4AkVvtxDvYZClBVhjBLHR3zk3f114aYWCz9NFmM1KMXQSm_e85iVkOkqkUyxCqPImzchEuM4XwhxWnb7hnsqjcm3toRNulQ5Z4rtQpGXVasg", 
           182 : "mnjt7q.by.files.1drv.com/y4mD1QEV6FY9bkJb8toDG-mV7pd3hpYG11oJVXdwjMPj9A_ahbwJD02mZIeQS2xH5mwzUt9sJFzovErm1t70rJT-pW63XKlKCSi8yhfQ-nUugOzbvSiXzm_YQMMnsIKH6Fn9oQyX1L3chTRV8kU_xBmQBbZxSC-6PDxSSBg20OHueBiTHalGDV4X7zDB0TqEiVl0pbNcxufv-aQXs6YHpRdOQ",
           350 : "a9bcjg.by.files.1drv.com/y4mzq82QeDLmU3D_JIN3WMrbtVNPwjLt7OCBIZ31s8LBzmrfNmCnSKBBAS_3kje3_qHo58OBfKIo546j0-OhM_aNAl9NjT3nbc8-H9IIMegusMOoGyMRMGP0dniHwdHo0rPq5Plqixkku0K0U0TjUdc4G-bBVOl3bCkRSvowj3oo5fLFy9TNaOvroXZeM4_oBqu1-WR6CWrU7IXkNwzK1JLag" 
          }
  
        let imageUrl;
        switch (code) {
          case 113: //Sunny or Clear
          case 116: //Party cloudy
          case 119: //Cloudy
          case 122: //Overcast
          case 143: //Mist
          case 248: //Fog
          case 260: //Freezing fog
            imageUrl = background[code];
            break;
          case 263: //Patchy light drizzle
          case 176: //Patchy rain nearby
          case 200: //Thundery outbreaks in nearby
          case 266: //Light drizzle
          case 293: //Patchy light rain
          case 296: //Light rain
          case 299: //Moderate rain at times
          case 302: //Moderate rain
            imageUrl = background[263];
            break;
          case 305: //Heavy rain at times
          case 308: //Heavy rain
          case 353: //Light rain shower
            imageUrl = background[305];
            break;
          case 356: //Moderate or heavy rain shower
          case 359: //Torrential rain shower
          case 386: //Patchy light rain in area with thunder
          case 389: //Moderate or heavy rain in area with thunder
            imageUrl = background[356];
            break;
          case 179: //Patchy snow nearby
          case 227: //Blowing snow
          case 230: //Blizzard
            imageUrl = background[179];
            break;
          case 323: //Patchy light snow
          case 326: //Light snow
          case 329: //Patchy moderate snow
          case 332: //Moderate snow
          case 335: //Patchy heavy snow
          case 338: //Heavy snow
          case 392: //Patchy light snow in area with thunder
          case 395: //Moderate or heavy snow in area with thunder
            imageUrl = background[323];
            break;
          case 182: //Patchy sleet nearby
          case 185: //Patchy freezing drizzle nearby
          case 281: //Freezing drizzle
          case 284: //Heavy freezing drizzle
          case 311: //Light freezing rain
          case 314: //Moderate or heavy freezing rain
          case 317: //Light sleet
          case 320: //Moderate or heavy sleet
            imageUrl = background[182];
            break;
          case 350: //Ice pellets
          case 362: //Light sleet showers
          case 365: //Moderate or heavy sleet showers
          case 368: //Light snow showers
          case 371: //Moderate or heavy snow showers
          case 374: //Light showers of ice pellets
          case 377: //Moderate or heavy showers of ice pellets
            imageUrl = background[350];
            break;
          default:
            break;
        }
  
        return document.body.style.background = `dimgray url('https://${imageUrl}')no-repeat center/cover fixed`;
      }  
  
      ReactDOM.render(
        <App />,
        document.getElementById('root')
      );