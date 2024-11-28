import React from 'react';
import { View, StyleSheet } from 'react-native';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Ensure the correct path to the CSS file

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
  },
});

export default CalendarScreen;