import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Teams extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      showAll: true,
      currentGame: null
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({ showAll: !this.state.showAll });
  }
  componentDidMount() {
    axios
      .get('/v1/players')
      .then(res => res.data)
      .then(players => {
        players.map(player => {
          this.setState({
            teams: [
              ...this.state.teams,
              {
                name: player.team_name,
                email: player.email,
                id: player.id,
                game_id: player.game_id,
                score: player.score
              }
            ]
          });
        });
      });
    axios
      .get('/v1/games/current')
      .then(res => res.data)
      .then(game => this.setState({ currentGame: game.id }));
  }
  render() {
    const { teams, showAll, currentGame } = this.state;
    console.log(teams.score);
    return (
      <div>
        <button onClick={this.onClick}>
          toggle all players/players assigned the game
        </button>
        <h1>Teams</h1>
        <div className="grid-container">
          <h3 className="grid-item1">name</h3>
          {showAll && <h3 className="grid-item2">email</h3>}
          {!showAll && <h3 className="grid-item2">score</h3>}
        </div>
        {showAll
          ? teams.map(team => {
              return (
                <div className="" key={team.id}>
                  <ul className="team">
                    <li>
                      <Link to={`/players/${team.id}`}>{team.name}</Link>
                    </li>

                    <li>
                      <Link to={`mailto:${team.email}`}>{team.email}</Link>
                    </li>
                  </ul>
                </div>
              );
            })
          : teams.map(team => {
              if (team.game_id === currentGame) {
                return (
                  <div key={team.id}>
                    <ul className="team">
                      <li>
                        <Link to={`/players/${team.id}`}>{team.name}</Link>
                      </li>

                      <li>{team.score}</li>
                    </ul>
                    <br />
                  </div>
                );
              }
            })}
      </div>
    );
  }
}
