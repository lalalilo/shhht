import React, { Component } from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import { labels } from './levels'
import Button from './Button'
import illustrations from './illustrations';

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

const IllustrationWrapper = styled(({format, ...props}) => <div {...props} />)`
width: ${props => 70 * props.format}vmin;
@media print {
  width: 100%;
}
`

const Actions = styled.div`
display: flex;
@media print {
  display: none;
}
`

const Action = styled.div`
margin: 40px 20px;
`

class IllustrationPage extends Component {
  state = {
    isFinished: false
  }
  componentDidMount () {
    window.ga('set', 'page', '/illustration')
    window.ga('set', 'metric1', this.props.duration)
    window.ga('set', 'dimension1', labels[this.props.level])
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
    if(nextProps.play) return this.animation.play()
    this.animation.pause()
  }

  render() {
    const { color, print, reset, illustrationIndex } = this.props
    const Illustration = illustrations[illustrationIndex].component
    return (
      <Wrapper backgroundColor={this.state.isFinished ? '#82b2ff' : color}>
        <IllustrationWrapper format={illustrations[illustrationIndex].format}>
          <Illustration />
        </IllustrationWrapper>
        <Actions>
          <Action>
            { this.state.isFinished && <Button onClick={reset}>Recommencer</Button> }
          </Action>
          <Action>
            { this.state.isFinished && <Button onClick={print}>Imprimer</Button> }
          </Action>
        </Actions>
      </Wrapper>
    )
  }
}

export default IllustrationPage;
