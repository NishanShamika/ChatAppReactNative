import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../consts/colors';

const PrimaryButton = ({title, onPress = () => {}}) => {
  return (
    <LinearGradient colors={['#E0F7FA', '#03dac6']} style={[style.signIn, { marginTop: 15 }]}  >
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      
        <Text style={style.title}>{title}</Text>
      
    </TouchableOpacity>
    </LinearGradient>
  );
};
const SecondaryButton = ({title, onPress = () => {}}) => {
  return (
    
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{...style.btnContainer, backgroundColor: COLORS.white}}>
        <Text style={{...style.title, color: COLORS.primary}}>{title}</Text>
      </View>
    </TouchableOpacity>
    
  );
};

const style = StyleSheet.create({
  title: {color: COLORS.white, fontWeight: 'bold', fontSize: 18},
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signIn: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
},
});

export {PrimaryButton, SecondaryButton};
