import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from 'react-native-elements';


const UltrasoundScreen = () => {
  const [ultraImage, setUltraImage] = useState(require('../assets/images/scannerposition.png'));
  const [detailText, setDetailText] = useState('Position the scanner relative to the diagram depicted above, when ready press the button to start the scan.');
  const [scanButton, setScanButton] = useState(true);
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
    if (newNumber < 50) {
      setUltraImage(require('../assets/images/void.png'));
      setDetailText('The scan is complete, results show bladder is mostly voided.');
    } else if (newNumber < 100) {
      setUltraImage(require('../assets/images/partial.png'));
      setDetailText('The scan is complete, results show bladder is partially voided.');
    } else {
      setUltraImage(require('../assets/images/full.png'));
      setDetailText('The scan is complete, results show bladder bladder is not being voided enough, if the issue persists please consult a doctor');
    }
    setScanButton(false);
  };
  const resetScreen = () => {
    setUltraImage(require('../assets/images/scannerposition.png'));
    setDetailText('Position the scanner relative to the diagram depicted above, when ready press the button to start the scan.');
    setScanButton(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ultrasound Scanner 5000</Text>
      <Image
        source={ultraImage}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.directions}>{detailText}</Text>
      {scanButton&&<Button buttonStyle={styles.button} title="Start Scan" onPress={handleClick} />}
      {!scanButton&&<Button buttonStyle={styles.button} title="Confirm" onPress={resetScreen} />}
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
    backgroundColor: "#fff",
  },
  directions: {
    fontSize: 16,
    textAlign: "center",
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#ebf5ff",
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: "60%",
    height: "40%",
    marginBottom: 20,
  },
  button: {
    width: 200,
    backgroundColor: "#007bff",
    marginTop: 20,
    boarder:1,
    borderColor: '#007bff',
  },
  
});

export default UltrasoundScreen;
