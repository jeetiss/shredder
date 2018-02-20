import React, { Component } from 'react';
import styled from 'styled-components'

const Header = styled.div`
  font-size: 140px;
  font-weight: 900;
  font-family: Arial, Helvetica, sans-serif;

  text-transform: uppercase;
  line-height: 135px;

  color: white;
  background-color: #202229;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 100vh;
  z-index: -1;
`

const Space = styled.div`
  background-color: #202229;

  flex-grow: 1;

  border-right: 1px solid black;

  &:last-child {
    border-right: none;
  }
`

const TwoBlocks = styled.div`
  position: relative;
`

class App extends Component {
  render() {
    return (
      <Shredder size={6}>
        <TwoBlocks>
          <Container>
            <Header>
              Shredder
            </Header>
          </Container>

          <Background>
            <Space />
            <Space />
            <Space />
            <Space />
            <Space />
            <Space />
          </Background>
        </TwoBlocks>
      </Shredder>
    );
  }
}

const Line = styled.div`
  position: relative;

  width: ${props => props.width}px;
  height: ${props => props.height}px;
  overflow: hidden;

  transition: transform 0.5s ease;
`

const Lines = styled.div`
  display: flex;
`

class Shredder extends Component {
  state = {
    width: 1,
    heigth: 1,
    mount: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.update)
    this.update()

    setTimeout(() => this.setState({ ...this.state, mount: true }), 500)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.update)
  }

  update = () => this.setState({
    width: window.innerWidth - 15,
    height: window.innerHeight
  })

  render() {
    const { width, height, mount } = this.state
    const { size, children: Comp } = this.props

    const lineWidth = width / size
    const getStyleForLine = i => ({
      position: 'absolute',
      top: 0,
      left: `-${lineWidth * i}px`,
      width,
      height
    })

    return (
      <Lines>
        {Array.from({ length: size }, (_, i) => i).map(key => (
          <Line key={key} width={lineWidth} height={height} style={
            {
              transitionDelay: `${0.05 * key}s`,
              transform: mount ? 'translateY(0)' : `translateY(${height}px)`
            }}>
            {React.cloneElement(Comp, { ...Comp.props, style: getStyleForLine(key) })}
          </Line>
        ))}
      </Lines>
    )
  }
}


export default App;
