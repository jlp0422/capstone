import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export default class PastGames extends Component {
  constructor() {
    super();
    this.state = {
      pastGames: [],
      teams: []
    };
  }
  componentDidMount() {
    axios.get('/v1/games')
      .then(res => res.data)
      .then(_games => _games.filter(game => game.active === false))
      .then(pastGames => this.setState({ pastGames }));
    axios.get('/v1/teams')
      .then(res => res.data)
      .then(teams => this.setState({ teams }))
  }
  render() {
    const { pastGames, teams } = this.state;
    if (!teams.length) return null
    return (
      <div>
        <div className='teams-list'>
          <div className='team'>
            <h3 className='team-name header'>Date</h3>
            <h3 className='team-secondary header'># of Teams</h3>
          </div>
          { pastGames.map(game => (
            <div key={game.id}>
              <div className="team">
                <Link to={`/pastgames/${game.id}`}>
                  {moment(game.createdAt).format('MMMM Do, YYYY')}
                </Link>
                <div className="grid-item-2">
                  { teams.filter(team => team.game_id === game.id).length }
                </div>
              </div>
            </div>
            ))
          }
        </div>
      </div>
    );
  }
}
