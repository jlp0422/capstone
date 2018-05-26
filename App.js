/* eslint-disable */
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import Info from './native-components/Info';
import Login from './native-components/Login';
import ChooseBar from './native-components/ChooseBar';
import PregameCountdown from './native-components/PregameCountdown';
import PregameStatic from './native-components/PregameStatic';
import TeamName from './native-components/TeamName';
import QuestionActive from './native-components/QuestionActive';
import QuestionOver from './native-components/QuestionOver';
import QuestionWaiting from './native-components/QuestionWaiting'

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

// questions and gameplay have to be switch navigator

const GameStack = createSwitchNavigator(
  {
    QuestionActive: {
      screen: QuestionActive,
      navigationOptions: {
        title: 'Current Question'
      }
    },
    QuestionOver: {
      screen: QuestionOver,
      navigationOptions: {
        title: 'Question Over'
      }
    },
    QuestionWaiting: {
      screen: QuestionWaiting,
      navigationOptions: {
        title: 'Next Question coming soon'
      }
    }
  }, {
    initialRouteName: 'QuestionActive'
  }
)

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
    // GamePlay: GameStack,
    QuestionActive: {
      screen: QuestionActive,
      navigationOptions: {
        title: 'Current Question',
        headerLeft: null
      }
    },
    QuestionOver: {
      screen: QuestionOver,
      navigationOptions: {
        title: 'Question Over',
        headerLeft: null
      }
    },
    QuestionWaiting: {
      screen: QuestionWaiting,
      navigationOptions: {
        title: 'Next Question coming soon',
        headerLeft: null
      }
    }
    // PregameStatic: PregameStatic,
  },
  {
    initialRouteName: 'Home', // will be set as home at end, changing for easier page testing
    // initialRouteName: 'GamePlay',
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
    // GamePlay: GameStack,
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
