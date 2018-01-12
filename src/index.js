import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';

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

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
