import React, {Component} from 'react';
import {Text, StyleSheet, View, Image,Dimensions, TextInput, TouchableOpacity,FlatList} from 'react-native';
import firebase from "./Firebase/firebaseConfig";
import {SendMessage, RecieveMessage} from './Firebase/Message';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppHeader from './Firebase/AppHeader';
import ImgToBase64 from 'react-native-image-base64';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';



class MessageScreen extends Component {
  state = {
    message: '',
    currentUid: '',
    guestUid: '',
    allMessages: [],
    image: '',
  };

  async componentDidMount(){
    const currentUid = await AsyncStorage.getItem('UID');
    const guestUid= this.props.route.params.guestUid;
    this.setState({currentUid:currentUid,guestUid: guestUid});

    try{
        firebase.database().
        ref('messages').
        child(currentUid).
        child(guestUid).
        on("value", (dataSnapshot) => {
          let message = [];
          dataSnapshot.forEach((data)=>{
            message.push({
              sendBy: data.val().message.sender,
              recieveBy: data.val().message.reciever,
              msg: data.val().message.msg,
              image : data.val().message.image,
              date:data.val().message.date,
              time:data.val().message.time,
            });
          })
          this.setState({allMessages: message.reverse()});

        })
    }catch(error){
      alert(error);
    }
  }

  openGallery(){
    launchImageLibrary('photo',(response)=>{
        this.setState({loader: true});
        this.setState({imageUrl: response.uri});
        ImgToBase64.getBase64String(response.uri)
        .then(async (base64String) => {
            let source = "data:image/jpeg;base64,"+ base64String;
            SendMessage(this.state.currentUid, this.state.guestUid, "", source).
            then((res)=>{
              this.setState({loader: false})       
            }).catch((err)=> {
              alert(err)
            })
      
            RecieveMessage(this.state.currentUid, this.state.guestUid, "", source).
            then((res)=>{ 
              this.setState({loader: false})
            }).catch((err)=> {
              alert(err)
            })
        })
        .catch(err => this.setState({loader: false}));
    })
}

  sendMessage = async()=>{
    if(this.state.message){
      SendMessage(this.state.currentUid, this.state.guestUid, this.state.message, "").
      then((res)=>{
        console.log(res);
        this.setState({message: ''})
      }).catch((err)=> {
        alert(err)
      })

      RecieveMessage(this.state.currentUid, this.state.guestUid, this.state.message, "").
      then((res)=>{
        console.log(res);
        this.setState({message: ''})
      }).catch((err)=> {
        alert(err)
      })

    }
  }


  render() {
    return (
      
      <View style={style.container}>  
      <View style={{flex: 1}}>  
      <View style={style.header1}>
      <AppHeader title = {this.props.route.params.UserName} navigation={this.props.navigation} onPress={() => this.logOut()} />
      </View>
      <View style={style.footer}>
         <FlatList
         inverted
         style={{marginBottom:60}}
         data={this.state.allMessages}
         keyExtractor={(_ , index) => index.toString()}
         renderItem={({item})=>(
          <View style={{ paddingEnd:10, paddingStart:10, marginVertical: 5, maxWidth: Dimensions.get('window').width / 2 + 10, alignSelf: this.state.currentUid === item.sendBy ? 'flex-end' : 'flex-start' }}>
                            <View style={{ borderTopLeftRadius: 20,borderBottomEndRadius:20,borderTopEndRadius:20, backgroundColor: this.state.currentUid === item.sendBy ? '#00ffff' : '#64FFDA' }}>
                                {item.image === "" ? <Text style={{ padding: 10, fontSize: 16, fontWeight: 'bold' ,color:'#222831' }}>
                                    {item.msg} {""} <Text style={{ fontSize: 11 , color:'gray'}}>{item.time}</Text>
                                </Text> :
                                    <View>
                                        <Image source={{ uri: item.image }} style={{ width: Dimensions.get('window').width / 2 + 10, height: 150, resizeMode: 'stretch', borderTopLeftRadius: 30,borderBottomEndRadius:30,borderTopEndRadius:30, }} />
                                        <Text style={{ fontSize: 12,position:'absolute',bottom:5,right:5 }}>{item.time}</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    )}
         />
        
         <View style={{bottom:0, height:50, width:'100%', position:'absolute', flexDirection:'row'}}>
             <TouchableOpacity style={{width:'10%', justifyContent:'center', alignItems:'center', marginRight:5}} onPress={() => this.openGallery()}>
                 <Icon name="camera" size={30} color="#03dac6"/>
             </TouchableOpacity>
             <View style={{width: '75%', justifyContent: 'center'}}>
                 <TextInput onChangeText={(text)=> this.setState({message: text})} 
                 value={this.state.message}
                 placeholder="Enter Message" placeholderTextColor="#222831" 
                 style={{height:40, borderRadius:20, borderWidth:1,borderColor:'#03dac6' ,
                 width:'100%',backgroundColor:'#fff'}}/>
             </View>
             <TouchableOpacity onPress={() => this.sendMessage()} style={{width:'10%', justifyContent:'center', alignItems:'center', marginRight:5}} >
                 <Icon name="send" size={30} color= '#03dac6'/>
             </TouchableOpacity>
         </View>
         
          <Spinner
            visible={this.state.loader}
            />
        </View>
        </View>
     </View>
    );
  }
}
export default MessageScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03dac6',
  },
  circle: {
    width: 550,
    height: 550,
    borderRadius: 500 / 2,
    backgroundColor: '#fff',
    position: 'absolute',
    left: -120,
    top: -20,
    
  },
  header: {
    fontWeight: '800',
    fontSize: 30,
    color: '#514e5a',
  },
  input: {
    marginTop: 20,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bab7c3',
    borderRadius: 30,
    paddingHorizontal: 16,
    color: '#514e5a',
    fontWeight: '600',
  },
  header1: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 40,
},

footer: {
    flex: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    borderBottomRightRadius:60,
    borderWidth:5,
    borderColor:"#03dac6"
},


text_header: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
},
text_footer: {
    color: '#F9813A',
    fontSize: 18,
    marginTop: 12,

},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
},

button: {
    alignItems: 'center',
    borderRadius: 30,
    margin: 10,
    padding: 10

},
singIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
},
textSign: {
    fontWeight: 'bold',
    fontSize: 18
},
error: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 0 : -12,
    borderColor: '#ff0000',
    borderWidth: 1.8,
    borderRadius: 30,
    padding: 12,
}

});
