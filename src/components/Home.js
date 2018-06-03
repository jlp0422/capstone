/* eslint-disable */
import React from 'react';
import socket from '../../socket-client';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.onStartGame = this.onStartGame.bind(this)
  }

  onStartGame() {
    const { history } = this.props
    localStorage.setItem('index', 0)
    socket.emit('start game')
    history.push('/games/active')
  }

  render() {
    const { onStartGame } = this
    const { bar } = this.props
    return (
      <div className='home'>
        <h1> Cheers, { bar.name } </h1>
        <img className='home-img' width='500' height='500' src='/public/images/UTT-logo.svg' />
        <br/>
        <button onClick={ onStartGame }> Click to Start a Game </button>
      </div>
    )
  }
}

export default Home;

