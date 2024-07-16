import { View, Text,StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React from 'react';
import colors from '../config/colors';
const fitness = require('../assets/fitness.jpg');
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={ styles.topSection }>
                <Image source={fitness} style={{width: '100%', height: '100%'}} />
            </View>

            <View style={ styles.bottomSection }>
                <Text style={ styles.title }> Wherever You Are </Text>
                <Text style={ styles.title }>Health Is Number One</Text>
                <Text style={ styles.subTitle}>There is no better time than now to start living healthy</Text>
                {/* <ActivityIndicator size="large" color={colors.primary} 
                    style={{marginVertical: 30}}
                /> */}
                <TouchableOpacity style={ styles.button } onPress={() => navigation.navigate('Login')}>
                    <Text style={ styles.buttonText }>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },

    topSection: {
        flex: 1.2,
        justifyContent: 'center',
        width: "100%",
        height: "100%",
    },

    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
    },

    subTitle: {
        fontSize: 16,
        color: colors.darkGray,
        textAlign: 'center',
        marginVertical: 10,
        paddingVertical: 20,
    },

    bottomSection: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 32,
        minWidth: "100%",
        maxWidth: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
    },

    buttonText: {
        color: 'white',
        fontSize: 18
    }

})

export default WelcomeScreen