/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TeamsList from './TeamsList';
import socket from '../../socket-client';

export default class CurrentGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      teams: [],
      index: 0,
      timer: 11,
      countdownTimer: {},
      answers: []
    }
    this.onNextQuestion = this.onNextQuestion.bind(this)
    this.countdown = this.countdown.bind(this)
  }

  componentDidMount() {
    const index = localStorage.getItem('index')*1
    axios.get('/v1/games/active')
      .then(res => res.data)
      .then(game => {
        axios.get(`/v1/games/${game.id}/teams`)
          .then(res => res.data)
          .then(teams => this.setState({ teams }));
        axios.get(`/v1/games/${game.id}/questions`)
          .then(res => res.data)
          .then(questions => this.setState({ questions }));
      })
      .then(() => {
        const { timer, index } = this.state
        socket.on('question requested', () => {
          socket.emit('send question', { timer, index, question: this.state.questions[this.state.index] })
        })
        socket.on('answer submitted', (info) => {
          const { answers } = this.state
          this.setState({ answers: [...answers, info ]})
        })
      });
    this.countdown()
    this.setState({ index })
  }

  componentWillUnmount() {
    clearTimeout(this.state.countdownTimer)
    localStorage.setItem('index', this.state.index)
  }

  countdown() {
    let { timer, question, answer, countdownTimer } = this.state
    if (timer) this.setState({ timer: timer - 1, countdownTimer: setTimeout(() => this.countdown(), 1000) })
    else {
      this.onNextQuestion()
      this.countdown()
    }
  }

  onNextQuestion() {
    while (index < 10){
      console.log('BEFORE STATE CHANGE: ', this.state.index)
      this.setState({ index: this.state.index + 1, timer: 10, answers: [] })
      console.log('AFTER STATE CHANGE: ', this.state.index)
      const { index, timer } = this.state
      localStorage.setItem('index', this.state.index)
      socket.emit('send question', { timer, index: index*1, question: this.state.questions[index] })
    }
  }

  render() {
    const { teams, questions, timer, answers } = this.state;
    const { changeState, onNextQuestion } = this;
    const index = localStorage.getItem('index')*1
    return (
      <div>
        {
          questions.length && (
            <div className="question">
              <div>
                { index === questions.length - 1 && <h1>LAST QUESTION</h1> }
                <h2 className="question-header">Question No.{index + 1}</h2>
                <h3 className="timer">:{timer > 9 ? timer : `0${timer}`}</h3>
                <div dangerouslySetInnerHTML={{ __html: `<strong>Question: </strong>${questions[index].question}` }}></div>
                <div className="answer">
                  <div dangerouslySetInnerHTML={{ __html: `<strong> Correct Answer: </strong>${questions[index].correct_answer}` }}></div>
                </div>
              </div>
            </div>
            )
        }
        {
          teams.length &&
          <div>
              {
                index === questions.length - 1 ?
                  <button
                    className="btn btn-dark grid-button"
                    disabled={index !== questions.length - 1}
                    onClick={() => {
                      this.setState({ index: 0 })
                      localStorage.setItem('index', 0)
                    }}
                  >
                    Restart Game
                  </button>
                :
                  <button
                    className="btn btn-dark grid-button"
                    disabled={index === questions.length - 1}
                    onClick={() => {
                      this.setState({ index: this.state.index + 1 })
                      localStorage.setItem('index', this.state.index + 1)
                    }}
                  >
                    Next Question
                  </button>
              }
          </div>
        }
          <br />
        { teams.length && <TeamsList answers={answers} game={true} /> }
        {/* answers has team name and answers
            <h3>Team Answers</h3>
            <ul>
            {
              answers.map(answer => (
                <li key={answer.team}>Team {answer.team}: {answer.answer}</li>
              ))
            }
            </ul>
        */}
      </div>
    );
  }
}
