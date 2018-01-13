import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #82b2ff;
`
const Title = styled.h3`
color: white;
font-size: 28px;
`

export default class extends React.Component {
  componentDidMount () {
    window.ga('set', 'page', '/end')
    window.ga('send', 'pageview')
  }
  render () {
    const { reset } = this.props
    return (
      <Wrapper>
        <Title>BRAVO</Title>
        <Button onClick={reset}>Recommencer</Button>
      </Wrapper>
    )
  }
}
