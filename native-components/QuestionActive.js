/* eslint-disable */
import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

class QuestionActive extends React.Component {
  constructor() {
    super()
    this.state = {
      answer: '',
      timer: 5
    }
    this.timer = this.timer.bind(this)
  }

  componentDidMount() {
    this.timer()
  }

  timer() {
    let { timer } = this.state
    if (timer) {
      this.setState({ timer: timer - 1})
      setTimeout(() => this.timer(), 1000)
    }
    else {
      this.props.navigation.navigate('QuestionOver')
    }
  }

  render() {
    const { timer, answer } = this.state
    return (
      <View style={ styles.container }>
        <View style={ styles.topRow }>
          <Text>Top Score: XX</Text>
          <Text>Your Score: XX</Text>
        </View>
        <View style={ styles.questionInfo }>
          <Text style={ [ styles.centerText, styles.questionHeader ]}>Question X</Text>
          <Text style={ [ styles.centerText, styles.timer, { color: timer < 10 ? 'red' : 'black' } ]}>:{ timer > 9 ? timer : `0${timer}` }</Text>
          <Text style={ [ styles.centerText, styles.questionText ]}>This is the first question of the game. Choose wisely!</Text>
        </View>
        <View style={ styles.answers }>
          <Button disabled={ !timer || !!answer } title="Answer 1" onPress={() => this.setState({ answer: '1'})} />
          <Button disabled={ !timer || !!answer } title="Answer 2" onPress={() => this.setState({ answer: '2'})} />
          <Button disabled={ !timer || !!answer } title="Answer 3" onPress={() => this.setState({ answer: '3'})} />
          <Button disabled={ !timer || !!answer } title="Answer 4" onPress={() => this.setState({ answer: '4'})} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // // alignItems: 'center'
    // justifyContent: 'center'
  },
  topRow: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  questionInfo: {
    flex: 2,
    alignItems: 'center',
    padding: 20
  },
  questionHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10
  },
  timer: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10
  },
  questionText: {
    fontSize: 16,
    padding: 10
  },
  answers: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column'

  },
  centerText: {
    textAlign: 'center'
  }
})

export default QuestionActive;
