import React from 'react';
import {Text, StyleSheet, View, TextInput, StatusBar } from 'react-native';
import Firebase from "./Firebase/firebaseConfig";
import {LoginUpUser} from './Firebase/loginUser';
import AsyncStorage from '@react-native-community/async-storage';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
    num: 0,
    loader: false,
    secureTextEntry:true,
}

async componentDidMount() {
    this.setState({ loader: true })
    const uid = await AsyncStorage.getItem('UID');
    if (uid) {
        this.props.navigation.navigate('ChatScreen');
        this.setState({ loader: false })
    }
    this.setState({ loader: false })
}



LoginFirebase = async () => {
    if(!this.state.email)
    {
        return alert('Please Enter Email');
    }
    if(!this.state.password)
    {
        return alert('Please Enter Password');
    }
    this.setState({ loader: true })
    LoginUpUser(this.state.email, this.state.password).
        then(async (res) => {
            const uid = Firebase.auth().currentUser.uid;
            await AsyncStorage.setItem('UID', uid);
            this.setState({ loader: false , email:'',password:''})
            this.props.navigation.navigate('ChatScreen');
            
        }).
        catch((err) => {
            this.setState({ loader: false })
            alert(err);
        })
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
                  <Text style={styles.text_header}>     Welcome ! </Text>
              </View>

              <View style={[styles.footer, { backgroundColor: '#fff' }]} >
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
              <Text style={[styles.text_footer, {  color:'black' }]}> password</Text>
              <View style={styles.action}>
                  <FontsAw name="user-o" c color='black' size={18} />
                  <TextInput placeholder="Your Password" style={[styles.textInput, { color: 'black' }]}
                      autoCapitalize="none"
                      onChangeText={(val) => this.setState({ password: val })}
                      secureTextEntry={this.state.secureTextEntry ? true : false} 
                             value={this.state.password} />
                    <TouchableOpacity onPress={()=>this.updateSecureTextEntry()} >
                      {this.state.secureTextEntry ?
                          <Feather name="eye-off" color="black" size={20} />
                          : <Feather name="eye" color="black" size={20} />}
                         </TouchableOpacity>
                             
              </View>
              <View style={styles.button}>
                  <TouchableOpacity style={styles.signIn}

                      onPress={()=>this.LoginFirebase()}>
                      <LinearGradient colors={['#03dac6', '#00BCD4']} style={styles.signIn}  >
                          <Text style={styles.textSign}> Login </Text>
                      </LinearGradient></TouchableOpacity>

                  <LinearGradient colors={['#E0F7FA', '#03dac6']} style={[styles.signIn, { marginTop: 15 }]}  >
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUpScreen1")}
                          style={[styles.signIn,]}>
                          <Text style={styles.textSign}> Sign Up </Text></TouchableOpacity>
                  </LinearGradient>
              </View>

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
  