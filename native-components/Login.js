/* eslint-disable */
import React from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';
import socket from '../socket-client';
window.navigator.userAgent = "react-native";

class Login extends React.Component {
  constructor() {
    super()
    this.onLogin = this.onLogin.bind(this)
  }

  onLogin(site) {
    console.log(`login component: login with ${site}`)
    if (site === 'google') {
      axios.get(`/auth/${site}`)
        .then(res => console.log(res.data))
    }
    // re-direct user to login with google
    // setting email and google id in the database
    // send back user id who is logging in
    // store user id in async storage
    AsyncStorage.setItem('user', `jeremy ${site}`)
    socket.emit('login', site)
    this.props.navigation.navigate('ChooseBar')
  }

  render() {
    const { onLogin } = this
    return (
      <View style={ styles.container }>
        <Text style={ styles.h1 }>Login to play</Text>
        <Button onPress={() => onLogin('google') } title="Login with Google" />
        <Button onPress={() => onLogin('facebook') } title="Login with Facebook" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center'
  }
})

export default Login;
