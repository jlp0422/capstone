/* eslint-disable */
import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';;

class PregameCountdown extends React.Component {
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
    Promise.all([
      AsyncStorage.getItem('name'),
      AsyncStorage.getItem('bar_id'),
      AsyncStorage.getItem('team_name'),
      AsyncStorage.removeItem('score')
    ])
    .then(([ name, bar, team ]) => {
      console.log('STORAGE', '\n', 'name: ', name, '\n', 'bar: ', bar, '\n', 'team: ', team)
    })
    // const name = await AsyncStorage.getItem('name')
    // const bar = await AsyncStorage.getItem('bar_id')
    // const team = await AsyncStorage.getItem('team_name')
    // console.log('STORAGE', name, bar, team)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  timer() {
    const now = new Date().getTime()
    const gameStart = new Date('June 21, 2018 18:40:00').getTime()
    const t = gameStart - now
    const days = Math.floor((t / (1000 * 60 * 60 * 24)))
    const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((t % (1000 * 60)) / 1000)
    this.setState({ hours, minutes, seconds })
    setTimeout(() => this.timer(), 1000);
  }

  render() {
    const { hours, minutes, seconds } = this.state
    const { name } = this.props.navigation.state.params
    const noGame = hours * 1 > 0 || minutes * 1 > 5
    return (
      <View style={ styles.container }>
        <Text style={ styles.h1 }>Team: { name }</Text>
        <Text style={ styles.h2 }>Game starts in {hours * 1 > 9 ? hours : `0${hours}`}:
          {minutes * 1 > 9 ? minutes : `0${minutes}`}:
          {seconds * 1 > 9 ? seconds : `0${seconds}`}
        </Text>
        <Button title="Start game!" onPress={() => this.props.navigation.navigate('QuestionActive')} />
        <Text style={ styles.buttonCopy }>Start game button is available within 5 minutes of the next game starting.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 80,
    paddingBottom: 20
  },
  h2: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 40
  },
  buttonCopy: {
    fontSize: 12,
    padding: 30,
    textAlign: 'center'
  }
})

export default PregameCountdown;
