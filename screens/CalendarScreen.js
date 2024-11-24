import React from 'react';
import { View, StyleSheet } from 'react-native';
import Calendar from 'react-calendar';
import '../screens/styles/Calendar.css'; 

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDayClick = (day) => {
    if (selectedDate && selectedDate.toDateString() === day.toDateString()) {
      navigation.navigate('DayDetail', { date: day });
    } else {
      setSelectedDate(day);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <View style={styles.container}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          onClickDay={handleDayClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default CalendarScreen;
