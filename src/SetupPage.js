import React from 'react';
import styled from 'styled-components';
import Slider from 'material-ui/Slider';
import Button from './Button';
import { labels, colors } from './levels';
import headerImage from './images/start.png'

const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
background-color : ${props => props.backgroundColor};
transition: background-color 500ms linear;
`

const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const Slogan = styled.h2`
color: white;
font-weight: bold;
font-size: 30px;
margin-top: 0;
`

const Title = styled.h3`
color: white;
font-weight: normal;
font-size: 22px;
margin: 10px;
`

const Strong = styled.strong`
font-size: 30px;
`

const Header = styled.img`
width: 110px;
margin-bottom: 30px;
`

export default class extends React.Component {
  componentDidMount () {
    window.ga('set', 'page', '/setup')
    window.ga('send', 'pageview')
  }
  render () {
    const { duration, level, onDurationChange, onLevelChange, onSubmit } = this.props
    return (
      <Wrapper backgroundColor={colors[level]}>
        <Content>
          <Header src={headerImage} alt='' />
          <Slogan>Le silence fera apparaître une suprise...</Slogan>
        </Content>
        <Content>
          <Title> Durée de la séance : <Strong>{duration/(60*1000)} min</Strong></Title>
          <Slider
            min={1000 * 60}
            max={1000 * 3600 * 2}
            value={duration}
            style={{width: '300px'}}
            sliderStyle={{height: '5px', marginTop: '6px'}}
            onChange={(event, newValue) => onDurationChange(newValue)}
            step={60000}
          />
          <Title>Niveau sonore attendu : <Strong>{labels[level]}</Strong></Title>
          <Slider
            min={0}
            max={4}
            value={this.props.level}
            style={{width: '300px'}}
            sliderStyle={{height: '5px', marginTop: '6px'}}
            onChange={(event, newValue) => onLevelChange(newValue)}
            step={1}
          />
        </Content>
        <Button onClick={onSubmit}>C'est parti !</Button>
      </Wrapper>
    )
  }
}
