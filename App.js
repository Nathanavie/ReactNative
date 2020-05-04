import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import FetchAPI from './components/FetchAPI';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Header />
        <FetchAPI />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
});
