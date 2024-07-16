import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react';
import colors from '../config/colors';
const fitness = require('../assets/fitness.jpg');
const bst = require('../assets/bestWorkout.png');

const width = Dimensions.get('window').width


const ExploreScreen = () => {
    const [ bestFoYor, setBestForYou ] = React.useState([
        {
            id: 1,
            name: 'Belly fat burner',
            duration: '15 mins',
            level: 'Beginner',
            image: require('../assets/slide5.png')
        },
        {
            id: 1,
            name: 'Lose fat',
            duration: '10 mins',
            level: 'Beginner',
            image: require('../assets/slide4.png')
        },

        {
            id: 1,
            name: 'Plank',
            duration: '5 mins',
            level: 'Beginner',
            image: require('../assets/slide3.png')
        },

        {
            id: 1,
            name: 'Plank',
            duration: '5 mins',
            level: 'Beginner',
            image: require('../assets/slide2.png')
        },
        

    ])

    const challanges = [
        {
            id: 1,
            name: 'Plank Challenge',
            image: require('../assets/workout.png')
        },
        {
            id: 2,
            name: 'Sprint Challenge',
            image: require('../assets/sprint.png')
        },
        {
            id: 3,
            name: 'Squat Challenge',
            image: require('../assets/squat.png')
        }
    ]
    const angleRight = ">"

    return (
        <View style={styles.container}>
            {/* Best Quarantibe Workout card */}
            <View style={styles.bestQuarantineWorkoutCard}>
                <Image source={bst} style={styles.cardImage} />
                <View style={{width: "70%", height: '100%'}}>
                    <Text style={styles.cardTitle}>Best Quarantine Workouts</Text>
                    <TouchableOpacity style={styles.cardButton}>
                        <Text style={styles.cardButtonText}>See more {angleRight}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Best for you  workout in grids rows 2*/}
            <Text style={styles.containerHeading}>Popular Workouts</Text>

            <View style={ styles.bestForYouContainer }>
                { bestFoYor.map((item, index) => (
                    <View key={index} style={styles.bestForYouCard}>
                        <Image source={item.image} style={styles.bestForYouImage} />
                        <View style={styles.bestForYouInfo}>
                            <Text style={styles.bestForYouCardText}>{item.name}</Text>
                            <View style={{backgroundColor: colors.lightGray, padding: 2, borderRadius: 5, width: 70, marginVertical: 2}}>
                                <Text style={styles.bestForYouCardTime}>{item.duration}</Text>
                            </ View>
                            <View style={{backgroundColor: colors.lightGray, padding: 2, borderRadius: 5, width: 70,  marginVertical: 2}}>
                                <Text style={styles.bestForYouCardLevel}>{item.level}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            {/* challanges, Plank, sprint challnge, Squat Challange */}
            <Text style={styles.containerHeading}>Challenges</Text>
            <View style={styles.challangeContainer}>
                {challanges.map((item, index) => (
                    <View key={index} style={styles.challangeCard}>
                        <Image source={item.image} style={styles.challangeImage} />
                        <Text style={styles.challangeCardText}>{item.name}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.containerHeading}>Fast Warmup</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    bestQuarantineWorkoutCard: {
        marginVertical: 20,
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.primary,
        width: width - 20,
        height: 180,
        overflow: 'hidden',
    },

    containerHeading: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },

    cardImage: {
        width: '110%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
        opacity: 0.8,
    },

    cardTitle: {
        fontSize: 24,
        color: colors.white,
        fontWeight: 'bold',
    },

    cardButton: {
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        width: "50%",
        position: 'absolute',
        bottom: 0,
    },

    cardButtonText: {
        color: colors.darkGreen,
        fontWeight: 'bold',
    },

    bestForYouContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 20,
        flexWrap: 'wrap',
    },
    
    bestForYouCard: {
        backgroundColor: colors.white,
        borderRadius: 8,
        width: width/2-20,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 2,
        marginVertical: 5,
    },

    bestForYouImage: {
        width: 70,
        height: "90%",
        marginRight: 10,
        borderRadius: 8,
    },

    bestForYouCardText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.black,
    },

    bestForYouCardTime: {
        fontSize: 12,
        color: colors.darkGray,
    },

    bestForYouCardLevel: {
        fontSize: 12,
        color: colors.darkGray,
    },

    challangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 20,
    },

    challangeCard: {
        backgroundColor: colors.white,
        borderRadius: 8,
        width: width/3-20,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    challangeImage: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
        position: 'absolute',
        zIndex: -1,
        opacity: 0.9,
    },

    challangeCardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
    }

})

export default ExploreScreen