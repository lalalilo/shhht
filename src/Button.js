import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default (props) => (
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
  {...props}
/>
)
