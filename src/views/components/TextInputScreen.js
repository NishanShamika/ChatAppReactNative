import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TextInput} from 'react-native';


class TextInputScreen extends Component{

    render(){
        const {placeholder, updateFields,} = this.props;
        return(
            <View style={style.container}>
                
                    <TextInput
                        style={style.input}
                        placeholder={placeholder}
                        onChangeText={text => updateFields(text)}
                        secureTextEntry={placeholder == "Password" ? true : false}  
                        />
                </View>
            
        )
    }
}
export default TextInputScreen;

const style = StyleSheet.create({
 container: {
     flex: 1,
     backgroundColor:"#fedac5",

 },
 circle:{
     width: 500,
     height: 500,
     borderRadius: 500/2,
     backgroundColor: "#fff",
     position: "absolute",
     left: -120,
     top: -20
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
 }
});
