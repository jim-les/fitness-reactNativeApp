import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import users from '../assets/users.json'; // Adjust the path based on your file location

const LoginScreen = () => {
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    
    const handlePress = (num) => {
        if (password.length < 4) {
            setPassword(password + num);
        }

        if (password.length === 4) {
            // Check login credentials
            const user = users.users.find(user => user.password === password);
          
        }

    };

    useEffect(() => {

        const checkLogin = () => {
            if (password.length === 4) {
                // Check login credentials
                const user = users.users.find(user => "1234" === password);
                if (user) {
                    navigation.navigate('HomeStack');
                } 
            }
        }

        setInterval(checkLogin, 1000);
    })

    const handleDelete = () => {
        setPassword(password.slice(0, -1));
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.headerText}>Enter your password</Text>
                <View style={styles.passwordDotFields}>
                    {Array(4).fill(0).map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.passwordDot,
                                password.length > index && styles.filledDot
                            ]}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.buttonRow}>
                    {[1, 2, 3].map(num => (
                        <TouchableOpacity
                            key={num}
                            style={styles.loginBtn}
                            onPress={() => handlePress(num)}
                        >
                            <Text style={styles.loginBtnText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.buttonRow}>
                    {[4, 5, 6].map(num => (
                        <TouchableOpacity
                            key={num}
                            style={styles.loginBtn}
                            onPress={() => handlePress(num)}
                        >
                            <Text style={styles.loginBtnText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.buttonRow}>
                    {[7, 8, 9].map(num => (
                        <TouchableOpacity
                            key={num}
                            style={styles.loginBtn}
                            onPress={() => handlePress(num)}
                        >
                            <Text style={styles.loginBtnText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.buttonRow}>
                    <View style={styles.emptyBtn} />
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => handlePress(0)}
                    >
                        <Text style={styles.loginBtnText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={handleDelete}
                    >
                        <Text style={styles.loginBtnText}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.darker,
        padding: 20,
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        color: Colors.light,
        marginBottom: 20,
    },
    passwordDotFields: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        gap: 20,
    },
    passwordDot: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: Colors.lighter,
        borderWidth: 1,
    },
    filledDot: {
        backgroundColor: Colors.lighter,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    loginBtn: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lighter,
        borderWidth: 1,
        borderRadius: 30,
    },
    loginBtnText: {
        fontSize: 24,
        color: Colors.lighter,
    },
    iconBtn: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyBtn: {
        width: 60,
        height: 60,
    },
});

export default LoginScreen;
