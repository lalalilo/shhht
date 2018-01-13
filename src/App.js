import React from 'react';
import Logo from './logo';
import styled from 'styled-components';
import io from 'socket.io-client';
import SetupPage from './SetupPage';
import IllustrationPage from './IllustrationPage';
import EndPage from './EndPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const Wrapper = styled.div`
width: 100%;
height: 100%;
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

const colorLevel = {
  0: "#3DCCC6",
  1: "#82B2FF",
  2: "#8F94FB",
  3: "#F772B4",
  4: "#F76767",
}

const socket = io(process.env.NODE_ENV === 'production' ? 'https://speech.lalilo.com/shhht' : 'http://localhost:5000/shhht')

class App extends React.Component {
  state = {
    color: colorLevel[0],
    isFinished: false,
    level: 1,
    isStarted: false,
    isPlaying: false,
    duration: 60000 * 55
  }

  start = () => {
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
      const color = colorLevel[Math.round(level)] || colorLevel[0]

      this.setState({
        color: color,
        isPlaying: level <= this.state.level
      })
    })
  }

  getPage = () => {
    if (this.state.isFinished) {
      return (
        <EndPage
          reset={() => this.setState({
            isFinished: false,
            isStarted: false,
            isPlaying: false,
            color: colorLevel[0]
          })}
        />
      )
    }
    if (!this.state.isStarted) {
      return (
        <SetupPage
          level={this.state.level}
          duration={this.state.duration}
          onDurationChange={(newValue) => this.setState({duration: newValue})}
          onLevelChange={(newValue) => this.setState({level: newValue})}
          onSubmit={this.start}
        />
      )
    }
    return (
      <IllustrationPage
        onEnd={() => this.setState({isFinished: true})}
        duration={this.state.duration}
        color={this.state.color}
        level={this.state.level}
        play={this.state.isStarted && this.state.isPlaying}
      />
    )
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Wrapper>
          <Logo />
          {this.getPage()}
        </Wrapper>
      </MuiThemeProvider>
    );
  }
}

export default App;
