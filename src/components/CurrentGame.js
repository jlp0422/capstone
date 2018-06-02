import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TeamsList from './TeamsList';

export default class CurrentGame extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      teams: [],
      index: 0
    };
  }

  componentDidMount() {
    axios
      .get('/v1/games/active')
      .then(res => res.data)
      .then(game => {
        axios.get(`/v1/games/${game.id}/teams`)
          .then(res => res.data)
          .then(teams => this.setState({ teams }));
        axios.get(`/v1/games/${game.id}/questions`)
          .then(res => res.data)
          .then(questions => this.setState({ questions }));  
      });
  }

  render() {
    const { teams, questions, index } = this.state;
    return (
      <div>
        {
          questions.length &&  
            <div className="question">
              <div>
                {
                  index === questions.length - 1 && <h1>LAST QUESTION</h1>
                }
                <h1 className="question-header">Question No. {index + 1}</h1>
                <div dangerouslySetInnerHTML={{ __html: `<strong>Question: </strong>${questions[index].question}` }}></div>
                <div className="answer">
                  <strong> Correct Answer: </strong>
                  {questions[index].correct_answer}
                </div>
              </div>
              <button
                className="btn btn-dark grid-button"
                disabled={index === questions.length - 1}
                onClick={() => this.setState({ index: this.state.index + 1 })}
              >
              Next Question
            </button>
          </div>
        }
          <br />
        { 
          teams.length &&
            <TeamsList teams={teams} game={true} />
        }
      </div>
    );
  }
}
