/* eslint-disable */
import React from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';
import socket from '../socket'
window.navigator.userAgent = "react-native";

class Login extends React.Component {
  constructor() {
    super()
    this.onFacebook = this.onFacebook.bind(this)
    this.onGoogle = this.onGoogle.bind(this)
  }

  onGoogle() {
    console.log('login with google')
    // re-direct user to login with google
    // setting email and google id in the database
    // send back user id who is logging in
    // store user id in async storage
    AsyncStorage.setItem('name', 'jeremy google')
    socket.emit('login', 'google')
    this.props.navigation.navigate('ChooseBar')
  }

  onFacebook() {
    console.log('login with facebook')
    AsyncStorage.setItem('name', 'jeremy facebook')
    this.props.navigation.navigate('ChooseBar')
  }

  render() {
    const { onFacebook, onGoogle } = this
    return (
      <View style={ styles.container }>
        <Text style={ styles.h1 }>Login to play the next game</Text>
        <Button onPress={ onGoogle } title="Login with Google" />
        <Button onPress={ onFacebook } title="Login with Facebook" />
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
