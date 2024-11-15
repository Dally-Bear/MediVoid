import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { ButtonGroup, Button } from 'react-native-elements';

const UrineJournalScreen = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedIndex, setSelectedIndex] = useState(0); 

  
  const yellowShade = `hsl(45, 100%, ${100 - sliderValue / 2}%)`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estimated amount of urine:</Text>
      <ButtonGroup
        buttons={['High', 'Medium', 'Low']}
        containerStyle={styles.buttonGroup}
        buttonStyle={styles.buttons}
        selectedButtonStyle={styles.selectedButton}
        textStyle={styles.buttonText}
        selectedIndex={selectedIndex} 
        onPress={(index) => setSelectedIndex(index)} 
      />
      <View style={[styles.colorBox, { backgroundColor: yellowShade }]} />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={sliderValue}
        onValueChange={setSliderValue}
        minimumTrackTintColor="#FFD700" 
        maximumTrackTintColor="#8B0000" 
        thumbTintColor="#FFFF00" 
      />
      <Button
        title="Enter without a scan"
        buttonStyle={styles.withoutScanButton}
        
      />
      <Button
        title="Enter with a scan"
        buttonStyle={styles.withScanButton}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingTop: 20, 
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonGroup: {
    marginBottom: 20,
    backgroundColor: 'transparent', 
    borderWidth: 0, 
    marginBottom: 50,
  },
  buttons: {
    backgroundColor: '#007bff', 
    width: 100,
  },
  selectedButton: {
    backgroundColor: '#0056b3', 
  },
  buttonText: {
    color: '#FFFFFF', 
  },
  colorBox: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10, 
  },
  slider: {
    width: 300,
    borderRadius: 10, 
    marginBottom: 50,
  },
  withoutScanButton: {
    backgroundColor: '#007bff', 
    marginTop: 20, 
    width: 200, 
  },
  withScanButton: {
    backgroundColor: '#007bff', 
    marginTop: 20, 
    width: 200, 
  },
});

export default UrineJournalScreen;