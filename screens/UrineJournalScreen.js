import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { ButtonGroup, Button } from 'react-native-elements';
import { neon } from "@neondatabase/serverless";

const UrineJournalScreen = () => {
  const [sliderValue, setSliderValue] = useState(55);
  const [selectedIndex, setSelectedIndex] = useState(0); 
  const yellowShade = `hsl(45, 100%, ${100 - sliderValue / 2}%)`;

  const updateUrineJournal = async () => {
    try {
      "use server";
      const databaseUrl = process.env.EXPO_PUBLIC_DATABASE_URL;
      console.log("Using Database URL:", databaseUrl);

      if (!databaseUrl) {
        throw new Error("DATABASE_URL is not set in .env file");
      }

      const sql = neon(databaseUrl);
      const response = await sql`
        INSERT INTO mv_urine_journal (wj_date, user_id, wj_type, wj_volume, wj_volume_unit)
        VALUES (CURRENT_TIMESTAMP, 1, ${text}, ${volume}, ${isMlSelected ? 'ml' : 'oz'})
      `;
      
      console.log("Database updated:", response);
    } catch (error) {
      console.error("Error:", error);
    } 

    setSliderValue('42.5');
    setText('');   

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
        selectedIndex={selectedIndex} 
        onPress={(index) => setSelectedIndex(index)} 
      />
      <View style={[styles.colorBox, { backgroundColor: yellowShade }]} />
      <Slider
        style={styles.slider}
        minimumValue={15}
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
        onPress={updateUrineJournal}
       
        
      />
      <Button
        title="Enter with a scan"
        buttonStyle={styles.withScanButton}   
        onPress={() => {
          updateUrineJournal();
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