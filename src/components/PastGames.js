import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class PastGames extends Component {
  constructor() {
    super();
    this.state = {
      //THE FOLLOWING ARRAY IS JUST FAKE DATA, IT IS TO BE REPLACED WITH AN EMPTY ARRAY ONCE WE HAVE A ROUTE
      pastGames: [
        {
          id: 1,
          date: '01/01/2018',
          numberOfTeams: 4
        },
        {
          id: 2,
          date: '02/01/2018',
          numberOfTeams: 5
        },
        {
          id: 3,
          date: '03/01/2018',
          numberOfTeams: 6
        },
      ]
    };
  }
  //CALL TO DATA TO BE COMPLETED ONCE WE HAVE A ROUTE
  // componentDidMount() {
  //   axios
  //     .get('/v1/games')
  //     .then(res => res.data)
  //     .then(_games => _games.activeGame === false)
  //     .then(pastGames => this.setState({ pastGames }));
  // }
  render() {
    const { pastGames } = this.state;
    return (
      <div className="container">
      <div className="row">
        <div className="col">
          <h3>Date</h3>
          {
            pastGames.map(game => {
              return (
                <div key={game.id}>
                  {game.date}
                </div>
              );
            })
          }
        </div>
        <div className="col">
          <h3>No. of Teams</h3>
          {
            pastGames.map(game => {
              return (
                <div key={game.id}>
                  {game.numberOfTeams}
                </div>
              );
            })
          }
        </div>
      </div>
      </div>
    );
  }
}
