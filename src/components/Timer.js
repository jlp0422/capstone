/* eslint-disable */
import React from 'react';
import socket from '../../socket-client';

class Timer extends React.Component {
  constructor() {
    super()
    this.state = {
      questionTimer: 10,
      questionTimerFunc: {},
      waitTimer: 10,
      waitTimerFunc: {},
      isQuestionActive: true,
      isPaused: false,
      index: 0
    }
    this.onQuestionCountdown = this.onQuestionCountdown.bind(this)
    this.onWaitCountdown = this.onWaitCountdown.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onResume = this.onResume.bind(this)
    this.onStartTimer = this.onStartTimer.bind(this)
  }

  componentDidMount() {
    const { questionTimerFunc, waitTimerFunc } = this.state
    const index = localStorage.getItem('index') * 1
    this.setState({ index })
    socket.on('game started', () => this.onStartTimer())
    socket.on('game has ended', () => {
      clearTimeout(questionTimerFunc)
      clearTimeout(waitTimerFunc)
    })
  }

  onStartTimer() {
    this.onQuestionCountdown()
  }

  componentWillUnmount() {
    const { questionTimerFunc, waitTimerFunc } = this.state
    clearTimeout(questionTimerFunc)
    clearTimeout(waitTimerFunc)
  }

  onPause(timer) {
    const { waitTimerFunc, questionTimerFunc } = this.state
    if (timer === 'question') clearTimeout(questionTimerFunc)
    if (timer === 'wait') clearTimeout(waitTimerFunc)
    this.setState({ isPaused: true })
  }

  onResume(timer) {
    if (timer === 'question') this.onQuestionCountdown()
    if (timer === 'wait') this.onWaitCountdown()
    this.setState({ isPaused: false })
  }

  onQuestionCountdown() {
    let { questionTimerFunc, questionTimer } = this.state
    if (localStorage.getItem('index') < 10) {
      if (questionTimer) {
        this.setState({
          questionTimer: questionTimer - 1,
          questionTimerFunc: setTimeout(() => this.onQuestionCountdown(), 1000)
        })
        socket.emit('question countdown', this.state.questionTimer)
      }
      else {
          socket.emit('question over')
          this.onWaitCountdown()
          this.setState({ questionTimer: 10, isQuestionActive: false })
      }
    }
  }

  onWaitCountdown() {
    let { waitTimerFunc, waitTimer } = this.state
    if (waitTimer) {
      this.setState({
        waitTimer: waitTimer - 1,
        waitTimerFunc: setTimeout(() => this.onWaitCountdown(), 1000)
      })
      socket.emit('wait countdown', this.state.waitTimer)
    }
    else {
      const index = localStorage.getItem('index')
      if (index < 10) {
        this.onQuestionCountdown()
        socket.emit('get next question')
      }
      this.setState({ waitTimer: 10, isQuestionActive: true })
    }
  }

  render() {
    const { questionTimer, waitTimer, isQuestionActive, isPaused } = this.state
    const { onPause, onResume } = this;
    const index = localStorage.getItem('index') * 1
    if(index > 9) return null
      return (
        <div id='timer' className={ isQuestionActive ? questionTimer > 3 ? 'good' : questionTimer === 0 ? 'warning' : 'warning-animate' : 'wait' }>
          <div className='banner-question'>Question { index + 1 }</div>
            {
              isQuestionActive ?
              <div className='question-time'>00:{ questionTimer < 10 ? `0${questionTimer}` : questionTimer }</div>
            :
              <div className='wait-time'>Next question in... { waitTimer < 10 ? `0${waitTimer}` : waitTimer }</div>
            }
          <div className='timer-buttons'>
            <button
              className='btn btn-dark mr-1'
              disabled={ isPaused }
              onClick={() => onPause( isQuestionActive ? 'question' : 'wait' )}>
              Pause
            </button>
            <button
              className='btn btn-dark'
              disabled={ !isPaused }
              onClick={() => onResume( isQuestionActive ? 'question' : 'wait' ) }>
              Resume
            </button>
          </div>
        </div>
      )
  }
}

export default Timer;