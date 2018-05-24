/* eslint-disable */
import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

class ChooseBar extends React.Component {
  constructor() {
    super()
    this.state = {
      barId: ''
    }
  }

  render() {
    // console.log(this.state)
    const { barId } = this.state
    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>Choose your Bar</Text>
        <Text style={ styles.subheader }>Enter your Bar ID below</Text>
        <TextInput
          autoFocus
          maxLength={4}
          style={ styles.input }
          placeholder="__  __  __  __"
          keyboardType='numeric'
          value={ barId }
          onChangeText={text => this.setState({ barId: `${text}` })}
        />
        <Button title="Submit" onPress={() => console.log(`your bar id: ${barId} `)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  subheader: {
    fontSize: 20,
    paddingTop: 20
  },
  input: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 40,
    paddingBottom: 50
  }
})

export default ChooseBar;
