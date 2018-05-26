/* eslint-disable */
import React from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

class QuestionOver extends React.Component {
  constructor() {
    super()
    this.state = {
      timer: 10,
      score: 0
    }
    this.countdown = this.countdown.bind(this)
  }

  componentDidMount() {
    this.setState({ timer: 10 })
    this.countdown()
    Promise.all([ AsyncStorage.getItem('score') ])
      .then(([ score ]) => this.setState({ score }))
  }

  countdown() {
    let { timer } = this.state
    if (timer) {
      this.setState({ timer: timer - 1 })
      setTimeout(() => this.countdown(), 1000)
    }
    else {
      this.props.navigation.push('QuestionWaiting')
    }
  }
  render() {
    const { timer, score } = this.state
    const { answer, question } = this.props.navigation.state.params
    return (
      <View style={ styles.container }>
        <Text style={[ styles.centerText, styles.h1 ]}>Question X</Text>
        <Text style={[ styles.centerText, styles.copy ]}>{ question.question }</Text>
        <Text style={[ styles.centerText, styles.h2 ]}>Correct Answer:</Text>
        <Text style={[ styles.centerText, styles.copy ]}>{ question.correct_answer }</Text>
        <Text style={[ styles.centerText, styles.h2 ]}>Your Answer:</Text>
        <Text style={[ styles.centerText, styles.copy ]}>{ answer || 'No answer selected' }</Text>
        <Text style={[ styles.centerText, styles.h2, styles.final ]}>Your Score: {score}</Text>
        <Text style={[ styles.centerText, styles.timer ]}>:{ timer > 9 ? timer : `0${timer}` }</Text>

        {/*<Button title="Next Question" onPress={() => console.log('next')} />*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 10,
    paddingTop: 80,
  },
  centerText: {
    textAlign: 'center'
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  h2: {
    fontSize: 22,
    paddingTop: 25
  },
  timer: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  copy: {
    fontSize: 18,
    paddingTop: 5
  },
  final: {
    paddingBottom: 40
  }
})

export default QuestionOver
