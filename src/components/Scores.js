import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Scores extends Component {
  constructor() {
    super();
    this.state = {
      teams: []
    }
  }
  componentDidMount() {
    axios
      .get('/v1/teams')
      .then(res => res.data)
      .then(team => {
        this.setState({
          teams: [
            ...this.state.teams,
            {
              name: team.team_name,
              score: team.score
            }
          ]
        })
      });
  }
  render() {
    const { teams } = this.state;
    return (
      <div className="container">
        <div className="grid-container">
          <div className="grid-item-1">
            <h3>Team</h3>
          </div>
          <div className="grid-item-2">
            <h3>Score</h3>
          </div>
        </div>
        {
          teams.map(team => {
            return (
              <div key={team.id} className="grid-container">
                <div className="grid-item-1">
                   { team.team_name }
                </div>
                <div className="grid-item-2">
                  { team.score }
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
