import React, {Component} from 'react';
import {Text, StyleSheet, View, Image,FlatList,TouchableOpacity} from 'react-native';
import firebase from './Firebase/firebaseConfig';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {UpdateUserImage} from './Firebase/User';
import ImgToBase64 from 'react-native-image-base64';
import AsyncStorage from '@react-native-community/async-storage';

class ChatScreen extends Component{

    state = {
        allUsers: [],
        imageUrl:'',
        loggedInUserName:'',
        loader:false,
    }
    async componentDidMount(){
        try{
            await firebase.database().ref('users')
            .on("value",async (datasnapshot) =>{
                const uuid =firebase.auth().currentUser.uid;
                
                new Promise((resolve,reject) => {
                    let users = [];
                    let lastMessage= '';
                    let lastDate = '';
                    let lastTime = '';
                    let properDate = '';
                    datasnapshot.forEach((child) =>{
                        if(child.val().uuid === uuid){
                                this.setState({loggedInUserName: child.val().name,imageUrl: child.val().image})
                        }
                        else{
                            let newUser={
                                userId:'',
                                userName: '',
                                userProPic:'',
                                lastMessage:'',
                                lastDate:'',
                                lastTime: '',
                                properDate: ''
                            }
                            new Promise((resolve,reject)=>{
                                firebase.database().ref("messages")
                                .child(uuid).child(child.val().uuid).orderByKey().limitToLast(1).on("value", (dataSnapshots)=>{
                                    if(dataSnapshots.val()){
                                        dataSnapshots.forEach((child) => {
                                            lastMessage= child.val().message.image !== ''? 'Photo' : child.val().message.msg;
                                            lastDate = child.val().message.date;
                                            lastTime = child.val().message.time;
                                            properDate = child.val().message.date + " " + child.val().message.time;
                                        });
                                    }
                                    else{
                                        lastMessage = '';
                                        lastDate = '';
                                        lastTime = '';
                                        properDate = '';
                                    }
                                    newUser.userId = child.val().uuid;
                                    newUser.userName = child.val().name;
                                    newUser.userProPic = child.val().image;
                                    newUser.lastMessage = lastMessage;
                                    newUser.lastTime = lastTime;
                                    newUser.lastDate = lastDate;
                                    newUser.properDate = properDate;
                                    return resolve(newUser);
    
                                });
                            }).then((newUser) => {
                                users.push({
                                    userName: newUser.userName,
                                    uuid: newUser.userId,
                                    imageUrl : newUser.userProPic,
                                    lastMessage : newUser.lastMessage,
                                    lastTime : newUser.lastTime,
                                    lastDate : newUser.lastDate,
                                    properDate : newUser.lastDate ? new Date(newUser.properDate) : null
                                });
                                this.setState({allUsers: users.sort((a,b) => b.properDate - a.properDate)});
                            });
                            return resolve(users);
                        }
                    });
                }).then((users) => {
                    this.setState({allUsers: users.sort((a,b) => b.properDate - a.properDate)});
                })
                
            });
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
                const uid= await AsyncStorage.getItem('UID');
                let source = "data:image/jpeg;base64,"+ base64String;
                UpdateUserImage(source,uid).
                then (()=>{
                    this.setState({imageUrl:response.uri, loader:false});
                })
            })
            .catch(err => this.setState({loader: false}));
        })
    }

  

    render(){
        return(
            <View style={style.container}>  
                   <View style={style.header1}>
                        <Text style={style.text_header}>Messages</Text>
                    </View>
                   
                    <View style={style.footer}>

                   <FlatList
                    alwaysBounceVertical={false}
                    data={this.state.allUsers}
                    style={{padding:5}}
                    keyExtractor={(_, index) => index.toString()}
                    ListHeaderComponent={
                        <View style={{ height: 160, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ height: 90, width: 90, borderRadius: 45}} onPress={() => { this.openGallery() }}>
                                <Image source={{ uri: this.state.imageUrl === '' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjfb4boKKaHu5x1oFASsO92hJb-78nyVcFKRT_WxvRf1O165kUOYWfa0uGn12tfdw8uRU&usqp=CAU' : this.state.imageUrl }} style={{ height: 90, width: 90, borderRadius: 45 }} />
                            </TouchableOpacity>
                            <Text style={{ color: '#006064', fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{this.state.loggedInUserName}</Text>
                        </View>
                    }
                    renderItem={({item}) => (
                        <View style={{marginHorizontal:32}}>
                        <View>
                            <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 20, marginTop: 20 }} onPress={() => this.props.navigation.navigate('MessageScreen', { UserName: item.userName, guestUid: item.uuid })}>
                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={{ uri: item.imageUrl === '' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjfb4boKKaHu5x1oFASsO92hJb-78nyVcFKRT_WxvRf1O165kUOYWfa0uGn12tfdw8uRU&usqp=CAU' : item.imageUrl }} style={{ height: 50, width: 50, borderRadius: 25 }} />
                                </View>
                                <View style={{ width: '65%', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 12 }}>
                                    <Text style={{ color: '#006064', fontSize: 16, fontWeight: 'bold',  }}>{item.userName}</Text>
                                    <Text style={{ color: '#006064', fontSize: 14, fontWeight: '600' }} >{item.lastMessage}</Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'flex-start', justifyContent: 'center', marginRight: 20 }}>
                                    <Text style={{ color: '#006064', fontSize: 13, fontWeight: '400' }} >{item.lastTime}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderWidth: 1, borderColor: '#03dac6' }} />
                        </View>
                        </View>
                    )} 
                    />
                </View>
                
               </View>
               
            
        );
    }
}
export default ChatScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#03dac6'
    },
    container1: {
      flex: 1,
      
    },
 circle:{
     width: 500,
     height: 580,
     borderRadius: 500/2,
     backgroundColor: "#fff",
     position: "absolute",
     top: 140,
     

 },
 header:{
     fontWeight: "800",
     fontSize: 30,
     color:"#514e5a",
     marginTop: 200

 },
 input: {
     marginTop: 32,
     height: 50,
     borderWidth: StyleSheet.hairlineWidth,
     borderColor: "#bab7c3",
     borderRadius: 30,
     paddingHorizontal: 16,
     color: "#514e5a",
     fontWeight:"600",
 },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header1: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    
},

footer: {
    flex: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 75,
    
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomRightRadius:75,
    borderWidth:7,
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

