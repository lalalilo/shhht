import React from 'react';
import styled from 'styled-components';
import Slider from 'material-ui/Slider';
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

const Strong = styled.strong`
font-size: 38px;
`

const levelLabels = {
  0: "très calme",
  1: "calme",
  2: "détendu",
  3: "convivial",
  4: "dynamique",
}

export default ({ duration, level, onDurationChange, onLevelChange, onSubmit }) => (
  <Wrapper>
    <Title> Durée de la séance : <Strong>{duration/(60*1000)} min</Strong></Title>
    <Slider
      min={1000 * 60}
      max={1000 * 3600 * 2}
      value={duration}
      style={{width: '300px'}}
      sliderStyle={{height: '5px'}}
      onChange={(event, newValue) => onDurationChange(newValue)}
      step={60000}
    />
    <Title>Niveau sonore attendu : <Strong>{levelLabels[level]}</Strong></Title>
    <Slider
      min={0}
      max={4}
      value={level}
      style={{width: '300px'}}
      sliderStyle={{height: '5px'}}
      onChange={(event, newValue) => onLevelChange(level)}
      step={1}
    />
    <Button onClick={onSubmit}>C'est parti !</Button>
  </Wrapper>
)
