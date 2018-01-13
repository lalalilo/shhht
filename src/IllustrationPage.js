import React, { Component } from 'react';
import Illustration from './illustration';
import styled from 'styled-components';
import anime from 'animejs';
import levelLabels from './levels';

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
  	  complete: (animation) => window.setTimeout(this.props.onEnd, 3000),
  	})
  }

  componentWillReceiveProps (nextProps, props) {
    nextProps.play && !props.play && this.animation.play()
    !nextProps.play && props.play && this.animation.pause()
  }

  render() {
    return (
      <Wrapper backgroundColor={this.props.color}>
        <Illustration />
      </Wrapper>
    )
  }
}

export default IllustrationPage;
