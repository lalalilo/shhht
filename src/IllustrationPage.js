import React, { Component } from 'react';
import Illustration from './illustration';
import styled from 'styled-components';
import anime from 'animejs';
import levelLabels from './levels';
import Button from './Button';

const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color : ${props => props.backgroundColor};
transition: background-color 500ms linear;
padding-bottom: 20px;
`

const Actions = styled.div`
display: flex;
`

class IllustrationPage extends Component {
  componentDidMount () {
    window.ga('set', 'page', '/illustration')
    window.ga('set', 'metric1', this.props.duration)
    window.ga('set', 'dimension1', levelLabels[this.props.level])
    window.ga('send', 'pageview')

    const animationRythm = this.props.duration / 60
  	this.animation = anime({
  	  targets: '#lineDrawing .lines path',
  	  strokeDashoffset: [anime.setDashoffset, 0],
  	  easing: 'easeInOutSine',
      duration: animationRythm * 2,
      autoplay: false,
  	  delay: (el, i) => i * animationRythm,
  	  complete: (animation) => {
        this.setState({isFinished: true})
        this.props.onEnd()
      },
  	})
  }

  componentWillReceiveProps (nextProps, props) {
    nextProps.play && !props.play && this.animation.play()
    !nextProps.play && props.play && this.animation.pause()
  }

  render() {
    const { color, print, reset } = this.props
    return (
      <Wrapper backgroundColor={this.state.isFinished ? '#82b2ff' : color}>
        <Illustration />
        <Actions>
          { this.state.isFinished && <Button onClick={reset}>Recommencer</Button> }
          { this.state.isFinished && <Button onClick={print}>Imprimer</Button> }
        </Actions>
      </Wrapper>
    )
  }
}

export default IllustrationPage;