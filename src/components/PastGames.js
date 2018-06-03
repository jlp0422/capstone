import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export default class PastGames extends Component {
  constructor() {
    super();
    this.state = {
      pastGames: [],
    };
  }
  componentDidMount() {
    axios
      .get('/v1/games')
      .then(res => res.data)
      .then(_games => _games.filter(game => game.active === false))
      .then(pastGames => this.setState({ pastGames }));
  }
  render() {
    const { pastGames } = this.state;
    return (
      <div className="container">
        <div className="grid-container">
          <div className="grid-item-1">
            <h3>Date</h3>
          </div>
          <div className="grid-item-2">
            <h3>No. of Teams</h3>
          </div>
        </div>
        {
          pastGames.map(game => {
            return (
              <div key={game.id} className="grid-container">
                <div className="grid-item-3">
                  <Link to={`/pastgames/${game.id}`}>
                    { moment(game.createdAt).format('mm:dd:yy') }
                  </Link>
                </div>
                <div className="grid-item-4">
                  { game.num_of_teams }
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
