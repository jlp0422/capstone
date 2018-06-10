import React, { Component } from 'react';
import axios from 'axios';

export default class AllQuestionsChart extends Component {
  constructor() {
    super();
    this.state = {
      allQuestions: []
    };
    this.allQuestionGraph = this.allQuestionGraph.bind(this);
  }
  componentDidMount() {
    axios
      .get('/v1/dbQuestions')
      .then(res => res.data)
      .then(allQuestions => this.setState({ allQuestions }));
  }
  allQuestionGraph() {
    const getRandomColor = () => {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    let dataArr = [
      [
        'Question Id',
        'Answered Correctly',
        { role: 'style' },
        { role: 'annotation' }
      ]
    ];
    this.state.allQuestions.map(question => {
      console.log(question.id);
      dataArr.push([
        `question # ${question.id}`,
        question.answered_correctly,
        getRandomColor(),
        question.answered_correctly
      ]);
    });
    google.charts.load('current', { packages: ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {
      var data = google.visualization.arrayToDataTable(dataArr);

      var options = {
        animation: {
          startup: true,
          duration: 3000,
          easing: 'inAndOut'
        },
        title: `easiest question in all games`,
        hAxis: {
          title: 'question Id'
        },
        vAxis: {
          title: 'number of correct answers '
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('drawAll')
      );

      chart.draw(data, options);
    }
  }

  render() {
    this.allQuestionGraph();
    return <div id="drawAll" />;
  }
}
