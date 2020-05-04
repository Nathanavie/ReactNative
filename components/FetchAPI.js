import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, TextInput, Picker, Image } from 'react-native';
import DisplayMeme from './DisplayMeme'

class FetchAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memes: [],
      isLoaded: false,
      createMeme: false,
      createScreen: false,
      line1: '',
      line2: '',
      memeFormat: 'Select',
      yourMeme: '',
    };
  }

  fetchAPI = url => {
    console.log('url is: ', url)
    let link
    if (url === 'premade') {
      link = 'https://some-random-api.ml/meme'
      this.setState({
        createMeme: false,
      })
      console.log('link is', link)
    } else {
      link = '#'
      this.setState({
        createMeme: true,
      })
      console.log('link is', link)
    }
      console.log('fetching API at', link)
      fetch(link)
      .then(response => response.json())
      .then(data => {
        this.setState ({
          memes: data,
          isLoaded: true,
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
  }


  openCreateScreen = () => {
    this.setState({
      createScreen: true,
    })
  }

  postForNewMeme = (templateID, topline, bottomline) => {
    let request = require("request");

    let formData = {
      template_id : templateID,
      username : "NathanAvie",
      password : "WiganAth123",
      text0 : topline,
      text1 : bottomline
    };
    request.post("https://api.imgflip.com/caption_image", {
      form : formData
    }, function(error, response, body) {

      let meme = JSON.parse(body);

      if (!error && response.statusCode == 200) {
        console.log(meme.data.url);
        this.setState({
          yourMeme: meme.data.url,
        })
      }

    }.bind(this));
  }


  handleSubmit = () => {
    console.log('line 1 - ', this.state.line1)
    console.log('line 2 - ', this.state.line2)
    console.log('meme Format ID - ', this.state.memeFormat)
    let toptext = this.state.line1
    let bottomtext = this.state.line2
    let format = this.state.memeFormat
    this.postForNewMeme(format, toptext, bottomtext)
  }


    render(){
     if(!this.state.isLoaded && !this.state.createScreen){
      return(
        <View>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.fetchAPI('premade')}
          >
            <Text style={styles.buttonText1}>Get A Random Meme!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={this.openCreateScreen}
          >
            <Text style={styles.buttonText1}>Create Your Own Meme!</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (this.state.createMeme) {
        <View style={styles.container}>
        <DisplayMeme memes={this.state.memes} />
        <TouchableOpacity
           style={styles.buttons}
           onPress={() => this.fetchAPI('create')}
         >
           <Text style={styles.buttonText1}>Create Another Meme!</Text>
         </TouchableOpacity>
         </View>
    } else if (!this.state.isLoaded && this.state.createScreen) {
      return(
        <>
        <View style={styles.container}>
        <View style={styles.ImgContainer}>
          <Image
          style={{resizeMode: "contain", width: 400, height: 400, overflow: "visible"}}
          source={{uri: this.state.yourMeme}}
          />
        </View>
        <Text style={styles.createWording}>Meme Format</Text>
        <Picker
           selectedValue={this.state.memeFormat}
           style={styles.lineInputs}
           onValueChange={memeFormat => this.setState({ memeFormat })}
         >
           <Picker.Item label="Please Select" value="Select" />
           <Picker.Item label="Distracted Boyfriend" value="112126428" />
           <Picker.Item label="Two Buttons" value="87743020" />
           <Picker.Item label="Drake Hotline Bling" value="181913649" />
           <Picker.Item label="Mocking Spongebob" value="102156234" />
           <Picker.Item label="Expanding Brain" value="93895088" />
           <Picker.Item label="Boardroom Meeting Suggestion" value="1035805" />
           <Picker.Item label="Anime Butterfly Guy" value="100777631" />
         </Picker>
        <Text style={styles.createWording}>Top Text</Text>
        <TextInput
          style={styles.lineInputs}
          onChangeText={line1 => this.setState({ line1 })}
          value={this.state.line1}
        />
        <Text style={styles.createWording}>Bottom Text</Text>
        <TextInput
          style={styles.lineInputs}
          onChangeText={line2 => this.setState({ line2 })}
          value={this.state.line2}
        />
        <Button
          onPress={this.handleSubmit}
          title="Make this meme"
        />
        </View>
        </>
      )
    } else if (!this.state.createMeme) {
      return(
        <View style={styles.containerInputs}>
        <DisplayMeme memes={this.state.memes} />
        <TouchableOpacity
        style={styles.buttons}
        onPress={() => this.fetchAPI('premade')}
        >
        <Text style={styles.buttonText1}>Get Another Meme!</Text>
        </TouchableOpacity>
        </View>
      )}
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'stretch',
    justifyContent: 'flex-start',
   },
   containerInputs: {
     flex: 1,
     backgroundColor: "#fff",
     alignItems: 'center',
     justifyContent: 'flex-start',
   },
   ImgContainer: {
     alignItems: 'center'
   },
   lineInputs: {
     height: 40,
     borderColor: 'gray',
     borderWidth: 1,
     width: 300,
     alignSelf: 'center',
     marginBottom: 10,
   },
   createWording: {
     textAlign: 'center',
   },
   buttons: {
     borderColor: '#000000',
     borderWidth: 2,
     padding: 10,
     borderRadius: 200,
     width: 200,
     height: 200,
     alignSelf: 'center',
     marginTop: 100
   },
   buttonText1: {
     textAlign: 'center',
     flex: 1,
     marginTop: 60,
     fontSize: 25,
   }
});

export default FetchAPI
