/* eslint-disable */
import React from 'react';
import socket from '../../socket-client';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
    this.onStartGame = this.onStartGame.bind(this);
  }

  componentDidMount() {
    this.props.whoAmI();
    const teams = localStorage.getItem('teams');
    if (teams) this.setState({ teams: teams.split(', ') });
    socket.on('team register', team => {
      this.setState({ teams: [team, ...this.state.teams] });
      const teams = localStorage.getItem('teams');
      const teamString = teams ? `${teams}, ${team}` : team;
      localStorage.setItem('teams', teamString);
    });
  }

  componentWillUnmount() {
    socket.off('team register');
  }

  onStartGame() {
    const { history, bar } = this.props;
    const { teams } = this.state;
    localStorage.setItem('index', 0);
    localStorage.setItem('waitTimer', 10);
    localStorage.setItem('questionTimer', 10);
    localStorage.setItem('questionActive', 'yes');
    console.log('home teams: ', teams);
    socket.emit('start game', { bar_id: bar.id, teams });
    history.push('/games/active');
  }

  render() {
    const { teams } = this.state;
    const { onStartGame } = this;
    const { bar } = this.props;
    const index = localStorage.getItem('index');
    return (
      <div className="home">
        <img className="home-img mb-3" src="/public/images/wordmark.png" />
        <br />
        <h1 className="mt-4"> Cheers, {bar.name} </h1>
        <h3>Teams connected:</h3>
        {teams.length ? teams.map(team => <p key={team}>{team}</p>) : null}
        <br />
        {bar.endOfMembershipDate !== 'Invalid date' &&
        bar.endOfMembershipDate !== null ? (
          !index && (
            <button onClick={onStartGame}> Click to Start a Game </button>
          )
        ) : (
          <h3>
            Please <Link to="/checkout">sign up!</Link>
          </h3>
        )}
        {/*{
          bar.endOfMembershipDate !== "Invalid date" && bar.endOfMembershipDate !== null ? (
            
              <p>Membership expires on bar.endOfMembershipDate</p> 
            
          ) : (null)
        }*/}
      </div>
    );
  }
}

export default Home;
