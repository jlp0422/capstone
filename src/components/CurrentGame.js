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
      questionTimer: 10,
      waitTimer: 10,
      answers: [],
      questionActive: false,
    }
    this.onNextQuestion = this.onNextQuestion.bind(this)
    this.onRestartGame = this.onRestartGame.bind(this)
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
        // const { index } = this.state
        setTimeout(() => socket.emit('send question', { index, question: this.state.questions[index] }), 100)
        socket.on('answer submitted', (info) => {
          const { answers } = this.state
          this.setState({ answers: [...answers, info ]})
        })
        socket.on('game started', () => this.setState({ questionTimer: 10 }))
        socket.on('ready for next question', () => this.onNextQuestion())
        socket.on('question timer', (questionTimer) => this.setState({ questionTimer }))
        socket.on('wait timer', (waitTimer) => this.setState({ waitTimer }))
      });
    this.setState({ questionActive: true, index })
  }

  componentWillUnmount() {
    localStorage.setItem('index', this.state.index)
    socket.off('question timer')
    socket.off('wait timer')
  }

  onNextQuestion() {
    this.setState({
      index: this.state.index + 1,
      questionTimer: 10,
      waitTimer: 10,
      answers: [],
      questionActive: true,
    })
    const { index } = this.state
    localStorage.setItem('index', index)
    if (index > 9) socket.emit('game over')
    else socket.emit('send question', {index: index * 1, question: this.state.questions[index]})
  }

  onRestartGame() {
    this.setState({ index: 0 })
    localStorage.setItem('index', 0)
  }

  render() {
    const { teams, questions, questionTimer, answers, questionActive, waitTimer } = this.state;
    const { changeState, onNextQuestion, onRestartGame } = this;
    const index = localStorage.getItem('index') * 1
    return (
      <div id='game'>
        { questions.length &&
          <div className="question">
          { index < 10 ?
            ( <div>
                { index === questions.length - 1 && <h1>LAST QUESTION</h1> }
                <h2 className="question-header">Question #{index + 1}</h2>
                <h3 className="timer">00:{questionTimer > 9 ? questionTimer : `0${questionTimer}`}</h3>
                <div dangerouslySetInnerHTML={{ __html: `<strong>Question: </strong>${questions[index].question}` }}></div>
                <div className="answer">
                  <div dangerouslySetInnerHTML={{ __html: `<strong> Correct Answer: </strong>${questions[index].correct_answer}` }}></div>
                </div>
              </div>
            ) : (
              <h1>Game over</h1>
            )
          }
          </div>
        }
        { teams.length &&
            <div>
                { index === questions.length ?
                  ( <button
                    className="btn btn-dark game-button"
                    disabled={index !== questions.length}
                    onClick={ onRestartGame }>
                    Restart Game
                    </button>
                  ) : (
                    <div>
                    {/* questionActive && */}
                    <h4 style={{ paddingTop: '20px' }}>
                      Next Question starting in: 00:{waitTimer > 9 ? waitTimer : `0${waitTimer}`}
                    </h4>
                      {/*<button
                        className="btn btn-dark game-button"
                        disabled={index === questions.length - 1}
                        onClick={() => {
                          this.setState({ index: this.state.index + 1 })
                          localStorage.setItem('index', this.state.index + 1)
                        }}
                      >
                        Next Question
                      </button>*/}
                    </div>
                  )
                }
            </div>
          }
        { teams.length && <TeamsList answers={ answers } game={questionTimer ? true : false} />}
      </div>
    );
  }
}
