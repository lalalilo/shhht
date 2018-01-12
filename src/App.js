import React, { Component } from 'react';
import Illustration from './illustration';
import styled from 'styled-components';
import io from 'socket.io-client';
import anime from 'animejs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Slider from 'material-ui/Slider';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color : ${props => props.backgroundColor};
  transition: background-color 1000ms linear;
`
const Button = styled.button`
	margin-top: 20px
`
const muiTheme = getMuiTheme({
  slider: {
    selectionColor: '#FFFFFF',
    trackColor: 'rgba(255,255,255,0.3)',
    trackSize: 5,
    handleSize: 16
  }
});

const colorLevel = {
  0: "#3DCCC6",
  1: "#82B2FF",
  2: "#8F94FB",
  3: "#F772B4",
  4: "#F76767",
}

class App extends Component {
  state = {
    backgroundColor: "#3DCCC6",
    level: 1.5
  }
  componentDidMount () {
    const socket = io(process.env.NODE_ENV === 'production' ? 'https://speech.lalilo.com/shhht' : 'http://localhost:5000/shhht')
    console.log(socket)
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

    const animation = anime({
      targets: '#lineDrawing .lines path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function(el, i) { return i * 500 },
    });

    socket.on('level', (level) => {
      const color = colorLevel[Math.round(level)]

      this.setState({backgroundColor: color})
      if (level > this.state.level) {
        return animation.pause()
      }
      animation.play()
    })
  }

  startFunction = () => {
    	console.log("youpi");
    }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Wrapper backgroundColor={this.state.backgroundColor}>
          <Illustration />
          <Slider
            min={0}
            max={4}
            value={this.state.level}
            style={{width: '300px'}}
            sliderStyle={{height: '5px'}}
            onChange={(event, newValue) => this.setState({level: newValue})}
          />
          <Button onClick={this.startFunction}>START</Button>
        </Wrapper>
      </MuiThemeProvider>
    );
  }
}

export default App;
