/* eslint-disable */
import React, { Component } from 'react';
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
      finalScores: []
    }
    this.onNextQuestion = this.onNextQuestion.bind(this)
    this.onRestartGame = this.onRestartGame.bind(this)
    this.onNewGame = this.onNewGame.bind(this)
  }

  componentDidMount() {
    this.onNewGame()
  }

  onNewGame() {
    const index = localStorage.getItem('index') * 1
    axios.get('/v1/games/active')
      .then(res => res.data)
      .then(game => {
        axios
          .get(`/v1/games/${game.id}/teams`)
          .then(res => res.data)
          .then(teams => this.setState({ teams }));
        axios
          .get(`/v1/games/${game.id}/questions`)
          .then(res => res.data)
          .then(questions => this.setState({ questions }));
      })
      .then(game => {

        const { bar } = this.props
        setTimeout(() => socket.emit('send question', { index, question: this.state.questions[index], bar }), 100)
        socket.on('answer submitted', (info) => {
          const question = this.state.questions[index];
          if (info.answer === question.correct_answer) {
            axios.put(`/v1/games/${game.id}/question`, question)
          }
          const { answers } = this.state
          this.setState({ answers: [...answers, info] })
        })
        socket.on('game started', (teams) => this.setState({ questionTimer: 10, teams }))
        socket.on('ready for next question', () => this.onNextQuestion())
        socket.on('question timer', (questionTimer) => this.setState({ questionTimer }))
        socket.on('wait timer', (waitTimer) => this.setState({ waitTimer }))
        socket.on('game has ended', (scores) => {
          // this.setState({ finalScores: scores })
          console.log('final scores: ', scores)
        })
      });
      this.setState({ index, questionActive: true });
  }

  componentWillUnmount() {
    localStorage.setItem('index', this.state.index)
    socket.off('question timer')
    socket.off('wait timer')
    // socket.off('game started')
    socket.off('ready for next question')
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
    const { bar } = this.props
    localStorage.setItem('index', index)
    if (index > 9) {
      this.setState({ index })
      socket.emit('game over', bar)
    }
    else {
      this.setState({ index })
      socket.emit('send question', { index: index * 1, question: this.state.questions[index], bar })
    }
  }

  onRestartGame() {
    const { bar } = this.props
    this.setState({ index: 0 })
    localStorage.setItem('index', 0)
    socket.emit('new game', bar)
    this.onNewGame()
  }

  render() {
    const { teams, questions, answers, finalScores } = this.state;
    const { onRestartGame } = this;
    const index = localStorage.getItem('index') * 1
    return (
      <div id="game">
        { questions.length && (
          <div>
            { index < 10 ? (
              <div>
                {index === questions.length - 1 && <h1>Last Question!</h1>}

                <div className="question">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<strong>Question: </strong>${
                        questions[index].question
                      }`
                    }}
                  />
                </div>
                <div className="answer">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<strong>Correct Answer: </strong>${
                        questions[index].correct_answer
                      }`
                    }}
                  />
                </div>
              </div>
            ) : (
              <h1>Game over</h1>
            )}

          </div>
        )}
        { teams.length && (
          <div>
            { index === questions.length && (
              <button
                className="btn btn-dark game-button"
                disabled={index !== questions.length}
                onClick={onRestartGame}>
                  Restart Game
              </button>
            )}
          </div>
        )}
        { index > 9 && <h3>Final Scores</h3> }
        { teams.length && (
          <TeamsList scores={ finalScores } answers={answers} />
        )}
      </div>
    );
  }
}
