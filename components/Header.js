import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Header = () => {
  return (
    <View style={style.header}>
      <Text style={style.headerText}>Meme Generator</Text>
    </View>
  )
}

const style = StyleSheet.create({
  header: {
    maxHeight: 50,
    backgroundColor: '#000000',
    alignSelf: 'stretch',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerText: {
    textAlign: 'center',
    alignSelf: 'stretch',
    fontSize: 30,
    color: '#FFFFFF'
  }
})

export default Header
