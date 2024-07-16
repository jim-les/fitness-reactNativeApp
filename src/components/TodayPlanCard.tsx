import { View, Text, StyleSheet, Image, TouchableOpacity, Touchable, Dimensions } from 'react-native'
import React from 'react';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width

const images = [require('../assets/fitness.jpg'), require('../assets/slide5.png'), require('../assets/fitness.jpg'), require('../assets/upperLegs.png')]

interface Props {
    todayplan: {
        id: number,
        name: string,
        target: string,
        percentage: number,
        image: any
    }
}

const TodayPlanCard: React.FC<Props> = ({ todayplan }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Timer', { plan: 2 })}>
            <View style={styles.imageContainer}>
                <Image source={images[todayplan.id]} style={styles.image} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{todayplan.name}</Text>
                <View style={styles.subTextContainer}>
                    <Text style={styles.subText}>{todayplan.target}</Text>
                </View>

                {/* progress horizontalbar */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${todayplan.percentage}%` }]} >
                        <Text style={styles.progressText}>{todayplan.percentage}%</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: width,
        height: 120,
        backgroundColor: colors.white,
        borderRadius: 23,
        marginHorizontal: 10,
        marginVertical: 10,
        display: 'flex',
        elevation: 20,
        shadowColor: colors.darkGray,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flexDirection: 'row',
    },
    
    imageContainer: {
        width: '30%',
        height: '100%',
        borderRadius: 23,
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        width: '70%',
        height: '100%',
        padding: 10,
    },
    title: {
        color:  colors.darkGray,
        fontSize: 20,
        fontWeight: 'bold',
    },

    subTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    subText: {
        color: colors.darkGray,
        fontSize: 16,
        marginVertical: 5,
    },

    progressContainer: {
        width: '80%',
        height: 15,
        backgroundColor: colors.lightGray,
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: 5,
    },
    progressBar: {
        height: '100%',
        backgroundColor: colors.darkGreen,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        color: colors.darkGray,
        fontSize: 12,
        fontWeight: 'bold',
    },
   
})

export default TodayPlanCard