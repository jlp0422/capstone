/* eslint-disable */
import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

class TeamName extends React.Component {
  static navigationOptions = {
    title: 'Choose Team Name'
  }
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    console.log(`let's play`)
    this.props.navigation.navigate('PregameCountdown', { name: this.state.name })
  }

  render() {
    const { name } = this.state
    const { onSubmit } = this
    return (
      <View style={ styles.container }>
        <Text style={ styles.headline }>Enter your team name</Text>
        <View style={ styles.inputContainer }>
          <TextInput
            onChangeText={text => this.setState({ name: text })}
            style={ styles.input }
            autoFocus
            value={ name }
            placeholder="Team name"
            maxLength={ 25}
          />
        </View>
        <Button title="Submit" onPress={ onSubmit } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  headline: {
    fontSize: 30,
    paddingTop: 50,
    paddingBottom: 50
  },
  input: {
    fontSize: 20,
  },
  inputContainer: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5
  }
})

export default TeamName
