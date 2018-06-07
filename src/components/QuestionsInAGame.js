import React, { Component } from 'react';
import axios from 'axios';

export default class QuestionsChart extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      gameId: 0
    };
    this.questionGraph = this.questionGraph.bind(this);
  }
  componentDidMount() {
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
          .get(`/v1/games/${game.id}/questions`)
          .then(res => res.data)
          .then(questions =>
            this.setState({ questions: questions, gameId: game.id })
          );
      });
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
      [
        'Question Id',
        'Answered Correctly',
        { role: 'style' },
        { role: 'annotation' }
      ]
    ];
    this.state.questions.map(question =>
      arr.push([
        `question # ${question.id}`,
        question.answered_correctly,
        getRandomColor(),
        question.answered_correctly
      ])
    );
    google.charts.load('current', { packages: ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {
      var data = google.visualization.arrayToDataTable(arr);

      var options = {
        animation: {
          startup: true,
          duration: 3000,
          easing: 'inAndOut'
        },
        title: `easiest question in game ${gameNumber}`,
        hAxis: {
          title: 'question Id'
        },
        vAxis: {
          title: 'number of correct answers '
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
