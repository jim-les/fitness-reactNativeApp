import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'workouts.db',
  location: 'default',
  createFromLocation: 1,
});

const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS popular_workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, duration TEXT, kcal TEXT, image TEXT)'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS today_plan (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, target TEXT, percentage INTEGER, image TEXT)'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS user_information (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'username TEXT, ' +
        'password TEXT, ' +
        'calories INTEGER, ' +
        'cycling_training_time TEXT, ' +
        'heart_rate INTEGER, ' +
        'steps INTEGER, ' +
        'sleep_time TEXT, ' +
        'water INTEGER)'
    );
  });
};

initDatabase();

export default db;
