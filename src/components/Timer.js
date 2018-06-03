/* eslint-disable */
import React from 'react';

class Timer extends React.Component {
  constructor() {
    super()
    this.state = {
      questionTimer: 10,
      questionTimerFunc: {},
      waitTimer: 10,
      waitTimerFunc: {},
      isQuestionActive: true,
      isPaused: false
    }
    this.onQuestionCountdown = this.onQuestionCountdown.bind(this)
    this.onWaitCountdown = this.onWaitCountdown.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onResume = this.onResume.bind(this)
  }

  componentDidMount() {
    this.onQuestionCountdown()
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
    if (questionTimer) {
      this.setState({
        questionTimer: questionTimer - 1,
        questionTimerFunc: setTimeout(() => this.onQuestionCountdown(), 1000)
      })
    }
    else {
      this.onWaitCountdown()
      this.setState({ questionTimer: 10, isQuestionActive: false })
    }
  }

  onWaitCountdown() {
    let { waitTimerFunc, waitTimer } = this.state
    if (waitTimer) {
      this.setState({
        waitTimer: waitTimer - 1,
        waitTimerFunc: setTimeout(() => this.onWaitCountdown(), 1000)
      })
    }
    else {
      this.onQuestionCountdown()
      this.setState({ waitTimer: 10, isQuestionActive: true })
    }
  }

  render() {
    const { questionTimer, waitTimer, isQuestionActive, isPaused } = this.state
    const { onPause, onResume } = this
    return (
      <div>
        <h4>Question timer: { questionTimer }</h4>
        <h4>Wait timer: { waitTimer }</h4>
        <button disabled={ isPaused } onClick={() => onPause( isQuestionActive ? 'question' : 'wait' )} >Pause</button>
        <button disabled={ !isPaused } onClick={() => onResume( isQuestionActive ? 'question' : 'wait' ) }>Resume</button>
      </div>
    )
  }
}

export default Timer;
