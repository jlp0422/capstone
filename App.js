/* eslint-disable */
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Info from './native-components/Info';
import Login from './native-components/Login';
import ChooseBar from './native-components/ChooseBar';
import PregameCountdown from './native-components/PregameCountdown';
import PregameStatic from './native-components/PregameStatic';
import TeamName from './native-components/TeamName';
import QuestionActive from './native-components/QuestionActive';
import QuestionOver from './native-components/QuestionOver';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button title="Info" onPress={() => navigation.navigate('Info')} />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 35 }}>UnTapped Trivia</Text>
        <Button onPress={() => this.props.navigation.navigate('Login')} title="Play now" />
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Login'
      }
    },
    ChooseBar: {
      screen: ChooseBar,
      navigationOptions: {
        title: 'Bar ID'
      }
    },
    TeamName: {
      screen: TeamName,
      navigationOptions: {
        title: 'Team Name'
      }
    },
    PregameCountdown: {
      screen: PregameCountdown,
      navigationOptions: {
        title: 'Next Game'
      }
    },
    QuestionActive: {
      screen: QuestionActive,
      navigationOptions: {
        title: 'Current Question'
      }
    },
    QuestionOver: {
      screen: QuestionOver,
      title: 'Question Over'
    }
    // PregameStatic: PregameStatic,
  },
  {
    // initialRouteName: 'Home', // will be set as home at end, changing for easier page testing
    initialRouteName: 'QuestionOver',
    navigationOptions: {
      headerStyle: { backgroundColor: 'lightblue' }
    }
  }
)

// const TabStack = createBottomTabNavigator({
//   Home: MainStack,
//   // Profile: Profile
// })

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

/* Not necessary rigt now, but keeping anyway
class InfoScreen extends React.Component {
  static navigationOptions = {
    title: 'Info'
  }
  render() { return <Info /> }
}
*/
