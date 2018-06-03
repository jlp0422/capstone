import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TeamsList from './TeamsList';

export default class Teams extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      showAll: false,
      currentGame: null
    };
  }

  componentDidMount() {
    axios
      .get('/v1/teams')
      .then(res => res.data)
      .then(teams => this.setState({ teams: [...this.state.teams, ...teams ]}));
    axios
      .get('/v1/games/active')
      .then(res => res.data)
      .then(game => this.setState({ currentGame: game.id }));
  }
  render() {
    const { teams, showAll, currentGame } = this.state;
    return (
      <div>
        <h1> { showAll ? 'All Teams' : "Teams in this Game" } </h1>
        <TeamsList showAll={showAll} teams={ showAll ? teams : teams.filter(team => team.game_id === currentGame )}/>
        <button onClick={() => this.setState({ showAll: !this.state.showAll })}>
          { showAll ? "Active Game's Teams" : 'All Teams' }
        </button>
      </div>
    );
  }
}
