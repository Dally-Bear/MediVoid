import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UltrasoundScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ultrasound</Text>
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

export default UltrasoundScreen;