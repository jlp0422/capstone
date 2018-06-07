/* eslint-disable */
import React from 'react';
import socket from '../../socket-client';
import qr from 'qr-image';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: []
    }
    this.onStartGame = this.onStartGame.bind(this)
  }

  componentDidMount() {
    const teams = localStorage.getItem('teams')
    if (teams) this.setState({ teams: teams.split(', ') })
    socket.on('team register', (team) => {
      this.setState({ teams: [ team, ...this.state.teams ]})
      const teams = localStorage.getItem('teams')
      const teamString = teams ? `${teams}, ${team}` : team
      localStorage.setItem('teams', teamString)
    })
  }

  componentWillUnmount() {
    socket.off('team register')
  }

  onStartGame() {
    const { history, bar } = this.props
    localStorage.setItem('index', 0)
    socket.emit('start game', bar.id)
    history.push('/games/active')
  }

  render() {
    const { teams } = this.state
    const { onStartGame } = this
    const { bar } = this.props
    return (
      <div className='home'>
        <h1> Cheers, { bar.name } </h1>
        <h3>Teams connected:</h3>
        { teams.length ?
          teams.map(team => (
            <p key={team}>{team}</p>
          )) : null
        }
        <div><button onClick={ onStartGame }> Click to Start a Game </button></div>
        <img className='home-img' width='500' height='500' src='/public/images/UTT-logo.svg' />
        <br/>
      </div>
    )
  }
}

export default Home;

