import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UrineJournalScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Urine Journal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export default UrineJournalScreen;