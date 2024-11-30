import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDay, setCurrentDay] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');

  
  useEffect(() => {
    const today = new Date();
   
    const dayOfMonth = today.getDate();
    setCurrentDay(dayOfMonth);

    const monthName = today.toLocaleString('default', { month: 'long' });
    setCurrentMonth(monthName);
  }, []);
  
  const handleMonthChange = (month) => {
    const date = new Date(month.dateString);
    const monthName = date.toLocaleString('default', { month: 'long' });
    setCurrentMonth(monthName);
  };

  const handleDayPress = (day) => {
    const selectedDay = day.dateString;
    if (selectedDate === selectedDay) {
      navigation.navigate('DayDetail', { date: selectedDay });
    } else {
      setSelectedDate(selectedDay);
    }
  };

  const renderCustomDay = ({ date, state }) => {
    const isSelected = selectedDate === date.dateString;
    return (
      <TouchableOpacity onPress={() => handleDayPress(date)}>
        <View style={[styles.dayContainer, isSelected && styles.selectedDay]}>
          <Text style={[styles.dayText, state === 'disabled' && styles.disabledText]}>
            {date.day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        onMonthChange={handleMonthChange}
        renderHeader={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{currentMonth}</Text>
          </View>
        )}
        dayComponent={renderCustomDay}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'lightblue' },
        }}
        style={styles.calendar}
        theme={{
          textDayFontSize: 12, 
          textMonthFontSize: 20, 
          textDayHeaderFontSize: 14, 
          textSectionTitleColor: 'black', 
          textSectionTitleDisabledColor: 'gray', 
          'stylesheet.calendar.header': {
            week: {
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white', 
              paddingVertical: 10, 
            },
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 50,
  },
  calendar: {
    flex: 1,
    width: 350,
    height: 350,
     
    borderWidth: 0,
    borderColor: 'transparent',
  },
  headerContainer: {
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dayContainer: {
    width: 45, 
    height: 80, 
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5, 
    marginHorizontal: 5, 
  },
  selectedDay: {
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  dayText: {
    fontSize: 18, 
  },
  disabledText: {
    color: 'gray',
  },
});

export default CalendarScreen;