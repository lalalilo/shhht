import React, { Component } from 'react';
import Illustration from './illustration';
import styled from 'styled-components';
import io from 'socket.io-client';
import anime from 'animejs';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

class App extends Component {
  componentDidMount () {
    const socket = io(process.env.NODE_ENV === 'production' ? 'https://speech.lalilo.com/shhht' : 'http://localhost:5000')

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
      if (level > 1.5) {
        return animation.pause()
      }
      animation.play()
    })
  }
  render() {
    return (
      <Wrapper>
      	<Illustration />
      </Wrapper>
    );
  }
}

export default App;
