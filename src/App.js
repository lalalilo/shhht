import React from 'react';
import Logo from './logo';
import styled from 'styled-components';
import SetupPage from './SetupPage';
import IllustrationPage from './IllustrationPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { colors, getLevel } from './levels'

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

class App extends React.Component {
  state = {
    color: colors[0],
    levelThreshold: 1,
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
      this.stream = stream
      const context = new AudioContext()
      this.context = context
      const analyser = context.createAnalyser()
      analyser.smoothingTimeConstant = 0.3
      analyser.fftSize = 256

      var audioInput = context.createMediaStreamSource(stream)

      const javascriptNode = context.createScriptProcessor(2048 * 8, 1, 1)
      // connect to destination, else it isn't called
      javascriptNode.connect(context.destination)

      // connect the source to the analyser
      audioInput.connect(analyser)

      // we use the javascript node to draw at a specific interval.
      analyser.connect(javascriptNode)

      javascriptNode.onaudioprocess = () => {
        const array =  new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(array)

        const level = getLevel(array)
        this.setState({
          color: colors[level],
          isPlaying: level <= this.state.levelThreshold
        })
      }
    })
  }

  end = () => {
    this.stream.getTracks()[0].stop()
    this.context.close()
  }

  reset = () => {
    this.stream.getTracks()[0].stop()
    this.context.close()
    this.setState({
      isStarted: false,
      isPlaying: false,
      color: colors[0]
    })
  }

  print = () => {
    window.setTimeout(window.print, 2)
  }

  getPage = () => {
    if (!this.state.isStarted) {
      return (
        <SetupPage
          level={this.state.levelThreshold}
          duration={this.state.duration}
          onDurationChange={(newValue) => this.setState({duration: newValue})}
          onLevelChange={(newValue) => this.setState({levelThreshold: newValue})}
          onSubmit={this.start}
        />
      )
    }
    return (
      <IllustrationPage
        duration={this.state.duration}
        color={this.state.color}
        level={this.state.levelThreshold}
        play={this.state.isStarted && this.state.isPlaying}
        reset={this.reset}
        print={this.print}
        onEnd={this.end}
      />
    )
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Wrapper>
          <Logo onClick={this.reset} />
          {this.getPage()}
        </Wrapper>
      </MuiThemeProvider>
    );
  }
}

export default App;
