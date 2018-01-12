import React, { Component } from 'react';
import Illustration from './illustration';
import Logo from './logo';
import styled from 'styled-components';
import io from 'socket.io-client';
import anime from 'animejs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';

const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color : ${props => props.backgroundColor};
transition: background-color 1000ms linear;
padding-bottom: 20px;
`
const muiTheme = getMuiTheme({
  slider: {
    selectionColor: '#FFFFFF',
    trackColor: 'rgba(255,255,255,0.3)',
    trackColorSelected: 'rgba(255,255,255,0.3)',
    trackSize: 5,
    handleSize: 16,
  },
});

const Title = styled.h3`
color: white;
font-size: 28px;
`

const Strong = styled.strong`
font-size: 38px;
`

const colorLevel = {
  0: "#3DCCC6",
  1: "#82B2FF",
  2: "#8F94FB",
  3: "#F772B4",
  4: "#F76767",
}

const levelLabels = {
  0: "très calme",
  1: "calme",
  2: "détendu",
  3: "convivial",
  4: "dynamique",
}

const socket = io(process.env.NODE_ENV === 'production' ? 'https://speech.lalilo.com/shhht' : 'http://localhost:5000/shhht')

class App extends Component {
  state = {
    backgroundColor: "#3DCCC6",
    isFinished: false,
    level: 1,
    isStarted: false,
    animationDuration: 60000
  }

  componentDidUpdate () {
  	if(this.state.isStarted === true){
      this.animation.play()
    }
  }

  componentDidMount () {
    let animationRythm = this.state.animationDuration/60
  	this.animation = anime({
  	  targets: '#lineDrawing .lines path',
  	  strokeDashoffset: [anime.setDashoffset, 0],
  	  easing: 'easeInOutSine',
      duration: animationRythm*2,
    	  autoplay: false,
  	  delay: function(el, i) { return i * animationRythm },
  	  complete: function(anim) {
        setTimeout(function(){ whenFinished(); }, 3000);
  	  },
  	});

    const whenFinished = () => {
      this.setState({isFinished: true})
    }
  }

  startFunction = () => {
    this.setState({isStarted: true})
    navigator.mediaDevices.getUserMedia({
      audio: {
        sampleSize: 16,
        channelCount: 1,
        sampleRate: 16000
      }
    })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.start(250)
      mediaRecorder.ondataavailable = (event) => {
        socket.emit('message', new Blob([event.data], { 'type' : 'audio/ogg; codecs=opus' }))
      }
    })

    socket.on('level', (level) => {
      console.log('level', level)
      const color = colorLevel[Math.round(level)]

      this.setState({backgroundColor: color})
      if (level > this.state.level) {
        return this.animation.pause()
      }
      else if(this.state.isStarted){
        this.animation.play()
      }
    })
  }

  restartFunction = () => {
     console.log("yep, cette fonction est à faire")
  }

  render() {
    if(this.state.isFinished){
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Logo />
          <Wrapper backgroundColor={this.state.backgroundColor}>
            BRAVO
            <RaisedButton onClick={this.restartFunction}>RESTART</RaisedButton>
          </Wrapper>
        </MuiThemeProvider>
      );
    }
    else{
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Logo />
          <Wrapper backgroundColor={this.state.backgroundColor}>
            <Illustration />
            <Title> Durée de la séance : <Strong>{this.state.animationDuration/(60*1000)} min</Strong></Title>
            <Slider
              min={1000*60}
              max={1000*6000*2}
              value={this.state.animationDuration}
              style={{width: '300px'}}
              sliderStyle={{height: '5px'}}
              onChange={(event, newValue) => this.setState({animationDuration: newValue})}
              step={60000}
            />
            <Title>Niveau sonore attendu : <Strong>{levelLabels[this.state.level]}</Strong></Title>
            <Slider
              min={0}
              max={4}
              value={this.state.level}
              style={{width: '300px'}}
              sliderStyle={{height: '5px'}}
              onChange={(event, newValue) => this.setState({level: newValue})}
              step={1}
            />
            <RaisedButton
              style={{
                height: 60,
                lineHeight: '60px',
                borderRadius: '30px',
                minWidth: '130px',
                boxShadow: 'none'
              }}
              buttonStyle={{
                borderRadius: '30px',
                color: '#82b2ff',
                fontWeight: 'bold',
              }}
              overlayStyle={{
                height: 60,
                borderRadius: '30px',
                minWidth: '130px'
              }}
              labelStyle={{
                padding: '0 25px',
                fontSize: '16px',
                color: '#82b2ff'
              }}
              onClick={this.startFunction}
            >
              C'est parti !
            </RaisedButton>
          </Wrapper>
        </MuiThemeProvider>
      );
    }
  }
}

export default App;
