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
      index: 0,
    }
    this.onQuestionCountdown = this.onQuestionCountdown.bind(this)
    this.onWaitCountdown = this.onWaitCountdown.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onResume = this.onResume.bind(this)
    this.onStartTimer = this.onStartTimer.bind(this)
  }

  componentDidMount() {
    console.log('mounted')
    const { questionTimerFunc, waitTimerFunc } = this.state
    const index = localStorage.getItem('index') * 1
    const waitTimer = localStorage.getItem('waitTimer')
    const questionTimer = localStorage.getItem('questionTimer')
    const isActive = localStorage.getItem('questionActive')
    this.setState({
      waitTimer: waitTimer ? waitTimer * 1 : 10,
      questionTimer: questionTimer ? questionTimer * 1 : 10,
      index,
      isPaused: true,
      isQuestionActive: isActive === 'yes' ? true : false
    })
    socket.on('game started', () => {
      console.log('****** GAME HAS STARTED *******')
      this.setState({
        waitTimer: waitTimer ? waitTimer * 1 : 10,
        questionTimer: questionTimer ? questionTimer * 1 : 10,
        isPaused: false,
        isQuestionActive: true
      })
      this.onStartTimer()
    })
    socket.on('new game has started', () => this.setState({ index: 0 }))
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
    const { waitTimerFunc, questionTimerFunc, questionTimer, waitTimer } = this.state
    if (timer === 'question') {
      localStorage.setItem('questionTimer', questionTimer)
      clearTimeout(questionTimerFunc)
    }
    if (timer === 'wait') {
      localStorage.setItem('waitTimer', waitTimer)
      clearTimeout(waitTimerFunc)
    }
    this.setState({ isPaused: true })
  }

  onResume(timer) {
    if (timer === 'question') {
      localStorage.setItem('questionTimer', 10)
      this.onQuestionCountdown()
    }
    if (timer === 'wait') {
      localStorage.setItem('waitTimer', 10)
      this.onWaitCountdown()
    }
    this.setState({ isPaused: false })
  }

  onQuestionCountdown() {
    const { bar } = this.props
    let { questionTimer } = this.state
    if ((localStorage.getItem('index') * 1) < 10) {
      console.log(questionTimer)
      if (questionTimer) {
        this.setState({
          questionTimer: questionTimer - 1,
          questionTimerFunc: setTimeout(() => this.onQuestionCountdown(), 1000)
        })
        socket.emit('question countdown', { bar, timer: this.state.questionTimer })
      }
      else {
        socket.emit('question over', bar)
        this.onWaitCountdown()
        this.setState({ questionTimer: 10, isQuestionActive: false })
        localStorage.setItem('questionActive', 'no')
      }
    }
  }

  onWaitCountdown() {
    const { bar } = this.props
    let { waitTimer } = this.state
    if (waitTimer) {
      this.setState({
        waitTimer: waitTimer - 1,
        waitTimerFunc: setTimeout(() => this.onWaitCountdown(), 1000)
      })
      socket.emit('wait countdown', { bar, timer: this.state.waitTimer })
    }
    else {
      const index = localStorage.getItem('index') * 1
      this.setState({ waitTimer: 10, isQuestionActive: true })
      localStorage.setItem('index', (index * 1) + 1 )
      if (index < 10) {
        localStorage.setItem('questionActive', 'yes')
        this.onQuestionCountdown()
        socket.emit('get next question', { bar, index })
      }
      this.setState({ index })
    }
  }

  render() {
    const { questionTimer, waitTimer, isQuestionActive, isPaused } = this.state
    const { onPause, onResume } = this;
    console.log(this.state)
    const index = localStorage.getItem('index')
    if (!index || (index * 1) > 9) return null
      return (
        <div id='timer' className={ isQuestionActive ? questionTimer > 3 ? 'good' : questionTimer === 0 ? 'warning' : 'warning-animate' : 'wait' }>
          <div className='banner-question'>Question { (index * 1) + 1 }</div>
            {
              isQuestionActive ? (
                <div className='question-time'>00:{ questionTimer < 10 ? `0${questionTimer}` : questionTimer }</div>
              ) : (
                <div className='wait-time'>{index < 9 ? ('Next question in... :') : ('Last question... :') }{ waitTimer < 10 ? `0${waitTimer}` : waitTimer }</div>
              )
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
