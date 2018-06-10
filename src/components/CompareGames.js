import React, { Component } from 'react';
import axios from 'axios';

export default class CompareGamesChart extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      games: []
    };
    this.questionGraph = this.questionGraph.bind(this);
  }
  componentDidMount() {
    const { games, teams } = this.state.games;
    axios
      .get('/v1/games')
      .then(res => res.data)
      .then(games => this.setState({ games }));

    axios
      .get(`/v1/teams`)
      .then(res => res.data)
      .then(teams => this.setState({ teams }));
  }

  questionGraph() {
    const { teams, games } = this.state;
    let axisArr = [['Games']];

    teams.map(team => {
      if (!axisArr[0].includes(team.team_name)) {
        axisArr[0].push(team.team_name);
      }
    });
    games.map(game => {
      let tempArr = [game.id.toString()];
      teams.map(team => {
        team.game_id === game.id ? tempArr.push(team.score) : tempArr.push(0);
      });
      axisArr.push(tempArr);
    });

    google.charts.load('current', { packages: ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(draw);

    function draw() {
      var data = google.visualization.arrayToDataTable(axisArr);

      var options = {
        animation: {
          startup: true,
          duration: 3000,
          easing: 'inAndOut'
        },
        title: `teams scores in games`,
        hAxis: {
          title: 'Games Id'
        },
        vAxis: {
          title: 'scores '
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('draw')
      );

      chart.draw(data, options);
    }
  }

  render() {
    this.questionGraph();
    return <div id="draw" />;
  }
}
