import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const UltrasoundScreen = () => {
  const [randomNumber, setRandomNumber] = useState(0);

  const randNumberGenerator = () => {
    let ultraNum = Math.floor(Math.random() * 350 + 1);
    if (ultraNum > 100) {
      ultraNum = Math.floor(Math.random() * 350 + 1);
    }
    return ultraNum;
  };

  const handleClick = () => {
    const newNumber = randNumberGenerator();
    setRandomNumber(newNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Number: {randomNumber}</Text>
      <Button title="Generate Number" onPress={handleClick} />
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
    marginBottom: 20,
  },
});

export default UltrasoundScreen;