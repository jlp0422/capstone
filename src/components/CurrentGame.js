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
      countdownTimerFunc: {},
      answers: [],
      questionActive: false,
      waitTimer: 10,
      waitTimerFunc: {}
    }
    this.onNextQuestion = this.onNextQuestion.bind(this)
    this.countdown = this.countdown.bind(this)
    this.waitCountdown = this.waitCountdown.bind(this)
  }

  componentDidMount() {
    const index = localStorage.getItem('index') * 1
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
    this.setState({ questionActive: true })
    // this.countdown()
    this.setState({ index })
  }

  componentWillUnmount() {
    clearTimeout(this.state.countdownTimerFunc)
    localStorage.setItem('index', this.state.index)
  }

  waitCountdown() {
    let { waitTimer } = this.state
    if (waitTimer) {
      this.setState({ waitTimer: waitTimer - 1, waitTimerFunc: setTimeout(() => this.waitCountdown(), 1000) })
    }
    else {
      socket.emit('get next question')
      this.onNextQuestion()
      this.countdown()
    }
  }

  countdown() {
    let { timer, question, answer, countdownTimerFunc, index } = this.state
    if (timer) {
      this.setState({ timer: timer - 1, countdownTimerFunc: setTimeout(() => this.countdown(), 1000) })
    }
    else {
      if (index < 9) {
        socket.emit('question over')
        this.setState({ questionActive: false })
        this.waitCountdown()
      }
      else {
        this.setState({})
      }
    }
  }

  onNextQuestion() {
    // console.log('BEFORE STATE CHANGE: ', this.state.index)
    this.setState({
      index: this.state.index + 1,
      timer: 10,
      answers: [],
      questionActive: true,
      waitTimer: 10
    })
    // console.log('AFTER STATE CHANGE: ', this.state.index)
    const { index, timer } = this.state
    localStorage.setItem('index', this.state.index)
    socket.emit('send question', { timer, index: index*1, question: this.state.questions[index] })
  }

  render() {
    const { teams, questions, timer, answers, questionActive, waitTimer } = this.state;
    const { changeState, onNextQuestion } = this;
    const index = localStorage.getItem('index')*1
    return (
      <div id='game'>
        {
          questions.length ?
          <div className="question">
          { index < 9 || timer ?
              <div>
                { index === questions.length - 1 && <h1>LAST QUESTION</h1> }
                <h2 className="question-header">Question No.{index + 1}</h2>
                <h3 className="timer">00:{timer > 9 ? timer : `0${timer}`}</h3>
                <div dangerouslySetInnerHTML={{ __html: `<strong>Question: </strong>${questions[index].question}` }}></div>
                <div className="answer">
                  <div dangerouslySetInnerHTML={{ __html: `<strong> Correct Answer: </strong>${questions[index].correct_answer}` }}></div>
                </div>
              </div>
            :
            <h1> GAME OVER </h1>
          }
          </div>
          : null
        }
        {
          teams.length ?
            <div>
                {
                  index === questions.length - 1 ?
                    <button
                      className="btn btn-dark game-button"
                      disabled={index !== questions.length - 1}
                      onClick={() => {
                        this.setState({ index: 0 })
                        localStorage.setItem('index', 0)
                      }}
                    >
                      Restart Game
                    </button>
                  :
                    <div>
                    {/* questionActive && */}
                    <h4 style={{ paddingTop: '20px' }}>Next Question starting in: 00:{waitTimer > 9 ? waitTimer : `0${waitTimer}`}</h4>
                      <button
                        className="btn btn-dark game-button"
                        disabled={index === questions.length - 1}
                        onClick={() => {
                          this.setState({ index: this.state.index + 1 })
                          localStorage.setItem('index', this.state.index + 1)
                        }}
                      >
                        Next Question
                      </button>
                    </div>
                }
            </div>
          : null
        }
          <br />
        { teams.length ? <TeamsList answers={ answers } game={timer ? true : false} /> : null }
      </div>
    );
  }
}
