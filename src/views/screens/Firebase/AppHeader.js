import React, {Component} from 'react';
import {Text, StyleSheet, View,TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';

class AppHeader extends Component {

    render() {
        const { title, navigation } = this.props;
        return (
            <View style={{ height: 60 }}>
                <View style={[styles.gradient, { paddingTop: 5}]}>
                    <View style={styles.headerView}>
                        {title === "Messages" ?
                            <View style={{ width: '10%' }}>

                            </View>
                            :
                            <View style={{ alignItems: 'flex-start' }}>
                                <TouchableOpacity style={styles.iconView} onPress={() => { navigation.goBack(null) }}>
                                    <Icons name="leftcircle" size={40} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{ width: '80%', alignItems: 'center' }}>
                            <Text style={[styles.textView, { fontSize: 30, fontWeight: 'bold', color:'#fff' }]}>{title}</Text>
                        </View>
                        {title === "Messages" ? <View style={{ width: '10%', alignItems: 'flex-start', marginLeft: 10 }}>
                        <TouchableOpacity style={styles.iconView} onPress={() => { navigation.goBack(null) }}>
                                    <Icons name="leftcircle" size={30} color="#fff" />
                                </TouchableOpacity>
                        </View> : null}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gradient: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 12,
        justifyContent: 'center'
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        width: '100%',
    },
    iconView: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    textView: {
        fontSize: 20,
        lineHeight: 28,
        color: '#000',
    }
});


export default AppHeader;
