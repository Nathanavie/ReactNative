import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class DisplayMeme extends React.Component {

componentDidMount() {
  console.log('DisplayMeme Mounted')
  console.log('prop passed is = ', this.props.memes)
}

render() {
  return (
    <View style={styles.container}>
    <Image
      style={{resizeMode: "contain", width: 400, height: 400, overflow: "visible"}}
      source={{uri: this.props.memes.image}}
    />
    </View>
  )
}

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
});

export default DisplayMeme
