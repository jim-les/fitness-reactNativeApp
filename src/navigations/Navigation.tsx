import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ExploreScreen from '../screens/ExploreScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateUserScreen from '../screens/CreateUserScreen';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import TimerScreen from '../screens/TimerScreen';
import ProfilScreen from '../screens/ProfilScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: colors.darkGreen,
            tabBarInactiveTintColor: colors.gray,
            headerShown: false,
            tabBarStyle: { 
                height: 60, 
                paddingBottom: 5,
                marginHorizontal: 10,
                marginBottom: 10,
                borderRadius: 30,
                backgroundColor: colors.black,
            }
        }}
    >
        <Tab.Screen name="Home" component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <Icon name="home" color={color} size={25} />
                )
            }} 
        />
        <Tab.Screen name="Activity" component={ActivityScreen} 
            options={{
                tabBarLabel: 'Activity',
                tabBarIcon: ({ color }) => (
                    <Icon name="bar-chart" color={color} size={25} />
                )
            }}
        />
        <Tab.Screen name="Explore" component={ExploreScreen} 
            options={{
                tabBarLabel: 'Explore',
                tabBarIcon: ({ color }) => (
                    <Icon name="search" color={color} size={25} />
                )
            }}
        />
        <Tab.Screen name="Profile" component={ProfilScreen} 
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                    <Icon name="person" color={color} size={25} />
                )
            }}
        />

    </Tab.Navigator>
);



const ExploreStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name="Explore" component={ExploreScreen} />
        
    </Stack.Navigator>
);

const WorkoutStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name="Workout" component={WorkoutScreen} />
    </Stack.Navigator>
);

const MainStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName='HomeStack'
    >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateUser" component={CreateUserScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="HomeStack" component={HomeStack} />

    </Stack.Navigator>
);

const Navigation = () => {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
};

export default Navigation;
