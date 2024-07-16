import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    Animated,
    Easing,
    Modal,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import colors from '../config/colors';
const cyclingImage = require('../assets/cyclingImage.png');
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

const ActivityScreen = () => {
    const signalWaves = Array.from({ length: 20 }, () => useRef(new Animated.Value(0)).current);
    const [cups, setCups] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputCups, setInputCups] = useState('');

    useEffect(() => {
        Animated.loop(Animated.stagger(100, signalWaves.map(createSignalWaveAnimation))).start();
    }, []);

    const createSignalWaveAnimation = (animatedValue) => {
        return Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 600,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 600,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]);
    };

    const handleSaveCups = () => {
        if (inputCups) {
            setCups(parseInt(inputCups));
            setInputCups('');
            setModalVisible(false);
        }
    };

    // Get today's date
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Generate days for July 2022
    const generateDaysInMonth = (month, year) => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const daysInJuly = generateDaysInMonth(6, 2022); // July is the 7th month, but month index starts from 0

    return (
        <View style={styles.container}>
            <Text style={styles.containerHeading}>July 2022</Text>
            {/* calendar dates */}
            <View style={styles.calendarContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {daysInJuly.map((day, index) => (
                        <View
                            key={index}
                            style={[
                                styles.calendarDate,
                                day.getDate() === currentDay && day.getMonth() === 6 && day.getFullYear() === 2022
                                    ? styles.currentDate
                                    : {},
                            ]}
                        >
                            <Text style={styles.calendarDateText}>{day.toDateString().split(' ')[0][0]}</Text>
                            <Text style={styles.calendarDateText}>{day.getDate()}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <Text style={[styles.containerHeading, { marginTop: 20 }]}>Today Report</Text>
            <View style={styles.todayReportConatainer}>
                {/* first widget */}
                <View style={styles.firstReportWidget}>
                    {/* calories widget */}
                    <View style={styles.caloriesWidget}>
                        <Text style={styles.caloriesText}>Active calories</Text>
                        <Text style={styles.caloriesValue}>645 Cal</Text>
                    </View>

                    {/* Training time widget */}
                    <View style={styles.trainingWidget}>
                        <Text style={styles.caloriesText}>Training time</Text>
                        <Text style={{ color: colors.black, fontSize: 30, fontWeight: 'bold' }}>0:00 hrs</Text>
                    </View>
                </View>

                {/* second widget cycling widget */}
                <View style={styles.CyclingWidget}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Icon name="bicycle" size={30} color={colors.white} />
                        <Text style={styles.cyclingText}>Cycling</Text>
                    </View>
                    <Image source={cyclingImage} style={{ width: '100%', height: '76%', marginTop: 10 }} />
                </View>

                {/* Heart Rate */}
                <View style={styles.HeartRateWidget}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Icon name="heartbeat" size={30} color={colors.primary} />
                        <Text style={styles.heartRateText}>Heart Rate</Text>
                    </View>

                    {/* signal waves */}
                    <View style={styles.signalWaveContainer}>
                        {signalWaves.map((wave, index) => (
                            <Animated.View key={index} style={[styles.signalWave, { transform: [{ scaleY: wave }] }]} />
                        ))}
                    </View>
                </View>

                {/* Steps Widget container */}
                <View style={styles.StepsgWidgetContainer}>
                    <View style={styles.StepsgWidget}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Icon name="heart" size={30} color={colors.primary} />
                            <Text style={styles.stepsText}>Steps</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: colors.darkGray, fontSize: 16 }}>0/ 1000</Text>
                        </View>
                    </View>

                    <View style={{ height: '30%', backgroundColor: 'pink', marginTop: 10, borderRadius: 8, padding: 10 }}>
                        {/* keep it up emoji */}
                        <Text style={styles.stepsText}>Keep It up 👍</Text>
                    </View>
                </View>

                {/* Sleep widget */}
                <View
                    style={{
                        width: '48%',
                        height: 150,
                        marginVertical: 10,
                        backgroundColor: 'purple',
                        padding: 10,
                        borderRadius: 8,
                        elevation: 10,
                    }}
                >
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Icon name="bed" size={30} color={colors.white} />
                        <Text style={[styles.stepsText, { color: colors.white }]}>Sleep</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ color: colors.white, fontSize: 36, fontWeight: 'bold' }}>8h 30m</Text>
                    </View>
                </View>

                {/* Water widget*/}
                <View
                    style={{
                        width: '48%',
                        height: 150,
                        marginVertical: 10,
                        backgroundColor: 'lightblue',
                        padding: 10,
                        borderRadius: 8,
                        elevation: 10,
                        marginLeft: 10,
                    }}
                >
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Icon name="tint" size={30} color={colors.black} />
                            <Text style={[styles.stepsText, { color: colors.black }]}>Water</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text style={{ color: colors.black, fontSize: 30, fontWeight: 'bold' }}>{cups}/6 Cups</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal for inputting cups */}
            <Modal transparent={true} visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>Enter number of cups</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={inputCups}
                            onChangeText={(text) => setInputCups(text)}
                        />
                        <View style={styles.modalButtons}>
                            <View style={{ marginVertical: 10 }}>
                                <Button title="Save" onPress={handleSaveCups} />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },

    containerHeading: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },

    calendarContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },

    calendarDate: {
        width: 50,
        height: 50,
        backgroundColor: colors.darkGreen,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    currentDate: {
        backgroundColor: colors.black,
    },

    calendarDateText: {
        color: colors.white,
        fontSize: 16,
    },

    todayReportConatainer: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    firstReportWidget: {
        width: '40%',
        height: 200,
        marginVertical: 10,
    },

    caloriesWidget: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 8,
        height: '30%',
        elevation: 10,
    },

    caloriesText: {
        color: colors.darkGray,
        fontSize: 16,
        backgroundColor: 'transparent',
    },

    caloriesValue: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },

    trainingWidget: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 8,
        height: '70%',
        elevation: 10,
        marginTop: 10,
    },

    CyclingWidget: {
        width: '55%',
        height: 200,
        marginVertical: 10,
        backgroundColor: colors.black,
        padding: 10,
        borderRadius: 8,
        elevation: 10,
        marginLeft: 15,
    },

    cyclingText: {
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },

    HeartRateWidget: {
        width: '55%',
        height: 150,
        marginVertical: 10,
        backgroundColor: 'pink',
        padding: 10,
        borderRadius: 8,
        elevation: 10,
    },

    heartRateText: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },

    signalWaveContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        height: '60%',
        width: '90%',
        marginLeft: '5%',
        borderRadius: 8,
        backgroundColor: colors.white,
    },

    signalWave: {
        width: 2,
        height: '50%',
        backgroundColor: colors.black,
        marginVertical: 2,
    },

    StepsgWidgetContainer: {
        width: '40%',
        height: 150,
        marginVertical: 10,
        marginLeft: 10,
        borderRadius: 8,
    },
    
    StepsgWidget: {
        backgroundColor: 'rgba(255, 165, 0, 0.9)',
        padding: 10,
        borderRadius: 8,
        height: '60%',
        elevation: 10,
    },

    stepsText: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },

    modalView: {
        flex: 1,
        margin: 20,
        backgroundColor: colors.black,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 10
    },
    modalContainer: {
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }, 


    modalContent: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 8,
        width: '80%',
    },

    modalHeading: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color: colors.black,
        borderRadius: 5,
        width: '100%',
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: colors.lightGray,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalButtons: {
        width: '100%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '45%',
        alignItems: 'center',
    },
    buttonClose: {
        backgroundColor: colors.primary,
        marginVertical: 20,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },


})

export default ActivityScreen;
