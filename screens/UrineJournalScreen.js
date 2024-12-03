import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { ButtonGroup, Button } from 'react-native-elements';
import { neon } from "@neondatabase/serverless";

// Utility function to convert HSL to Hex
const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0'); 
  };
  return `${f(0)}${f(8)}${f(4)}`; // Remove the '#' character
};

const UrineJournalScreen = ({ navigation }) => {
  const [sliderValue, setSliderValue] = useState(58);
  const [selectedIndex, setSelectedIndex] = useState('M'); 
  const [yellowShade, setYellowShade] = useState(hslToHex(45, 100, 100 - 55 / 2)); 

  const updateUrineJournal = async (uj_void) => {
    try {
      "use server";
      const databaseUrl = process.env.EXPO_PUBLIC_DATABASE_URL;
      console.log("Using Database URL:", databaseUrl);

      if (!databaseUrl) {
        throw new Error("DATABASE_URL is not set in .env file");
      }

      const sql = neon(databaseUrl);
     
      const response = await sql`
        INSERT INTO mv_urine_journal (uj_date, user_id, uj_volume, uj_void, uj_color)
        VALUES (CURRENT_TIMESTAMP,666666, ${selectedIndex}, ${uj_void}, ${yellowShade})
      `;
      
      console.log("Database updated:", response);
    } catch (error) {
      console.error("Error:", error);
    } 

    setSliderValue(58);
    setSelectedIndex('M'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estimated amount of urine:</Text>
      <ButtonGroup
        buttons={['High', 'Medium', 'Low']}
        containerStyle={styles.buttonGroup}
        buttonStyle={styles.buttons}
        selectedButtonStyle={styles.selectedButton}
        textStyle={styles.buttonText}
        selectedIndex={['H', 'M', 'L'].indexOf(selectedIndex)} 
        onPress={(index) => setSelectedIndex(['H', 'M', 'L'][index])} 
      />
      <View style={[styles.colorBox, { backgroundColor: `#${yellowShade}` }]} />
      <Slider
        style={styles.slider}
        minimumValue={15}
        maximumValue={100}
        value={sliderValue}
        onValueChange={(value) => {
          setSliderValue(value);
          setYellowShade(hslToHex(45, 100, 100 - value / 2)); 
        }}
        minimumTrackTintColor="#FFD700" 
        maximumTrackTintColor="#8B0000" 
        thumbTintColor="#FFFF00" 
      />
      <Button
        title="Enter without a scan"
        buttonStyle={styles.withoutScanButton}
        onPress={() => updateUrineJournal(null)} // Pass null to indicate no scan
      />
      <Button
        title="Enter with a scan"
        buttonStyle={styles.withScanButton}   
        onPress={() => {
          const scanResult = 1; 
          updateUrineJournal(scanResult); 
          navigation.navigate('UltrasoundScreen');
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
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonGroup: {
    backgroundColor: 'transparent', 
    borderWidth: 0, 
    marginBottom: 50,
    alignContent: 'center',
  },
  buttons: {
    backgroundColor: '#007bff', 
    width: 100,
    padding: 0,
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
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10, 
  },
  slider: {
    width: 300,
    borderRadius: 10, 
    marginTop: 20,
    marginBottom: 20,
  },
  withoutScanButton: {
    backgroundColor: '#007bff', 
    marginTop: 20,
    marginBottom: 20, 
    width: 200, 
  },
  withScanButton: {
    backgroundColor: '#007bff', 
    marginTop: 20,
    marginBottom: 20, 
    width: 200, 
  },
});

export default UrineJournalScreen;
