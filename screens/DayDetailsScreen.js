import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DayDetailScreen = ({ route, navigation }) => {
  const { date } = route.params;
  const dateObject = new Date(date); 

  
  const adjustedDate = new Date(dateObject.getTime() + dateObject.getTimezoneOffset() * 60000);

  return (
    <View style={styles.container}>
      <Text>{adjustedDate.toDateString()}</Text>
      <Button title="Return" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DayDetailScreen;