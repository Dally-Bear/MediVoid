import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DayDetailScreen = ({ route, navigation }) => {
  const { date } = route.params;

  return (
    <View style={styles.container}>
      <Text>Details for {date.toDateString()}</Text>
      <Button title="Back to Calendar" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default DayDetailScreen;