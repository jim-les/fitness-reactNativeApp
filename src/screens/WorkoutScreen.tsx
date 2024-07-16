import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/useAppContext';

const cyclingImage = require('../assets/fitness.jpg');
const images = [
    require('../assets/lowerLegs.png'), 
    require('../assets/lowerLegs.png'), 
    require('../assets/fitness.jpg'), 
    require('../assets/upperLegs.png')
];

const WorkoutScreen = () => {
    const { currentWorkout } = useAppContext();
    const navigation = useNavigation();

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timer, setTimer] = useState(currentWorkout ? currentWorkout.duration : 0);

    useEffect(() => {
        let interval = null;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 0) {
                        clearInterval(interval);
                        setIsTimerRunning(false);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        } else if (!isTimerRunning && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    const toggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    };

    if (!currentWorkout) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>No workout selected</Text>
            </View>
        );
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <View style={styles.container}>
            {/* topbar widget */}
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                    <Icon name="angle-left" size={30} color={colors.white} />
                </TouchableOpacity>
                <Text style={styles.title}>Workout</Text>
            </View>

            {/* Workout widget */}
            <View style={styles.workoutWidget}>
                <View style={styles.topContainer}>
                    <Image source={images[currentWorkout.id % images.length]} style={styles.image} />
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.timerContainer}>
                        <TouchableOpacity style={styles.iconContainer}>
                            <Icon name="clock-o" size={30} color={colors.white} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.subTitle}>Time</Text>
                            <Text style={styles.subInfo}>{currentWorkout.duration} min</Text>
                        </View>
                    </View>
                    <View style={styles.burnsContainer}>
                        <TouchableOpacity style={styles.iconContainer}>
                            <Icon name="fire" size={30} color={colors.white} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.subTitle}>Burns</Text>
                            <Text style={styles.subInfo}>{currentWorkout.kcal} kcal</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.workoutDescription}>
                <Text style={styles.subTitle}>{currentWorkout.name}</Text>
                <Text style={styles.info}>
                    {currentWorkout.description || 'No description available for this workout.'}
                </Text>
            </View>

            <View style={styles.workoutRounds}>
                <View style={styles.roundsHeader}>
                    <Text style={styles.subTitle}>Rounds</Text>
                    <Text style={styles.roundsCount}>1/8</Text>
                </View>

                <View style={styles.timerDisplay}>
                    <Text style={styles.timerText}>{formatTime(timer)}</Text>
                </View>
            </View>

            {/* Let's workout button */}
            <View style={styles.workoutButtonContainer}>
                <TouchableOpacity style={[styles.workoutButton, isTimerRunning && {backgroundColor: "red"}]} onPress={toggleTimer}>
                    <Text style={styles.workoutButtonText}>
                        {isTimerRunning ? 'Stop Workout' : 'Start Workout'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: colors.lightGray,
    },
    icon: {
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        left: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
    },
    workoutWidget: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        marginTop: 20,
    },
    topContainer: {
        width: Dimensions.get('window').width - 20,
        height: 250,
        borderRadius: 30,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        position: 'absolute',
        bottom: '0%',
        width: 308,
        height: 70,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
    },
    iconContainer: {
        backgroundColor: colors.darkGreen,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginRight: 10,
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    burnsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    workoutDescription: {
        padding: 20,
    },
    subTitle: {
        color: colors.white,
        fontSize: 24,
        fontWeight: '800',
    },
    subInfo: {
        color: colors.white,
        fontSize: 16,
    },
    info: {
        color: colors.gray,
        fontSize: 16,
        marginTop: 10,
    },
    workoutRounds: {
        padding: 20,
    },
    roundsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    roundsCount: {
        color: colors.white,
        fontSize: 16,
    },
    workoutButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        position: 'absolute',
        bottom: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    workoutButton: {
        backgroundColor: colors.darkGreen,
        padding: 15,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    workoutButtonText: {
        color: colors.white,
        fontSize: 20,
    },
    message: {
        color: colors.white,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    timerDisplay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    timerText: {
        fontSize: 30,
        color: 'red',
    },
});

export default WorkoutScreen;
