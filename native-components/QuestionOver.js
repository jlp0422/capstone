/* eslint-disable */
import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

class QuestionOver extends React.Component {
  constructor() {
    super()
    this.state = {
      timer: 10
    }
    this.countdown = this.countdown.bind(this)
  }

  componentDidMount() {
    this.setState({ timer: 10 })
    this.countdown()
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
    const { timer } = this.state
    return (
      <View>
        <Text style={[ styles.centerText, styles.h1 ]}>Question X</Text>
        <Text style={[ styles.centerText, styles.copy ]}>Question X Text</Text>
        <Text style={[ styles.centerText, styles.h2 ]}>Correct Answer:</Text>
        <Text style={[ styles.centerText, styles.copy ]}>Answer A</Text>
        <Text style={[ styles.centerText, styles.h2 ]}>Your Answer:</Text>
        <Text style={[ styles.centerText, styles.copy ]}>Answer B</Text>
        <Text style={[ styles.centerText, styles.h2, styles.final ]}>Your Score: X</Text>
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
    justifyContent: 'center'
  },
  centerText: {
    textAlign: 'center'
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 30,
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
    fontSize: 16,
    paddingTop: 5
  },
  final: {
    paddingBottom: 40
  }
})

export default QuestionOver
