import React from 'react'
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views'
import illustrations from './illustrations'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Left from 'material-ui/svg-icons/navigation/chevron-left'
import Right from 'material-ui/svg-icons/navigation/chevron-right'

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 200px;
`

const Item = styled(({format, ...props}) => <div {...props} />)`
width: ${props => 200 * props.format}px;
`

const IconButton = styled(FloatingActionButton)`
& button {
  background-color: #fff !important;
}
& button:disabled {
  background-color: rgba(255, 255, 255, .5) !important;
}
& svg {
  fill: #82b2ff !important;
}
`

const NavigationButton = ({...props}) => (
  <IconButton
    {...props}
    mini={true}
    zDepth={0}
  />
)

class SelectIllustration extends React.Component {
  render() {
    return (
      <Wrapper>
        <NavigationButton
          onClick={() => this.props.onSelect(this.props.index - 1)}
          disabled={this.props.index === 0}
        >
          <Left />
        </NavigationButton>
        <SwipeableViews
          index={this.props.index}
          style={{width: '300px'}}
          slideStyle={{
            display: 'flex',
            justifyContent: 'center'
          }}
          onChangeIndex={this.handleChange}
        >
          {illustrations.map(illustration => (
            <Item key={illustration.title} format={illustration.format}>
              <illustration.component />
            </Item>
          ))}
        </SwipeableViews>
        <NavigationButton
          onClick={() => this.props.onSelect(this.props.index + 1)}
          disabled={this.props.index === illustrations.length - 1}
        >
          <Right />
        </NavigationButton>
      </Wrapper>
    )
  }
}

export default SelectIllustration
