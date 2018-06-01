/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TeamsList from './TeamsList';
import socket from '../../socket-client';

export default class CurrentGame extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      teams: [],
      index: 0
    }
    this.onNextQuestion = this.onNextQuestion.bind(this)
  }

  componentDidMount() {
    axios
      .get('/v1/api')
      .then(res => res.data.results)
      .then(questions => this.setState({ questions }));
    axios
      .get('/v1/games/active')
      .then(res => res.data)
      .then(game => {
        axios
          .get(`/v1/games/${game.id}/teams`)
          .then(res => res.data)
          .then(teams => this.setState({ teams }));
      })
      .then(() => {
        socket.on('question requested', () => {
          socket.emit('send question', { index: this.state.index, question: this.state.questions[this.state.index] })
        })
      });
  }

  onNextQuestion() {
    const { index } = this.state
    this.setState({ index: index + 1 })
    socket.emit('send question', { index, question: this.state.questions[index] })
  }

  render() {
    const { teams, questions, index } = this.state;
    const { changeState, onNextQuestion } = this;
    return (
      <div>
        {
          questions.length ? (
            <div className="question">
              <div>
                { index === questions.length - 1 && <h1>LAST QUESTION</h1> }
                <h2 className="question-header">Question No.{index + 1}</h2>

                <div dangerouslySetInnerHTML={{ __html: `<strong>Question: </strong>${questions[index].question}` }}></div>

                <div className="answer">
                  <strong> Correct Answer: </strong>
                  {questions[index].correct_answer}
                </div>

              </div>
              <button
                className="btn btn-dark grid-button"
                disabled={index === questions.length - 1}
                onClick={ onNextQuestion }
              >
              Next Question
            </button>
          </div>
          ) : null}
        {
          teams.length ?
            <TeamsList teams={teams} game={true} />
          : null
        }
      </div>
    );
  }
}
