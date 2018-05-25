/* eslint-disable */
import React from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet } from 'react-native';

class Login extends React.Component {
  constructor() {
    super()
    this.onFacebook = this.onFacebook.bind(this)
    this.onGoogle = this.onGoogle.bind(this)
  }

  onGoogle() {
    console.log('login with google')
    this.props.navigation.navigate('ChooseBar')
  }

  onFacebook() {
    console.log('login with facebook')
    this.props.navigation.navigate('ChooseBar')
  }

  render() {
    const { onFacebook, onGoogle } = this
    return (
      <View style={ styles.container }>
        <Text style={ styles.login }>Login to play the next game</Text>
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
    paddingTop: 100,
  },
  login: {
    fontSize: 25,
    paddingBottom: 30
  }
})

export default Login;
