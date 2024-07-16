const [popularWorkouts, setPopularWorkouts] = React.useState([
    {
        id: 1,
        name: 'Lower Body Training',
        duration: '45 mins',
        kcal: '500 kcal',
        image: require('../assets/fitness.jpg')
    },
    {
        id: 2,
        name: 'Cardio Workout',
        duration: '30 mins',
        kcal: '300 kcal',
        image: require('../assets/fitness.jpg')
    },
    {
        id: 3,
        name: 'Yoga Workout',
        duration: '60 mins',
        kcal: '400 kcal',
        image: require('../assets/fitness.jpg')
    }
])

const [todayPlan, setTodayPlan] = React.useState([
    {
        id: 1,
        name: 'Push Up',
        target: '100 Push up a day',
        percentage: 50, 
        image: require('../assets/fitness.jpg')
    }
])
