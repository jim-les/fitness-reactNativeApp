import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import colors from '../config/colors';
import PopularWorkoutCard from '../components/PopularWorkoutCard';
import TodayPlanCard from '../components/TodayPlanCard';
import workoutData from '../assets/workoutData.json';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [user, setUser] = useState("Jimleston Osoi")
    const [popularWorkouts, setPopularWorkouts] = useState<{ id: number; name: string; duration: string; kcal: string; image: any; }[]>([]);
    const [todayPlan, setTodayPlan] = useState<{ id: number; name: string; target: string; percentage: number; image: any; }[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        // Simulating fetch from JSON data
        setPopularWorkouts(workoutData.popularWorkouts)
        setTodayPlan(workoutData.todayPlan)
    }, [])

    // Function to determine whether it is morning, afternoon, or evening
    const getGreeting = () => {
        const date = new Date()
        const currentHour = date.getHours()

        if (currentHour < 12) {
            return 'Good Morning'
        } else if (currentHour < 18) {
            return 'Good Afternoon'
        } else {
            return 'Good Evening'
        }
    }

    return (
        <View style={styles.container}>
            {/* Welcome info container */}
            <View style={styles.welcomeContainer}>
                <Text style={styles.subText}>{getGreeting()} 🔥</Text>
                <Text style={styles.welcomeText}>{user}</Text>
            </View>

            {/* Search bar container with search icon on the left */}
            <View style={styles.searchContainer}>
                <TextInput 
                    placeholder="Search for a workout"
                    style={styles.searchInput}
                    placeholderTextColor={colors.darkGray}
                />
                <TouchableOpacity style={styles.searchIcon}>
                    <Text>🔍</Text>
                </TouchableOpacity>
            </View>

            {/* Popular workout with horizontal scroll */}
            <View style={styles.popularWorkoutsContainer}>
                <Text style={styles.containerHeading}>Popular Workouts</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {popularWorkouts.map((workout) => (
                        <PopularWorkoutCard workout={workout} />
                    ))}
                </ScrollView>
            </View>

            {/* Today Plan workout vertical scroll */}
            <View style={styles.todayPlanContainer}>
                <Text style={styles.containerHeading}>Today's Plan</Text>
                <ScrollView style={{height: 300, }}>
                    {todayPlan.map(plan => (
                        <TodayPlanCard key={plan.id} todayplan={plan} />
                    ))}
                    <View style={{height: 100}}></View>
                </ScrollView>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.white,
    },
    welcomeContainer: {
        padding: 20,
    },
    subText: {
        color: colors.black,
        fontSize: 16,
        marginBottom: 10,
    },
    welcomeText: {
        color: colors.primary,
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
    },
    searchIcon: {
        padding: 10,
        backgroundColor: colors.lightGray,
        borderRadius: 10,
        marginLeft: 10,
    },
    popularWorkoutsContainer: {
        padding: 10,
    },
    containerHeading: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    todayPlanContainer: {
        padding: 10,
    },
})

export default HomeScreen;
