import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";

const UltrasoundScreen = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [ultraImage, setUltraImage] = useState(require('../assets/scannerposition.png'));
  const [detailText, setDetailText] = useState('Position the scanner relative to the diagram depicted above, when ready press the button to start the scan.');

  const randNumberGenerator = () => {
    let ultraNum = Math.floor(Math.random() * 350 + 1);
    if (ultraNum > 100) {
      ultraNum = Math.floor(Math.random() * 350 + 1);
      if (ultraNum > 100) {
        ultraNum = Math.floor(Math.random() * 350 + 1);
      }
    }
    return ultraNum;
  };

  const handleClick = () => {
    const newNumber = randNumberGenerator();
    setRandomNumber(newNumber);
    if (newNumber < 50) {
      setUltraImage(require('../assets/void.png'));
      setDetailText('The scan is complete, results show bladder is mostly voided.');
    } else if (newNumber < 150) {
      setUltraImage(require('../assets/partial.png'));
      setDetailText('The scan is complete, results show bladder is partially voided.');
    } else {
      setUltraImage(require('../assets/full.png'));
      setDetailText('The scan is complete, results show bladder bladder is not being voided enough, if the issue persists please consult a doctor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ultrasound Screen</Text>
      <Image
        source={ultraImage}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.directions}>{detailText}</Text>
      <Text style={styles.title}>{randomNumber}</Text>
      <Button style ={styles.button} title="Start Scan" onPress={handleClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    paddingVertical: 90,
    backgroundColor: '#FFFFFF',
  },
  directions: {
    fontSize: 16,
    textAlign: "center",
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: "250px",
    height: "250px",
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff', 
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
});

export default UltrasoundScreen;
