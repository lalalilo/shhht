import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default (props) => (
<RaisedButton
  style={{
    height: 60,
    lineHeight: '60px',
    borderRadius: '30px',
    minWidth: '130px',
    boxShadow: 'none',
    margin: '0'
  }}
  buttonStyle={{
    borderRadius: '30px',
    color: '#82b2ff',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  }}
  overlayStyle={{
    height: 60,
    padding: '0 25px',
    borderRadius: '30px',
    minWidth: '130px'
  }}
  {...props}
/>
)
