import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import io from 'socket.io-client';
import anime from 'animejs';

const socket = io('https://speech.staging.lalilo.com/shhht')

export const record = () => {
  return navigator.mediaDevices.getUserMedia({
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
}

record()

socket.on('level', (level) => {
  console.log(level)
})


ReactDOM.render(<App />, document.getElementById('root'));

anime({
  targets: '#lineDrawing .lines path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  // autoplay: false,
  duration: 1500,
  delay: function(el, i) { return i * 500 },
  direction: 'alternate',
  loop: true
});
