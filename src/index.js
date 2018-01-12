import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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
    mediaRecorder.start(100)
    mediaRecorder.ondataavailable = (event) => {
      console.log('coucou')
    }
  })
}

record()

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
