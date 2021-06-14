import {SignUpUser} from './Firebase/SignUpUser';
import {AddUser, AddPlayers} from './Firebase/User';
import Feather from 'react-native-vector-icons/Feather';
import Firebase from "./Firebase/firebaseConfig";
import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar } from 'react-native';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SignUpScreen1 extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    num: 0,
    loader: false,
    secureTextEntry:true,
    
}

SignUptoFirebase = async () => {
    if(!this.state.name)
    {
        return alert('Please Enter Name');
    }
    if(!this.state.email)
    {
        return alert('Please Enter Email');
    }
    if(!this.state.password)
    {
        return alert('Please Enter Password');
    }
    if(!this.state.password2)
    {
        return alert('Please Enter confirm Password');
    }
    this.setState({ loader: true })
    if(this.state.password===this.state.password2){
        SignUpUser(this.state.email, this.state.password).
        then(async (res) => {
            console.log('res', res);
            var userUID = Firebase.auth().currentUser.uid;
            AddUser(this.state.name, '',this.state.email, '', userUID).
                then(async () => {
                    AddPlayers(this.state.name, '',this.state.email,  userUID).
                    then(()=>{
                        this.setState({ loader: false ,name:'', email:'',password:'' ,password2:''});
                     AsyncStorage.setItem('UID', userUID);
                        alert("SignUp Succes");
                        this.props.navigation.navigate('ChatScreen');
                    }).catch((err)=>{
                        alert("all")
                    })
                    
                }).
                catch((error) => {
                    this.setState({ loader: false });
                    alert(error);
                })
            console.log(userUID);
        }).
        catch((err) => {
            this.setState({ loader: false });
            alert(err);
        })
    }else{
        alert('plz enter Same password for confirm password');
    }
}

updateSecureTextEntry = () => {
    this.setState({
          ...this.state,
          secureTextEntry: !this.state.secureTextEntry,
      });
  }

  
    render() {
        return (
            
            <LinearGradient
            colors={['#03dac6', 'white']}
            style={styles.container1}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 0.6 }}
          >
                <StatusBar backgroundColor="#03dac6" barStyle="light-content" /> 
                    <View style={styles.header}>
                        <Text style={styles.text_header}> Register Now ! </Text>
                    </View>
                    <View style={[styles.footer, { backgroundColor: '#fff' }]} >
                    <Text style={[styles.text_footer, { color:'black' }]}> Name</Text>
                    <View style={styles.action}>
                        <FontsAw name="user-o" color='black' size={18} />
                        <TextInput placeholder="Your Name" style={[styles.textInput, { color: 'black'}]}
                            value={this.state.name}
                            onChangeText={(val) => this.setState({ name: val })} />
                            {this.state.name.length>this.state.num?
                      <View >
                      <View animation="bounceIn" >
                          <Feather name="check-circle" color="green" size={20} />
                      </View>
                      </View>
                      : null}
                    </View>
                    <Text style={[styles.text_footer, {  color:'black' }]}> Email</Text>
                    <View style={styles.action}>
                        <FontsAw name="user-o"  color='black' size={18} />
                        <TextInput placeholder="Your Email" style={[styles.textInput, { color: 'black' }]}
                            autoCapitalize="none" value={this.state.email}
                            onChangeText={(val) => this.setState({ email: val })} />

                    {this.state.email.length>this.state.num?
                      <View >
                      <View animation="bounceIn" >
                          <Feather name="check-circle" color="green" size={20} />
                      </View>
                      </View>
                      : null}
                    </View>
                    <Text style={[styles.text_footer, {  color:'black' }]}> Password</Text>
                    <View style={styles.action}>
                        <FontsAw name="user-o" c color='black' size={18} />
                        <TextInput placeholder="Your Password" style={[styles.textInput, { color: 'black' }]}
                            secureTextEntry={this.state.secureTextEntry ? true : false} autoCapitalize="none"
                             value={this.state.password}
                            onChangeText={(val) => this.setState({ password: val })} />

                        <TouchableOpacity onPress={()=>this.updateSecureTextEntry()} >
                      {this.state.secureTextEntry ?
                          <Feather name="eye-off" color="black" size={20} />
                          : <Feather name="eye" color="black" size={20} />}
                         </TouchableOpacity> 
                    </View>
                    
                    <Text style={[styles.text_footer, {  color:'black' }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <FontsAw name="user-o" c color='black' size={18} />
                        <TextInput placeholder="Your Confirm Password" style={[styles.textInput, { color: 'black' }]}
                            secureTextEntry={this.state.secureTextEntry ? true : false}
                            autoCapitalize="none" value={this.state.password2}
                            onChangeText={(val) => this.setState({ password2: val })} />

                        <TouchableOpacity onPress={()=>this.updateSecureTextEntry()} >
                      {this.state.secureTextEntry ?
                          <Feather name="eye-off" color="black" size={20} />
                          : <Feather name="eye" color="black" size={20} />}
                         </TouchableOpacity> 
                    </View>
                    
                        <View style={styles.button}>
                        <TouchableOpacity style={styles.signIn}

                      onPress={()=>this.SignUptoFirebase()}>
                      <LinearGradient colors={['#03dac6', '#00BCD4']} style={styles.signIn}  >
                          <Text style={styles.textSign}> Sign Up </Text>
                      </LinearGradient></TouchableOpacity>
                    </View>
                     
                   <View style={{height:50}}></View>
                    </View>
                </LinearGradient>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#03dac6'
    },
    container1: {
      flex: 1,
      
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222831'
    },
  })