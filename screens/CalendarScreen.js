import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Calendar from 'react-calendar';
import '../screens/styles/Calendar.css'; // Ensure the correct path to your CSS file

const CalendarScreen = () => {
  const [value, onChange] = React.useState(new Date());
  return (
    <View style={{ flex: 1 }}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      
        <View style={styles.container}>
          <Calendar
            onChange={onChange}
            value={value}
            className="custom-calendar"
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