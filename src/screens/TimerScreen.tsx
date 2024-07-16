import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TimerScreen = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [remainingTime, setRemainingTime] = useState(60); // Set your desired timer duration in seconds
    const intervalRef = useRef(null);

    const toggleTimer = () => {
        if (isPlaying) {
            clearInterval(intervalRef.current);
        } else {
            intervalRef.current = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev === 1) {
                        clearInterval(intervalRef.current);
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        setIsPlaying(prev => !prev);
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        setRemainingTime(60);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.timer}>
                <Text style={styles.timerText}>{remainingTime}</Text>
                <Text style={styles.timerLabel}>Seconds</Text>
            </View>

            <TouchableOpacity onPress={toggleTimer} style={styles.controlButton}>
                <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={32} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity onPress={resetTimer} style={styles.controlButton}>
                <Icon name="replay" size={32} color="#FFF" />
            </TouchableOpacity>
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
    timer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
    },
    timerLabel: {
        fontSize: 24,
        color: '#555',
    },
    controlButton: {
        marginVertical: 20,
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 30,
    },
});

export default TimerScreen;
