import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import DisplayMeme from './DisplayMeme'

class FetchAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memes: [],
      isLoaded: false,
    };
  }

  fetchAPI = () => {
      console.log('fetching API')
      fetch('https://some-random-api.ml/meme')
      .then(response => response.json())
      .then(data => {
        this.setState ({
          memes: data,
          isLoaded: true,
        })
        console.log(this.state.memes);
      })
      .catch(error=>console.log(error)) //to catch the errors if any
  }

    render(){
     if(!this.state.isLoaded){
      return(
        <View>
          <TouchableOpacity
            style={styles.buttons}
            onPress={this.fetchAPI}
          >
            <Text style={styles.buttonText1}>Get A Meme!</Text>
          </TouchableOpacity>
        </View>
    )}
    return(
     <View style={styles.container}>
     <DisplayMeme memes={this.state.memes} />
     <TouchableOpacity
        style={styles.buttons}
        onPress={this.fetchAPI}
      >
        <Text style={styles.buttonText2}>Get Another Meme!</Text>
      </TouchableOpacity>
      </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'stretch',
    justifyContent: 'flex-start',
   },
   buttons: {
     borderColor: '#000000',
     borderWidth: 2,
     padding: 10,
     borderRadius: 200,
     color: '#FFFFFF',
     width: 200,
     height: 200,
     alignSelf: 'center',
     marginTop: 100
   },
   buttonText1: {
     textAlign: 'center',
     flex: 1,
     marginTop: 65,
     fontSize: 25,
   },
   buttonText2: {
     textAlign: 'center',
     flex: 1,
     marginTop: 60,
     fontSize: 25,
   }
});

export default FetchAPI
