import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/useAppContext';

const images = [require('../assets/lowerLegs.png'), require('../assets/lowerLegs.png'), require('../assets/fitness.jpg'), require('../assets/upperLegs.png')];

interface Props {
    workout: {
        id: number,
        name: string,
        duration: string,
        kcal: string,
        image: any
    }
}

const width = Dimensions.get('window').width;

const PopularWorkoutCard: React.FC<Props> = ({ workout }) => {
    const navigation = useNavigation();
    const { setCurrentWorkout } = useAppContext();

    const handlePress = () => {
        setCurrentWorkout(workout);
        navigation.navigate('Workout');
    }

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <View style={styles.imageContainer}>
                <Image source={images[workout.id]} style={styles.image} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{workout.name}</Text>
                <View style={styles.subTextContainer}>
                    <Text style={styles.subText}>{workout.kcal}</Text>
                </View>
                <View style={styles.subTextContainer}>
                    <Text style={styles.subText}>{workout.duration}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: width / 4 * 3,
        height: 200,
        backgroundColor: 'gray',
        borderRadius: 23,
        marginHorizontal: 10,
        marginVertical: 10,
        elevation: 5,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 23,
        overflow: 'hidden',
        position: 'absolute',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        padding: 20,
        width: '80%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
    },
    subTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: colors.lightWhite,
        width: 70,
        padding: 5,
        borderRadius: 10,
    },
    subText: {
        fontSize: 14,
        color: 'gray',
    }
});

export default PopularWorkoutCard;
