/* eslint-disable */
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Info from './native-components/Info';
import Login from './native-components/Login';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerLeft: (
        <Button title="Info" onPress={() => navigation.navigate('Info')} />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 35 }}>Capstone Project</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Check out our information page</Text>
        <Button onPress={() => this.props.navigation.navigate('Login')} title="Play now" />
      </View>
    );
  }
}

/* Not necessary rigt now, but keeping anyway
class InfoScreen extends React.Component {
  static navigationOptions = {
    title: 'Info'
  }
  render() { return <Info /> }
}
*/

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: Login
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: { backgroundColor: 'lightblue' }
    }
  }
)

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    Info: Info
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

export default class App extends React.Component {
  render() { return <RootStack /> }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
