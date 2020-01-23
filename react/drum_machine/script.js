import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import '../../public/css/drum_machine.css';

console.log('loading drum_machine script')

// main component for display and drumpad
class Drum_Machine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display : "Drum Machine 2020",
      button  : ""
    }
    
    this.playAudio    = this.playAudio.bind(this);
    this.keydownEvent = this.keydownEvent.bind(this);
    this.keyupEvent   = this.keyupEvent.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.keydownEvent);
    document.addEventListener('keyup',   this.keyupEvent);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownEvent);
    document.removeEventListener('keyup',   this.keyupEvent);
  }
  
  playAudio(value) { 
    clearInterval(this.displayTimer);
    let audio = document.getElementById(value);
    audio.load(); // restart media playback
    audio.play(); // play selected media item
    this.setState({ 
      display: keypad[value].id
    });
    this.displayTimer = setInterval(() => this.setState({display: 'Drum Machine 2020'}), 1500);
  }
  
  keydownEvent(event) {
    let value = String.fromCharCode(event.which),
        id    = modifyId(keypad[value].id);
    document.getElementById(id).classList.add('active');
    this.playAudio(value);  
  }
  
  keyupEvent(event) {
    let value = String.fromCharCode(event.which),
        id    = modifyId(keypad[value].id);
    document.getElementById(id).classList.remove('active');   
  }
  
  render() {
    return(
    <ErrorBoundary>
      <div id='drum-machine'>
        <div id='display'>{this.state.display}</div>
        <Drumpad clickHandler={this.playAudio}/>
      </div>  
    </ErrorBoundary>
    );
  }
};


// data object for sound files
const keypad = { 
  Q: { url:'/audio/E808_CB-02.mp3',
        id: 'Cowbell'
     },
  W: { url: '/audio/E808_HT-01.mp3',
        id: 'Tom'
     },
  E: { url: '/audio/E808_CY-04.mp3',
        id: 'Cymbal'
     },
  A: { url: '/audio/E808_OH-04.mp3', 
        id: 'HH Open'
     },
  S: { url: '/audio/E808_CP-02.mp3',
        id: 'Clap'
     },
  D: { url: '/audio/E808_CH-12.mp3',
        id: 'HH Closed'
     },
  Z: { url: '/audio/E808_RS-02.mp3',
        id: 'Rimshot'
     },
  X: { url: '/audio/E808_SD-20.mp3', 
        id: 'Snare'
     },
  C: { url: '/audio/E808_BD%5Blong%5D-09.mp3', 
        id: 'Kick'
     }
};

// converts Keypad obj to usable string
const modifyId = (id) => {
  return id.replace( /( )/g, '_').toLowerCase();
}

// builds the drumpad buttons
const Drumpad = (props) => {
  let createTableData = function(arr) {
    let table = arr.map((note, index) => {
         let audioDb = keypad[note],
             id = modifyId(audioDb.id);
             
         return (
           <td key={index}>
             <button id={id} className='drum-pad' onClick={() => props.clickHandler(note)}>
             <audio id={note} className='clip' src={audioDb.url} preload='auto'>Your browser does not support the <code>audio</code> element</audio>{note}</button>
           </td> 
         );       
    })
  return (
    <tr>
      {table}
    </tr>
    );
  }  
  
  return (
    <ErrorBoundary>
    <div id='tableLayout'>
      <table>
        <tbody>
          {createTableData(['Q', 'W', 'E'])}
          {createTableData(['A', 'S', 'D'])}
          {createTableData(['Z', 'X', 'C'])}
        </tbody>
      </table>
    </div>    
    </ErrorBoundary>
  )
}; 

// error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
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
      return <h1>Um...Something went wrong.</h1>;
    }
    return this.props.children;
  };
};


ReactDOM.render(<Drum_Machine />, document.getElementById("root"));