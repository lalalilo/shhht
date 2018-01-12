import React, { Component } from 'react';
import Illustration from './illustration';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

class App extends Component {
  render() {
    return (
      <Wrapper>
      	<Illustration />
      </Wrapper>
    );
  }
}

export default App;
