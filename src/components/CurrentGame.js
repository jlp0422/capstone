import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CurrentGame extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      teams: [],
      index: 0
    };
    this.changeState = this.changeState.bind(this);
  }
  changeState() {
    this.setState({ index: this.state.index + 1 });
  }

  componentDidMount() {
    axios
      .get('/v1/api')
      .then(res => res.data)
      .then(_questions => _questions.results)
      .then(questions => this.setState({ questions: questions }));
    axios
      .get('/v1/games/current')
      .then(res => res.data)
      .then(game => {
        axios
          .get(`/v1/games/${game.id}/teams`)
          .then(res => res.data)
          .then(teams => this.setState({ teams: teams }));
      });
  }
  render() {
    const { teams, questions, index } = this.state;
    const { changeState } = this;
    console.log(this.state);
    return (
      <div>
        {questions.length ? (
          <div className="grid-container">
            {index === questions.length - 1 && <h1>LAST QUESTION</h1>}
            <h2 className="grid-question-header">Question No.{index + 1}</h2>
            <button
              className="grid-button"
              disabled={index === questions.length - 1}
              onClick={() => changeState()}
            >
              Next Question
            </button>
            <span className="grid-question">{questions[index].question}</span>
            <span className="grid-answer">
              <strong>correct answer:</strong>
              {questions[index].correct_answer}
            </span>
          </div>
        ) : null}
        {teams.length ? (
          <div>
            <h1>Teams</h1>
            <div className="grid-container">
              <h3 className="grid-item1">name</h3>
              <h3 className="grid-item2">answer</h3>
            </div>
            {teams.map(team => {
              return (
                <div className="" key={team.id}>
                  <ul className="team">
                    <li>
                      <Link to={`/players/${team.id}`}>{team.team_name}</Link>
                    </li>
                    <li>
                      <span>place holder for answer</span>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
