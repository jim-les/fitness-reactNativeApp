import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';

const CreateUserScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const usersFilePath = RNFS.DocumentDirectoryPath + '/users.json';

    const handleCreateUser = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Passwords do not match.');
            return;
        }

        if (password.length !== 4) {
            Alert.alert('Invalid Password', 'Password must be 4 digits.');
            return;
        }

        try {
            // Read the current users from the file
            const fileExists = await RNFS.exists(usersFilePath);
            let users = [];
            if (fileExists) {
                const usersData = await RNFS.readFile(usersFilePath, 'utf8');
                users = JSON.parse(usersData);
            }


            // Create new user object
            const newUser = {
                id: users.length + 1,
                username,
                password,
            };

            // Update users array
            users.push(newUser);

            // Save updated users array to the file
            await RNFS.writeFile(usersFilePath, JSON.stringify(users), 'utf8');

            // Clear fields after successful creation
            setUsername('');
            setPassword('');
            setConfirmPassword('');

            Alert.alert('User Created', 'User successfully created.');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error reading or writing file:', error);
            Alert.alert('Error', 'An error occurred while saving the user.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.headerText}>Create User</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    placeholderTextColor={colors.darkGray}
                />
                <TextInput
                    style={styles.input}
                    placeholder="PIN Password (4 digits)"
                    keyboardType="numeric"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholderTextColor={colors.darkGray}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm PIN Password"
                    keyboardType="numeric"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    placeholderTextColor={colors.darkGray}
                />
                <TouchableOpacity style={styles.createButton} onPress={handleCreateUser}>
                    <Text style={styles.buttonText}>Create User</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        color: colors.black,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 18,
        elevation: 10,
        color: colors.darkGray
    },
    createButton: {
        width: '100%',
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
    },
});

export default CreateUserScreen;
