import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../config/colors';

const ProfilScreen = () => {
  const [userInfo, setUserInfo] = useState<{ username: string; password: string; loggedIn: boolean } | null>(null);

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        // Replace with your path to user.json in assets
        const response = await require('../assets/users.json');
        const users = response.users;
        // Assuming we are using the first user in the array for now
        setUserInfo(users[0]);
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text style={{color: colors.black}}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{userInfo.username}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.value}>{userInfo.password}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Logged In:</Text>
        <Text style={styles.value}>{userInfo.loggedIn ? 'Yes' : 'No'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.black,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    color: colors.black,

  },
  label: {
    fontSize: 18,
    marginRight: 10,
    color: colors.black,

  },
  value: {
    fontSize: 18,
    color: colors.black,

  },
});

export default ProfilScreen;
