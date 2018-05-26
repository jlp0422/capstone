/* eslint-disable */
import React from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

class QuestionActive extends React.Component {
  constructor() {
    super()
    this.state = {
      answer: '',
      timer: 5,
      question: {},
      questionNumber: 0,
      score: 0
    }
    this.countdown = this.countdown.bind(this)
    this.onChooseAnswer = this.onChooseAnswer.bind(this)
  }

  componentDidMount() {
    const { questionNumber } = this.state
    this.setState({ timer: 5, questionNumber: questionNumber + 1 })
    // this.countdown()
    axios.get('http://localhost:3000/v1/api/')
      .then( res => res.data)
      .then( question => this.setState({ question: question.results[0] }))
    Promise.all([ AsyncStorage.getItem('score') ])
      .then(([ score ]) => this.setState({ score }))
  }

  countdown() {
    let { timer, question, answer } = this.state
    if (timer) {
      this.setState({ timer: timer - 1 })
      setTimeout(() => this.countdown(), 1000)
    }
    else {
      this.props.navigation.push('QuestionOver', { question, answer })
    }
  }

  onChooseAnswer(answer) {
    this.setState({ answer })
    console.log('answer: ', answer)
  }

  render() {
    const { timer, answer, question, questionNumber, score } = this.state
    const { onChooseAnswer } = this
    if (!question.type) return null
    return (
      <View style={ styles.container }>
        <View style={ styles.topRow }>
          <Text>Top Score: XX</Text>
          <Text>Your Score: {score ? score : 0}</Text>
        </View>
        <View style={ styles.questionInfo }>
          <Text style={ [ styles.centerText, styles.questionHeader ]}>Question {questionNumber}</Text>
          <Text style={ [ styles.centerText, styles.timer, { color: timer < 10 ? 'red' : 'black' } ]}>:{ timer > 9 ? timer : `0${timer}` }</Text>
          <Text style={ [ styles.centerText, styles.questionText ]}>{ question.question }</Text>
        </View>
        <View style={ styles.answers }>
          <Button disabled={!timer || !!answer} title={`${question.correct_answer}`} onPress={() => onChooseAnswer(question.correct_answer)} />
          {
            question.incorrect_answers.map( (a, idx) => (
              <Button key={idx} disabled={ !timer || !!answer } title={`${a}`} onPress={() => onChooseAnswer(a)} />

            ))
          }
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
    padding: 20,
    paddingTop: 10
  },
  questionHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10
  },
  timer: {
    fontSize: 35,
    fontWeight: 'bold',
    padding: 10
  },
  questionText: {
    fontSize: 18,
    padding: 10
  },
  answers: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    padding: 10,
  },
  centerText: {
    textAlign: 'center'
  }
})

export default QuestionActive;
