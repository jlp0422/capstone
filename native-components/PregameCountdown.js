/* eslint-disable */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class PregameCountdown extends React.Component {
  // static navigationOptions = {
  //   title: 'Pregame'
  // }
  constructor() {
    super()
    this.state = {
      hours: '',
      minutes: '',
      seconds: ''
    }
    this.timer = this.timer.bind(this)
  }

  componentDidMount() {
    this.timer()
  }

  timer() {
    const now = new Date().getTime()
    const gameStart = new Date('May 23, 2018 22:24:00').getTime()
    const t = gameStart - now
    const days = Math.floor((t / (1000 * 60 * 60 * 24)))
    const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((t % (1000 * 60)) / 1000)
    setTimeout(() => {
      this.setState({ hours, minutes, seconds })
      this.timer()
    }, 1000);
  }
  render() {
    const { hours, minutes, seconds } = this.state
    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>Game starts in {hours * 1 > 9 ? hours : `0${hours}`}:
          {minutes * 1 > 9 ? minutes : `0${minutes}`}:
          {seconds * 1 > 9 ? seconds : `0${seconds}`}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 100,
  }
})

export default PregameCountdown;
