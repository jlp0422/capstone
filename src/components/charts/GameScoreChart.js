import React, { Component } from 'react';
import axios from 'axios';

export default class GameScoreChart extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      gameId: 0
    };
    this.questionGraph = this.questionGraph.bind(this);
  }
  componentDidMount() {
    const { bar } = this.props;
    if (bar) {
      axios
        .get(`/v1/bars/${bar.id}/games`)
        .then(res => res.data)
        .then(games =>
          games.reduce((lastGame, game) => {
            if (game.created_at > lastGame.created_at) lastGame = game;

            return lastGame;
          })
        )
        .then(game => {
          axios
            .get(`/v1/games/${game.id}/teams`)
            .then(res => res.data)
            .then(teams => this.setState({ teams: teams, gameId: game.id }));
        });
    } else {
      axios
        .get('/v1/games')
        .then(res => res.data)
        .then(games =>
          games.reduce((lastGame, game) => {
            if (game.created_at > lastGame.created_at) lastGame = game;

            return lastGame;
          })
        )
        .then(game => {
          axios
            .get(`/v1/games/${game.id}/teams`)
            .then(res => res.data)
            .then(teams => this.setState({ teams: teams, gameId: game.id }));
        });
    }
  }
  questionGraph() {
    const gameNumber = this.state.gameId;
    const getRandomColor = () => {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    let arr = [
      ['Team Name', 'Score', { role: 'style' }, { role: 'annotation' }]
    ];
    this.state.teams.map(team =>
      arr.push([team.team_name, team.score, getRandomColor(), team.score])
    );
    google.charts.load('current', { packages: ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(draw);

    function draw() {
      var data = google.visualization.arrayToDataTable(arr);

      var options = {
        animation: {
          startup: true,
          duration: 3000,
          easing: 'inAndOut'
        },
        title: `scores in game # ${gameNumber}`,
        hAxis: {
          title: 'teams'
        },
        vAxis: {
          title: 'points scored in the game '
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('drawing')
      );

      chart.draw(data, options);
    }
  }

  render() {
    this.questionGraph();
    return <div id="drawing" />;
  }
}
