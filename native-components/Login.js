/* eslint-disable */
import React from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet } from 'react-native';
// import io from 'socket.io-client/socket.io'

class Login extends React.Component {
  constructor() {
    super()
    this.onFacebook = this.onFacebook.bind(this)
    this.onGoogle = this.onGoogle.bind(this)
  }

  onGoogle() {
    console.log('login with google')
    io.emit('login')
    this.props.navigation.navigate('ChooseBar')
  }

  onFacebook() {
    console.log('login with facebook')
    io.emit('login')
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
