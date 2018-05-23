import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Info = ({ navigation }) => {
  return (
    <View style={ styles.container }>
      <Text>About us!</Text>
      <Button title="Close" onPress={() => navigation.goBack() } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Info;
