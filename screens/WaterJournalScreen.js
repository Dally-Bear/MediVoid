import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import { neon } from "@neondatabase/serverless";

const WaterJournalScreen = () => {
  const [text, setText] = useState('');
  const [placeholder, setPlaceholder] = useState('Type of liquid consumed'); 
  const [volume, setVolume] = useState(''); 
  const [volumePlaceholder, setVolumePlaceholder] = useState('Enter volume'); 
  const [isMlSelected, setIsMlSelected] = useState(true); 
  const [isOzSelected, setIsOzSelected] = useState(false); 

  const handleMlCheckbox = () => {
    setIsMlSelected(true);
    setIsOzSelected(false);
  };

  const handleOzCheckbox = () => {
    setIsMlSelected(false);
    setIsOzSelected(true);
  };

  const updateWaterJournal = async () => {
    try {
      "use server";
      const databaseUrl = process.env.EXPO_PUBLIC_DATABASE_URL;
      console.log("Using Database URL:", databaseUrl);

      if (!databaseUrl) {
        throw new Error("DATABASE_URL is not set in .env file");
      }

      const sql = neon(databaseUrl);
      const response = await sql`
        INSERT INTO mv_water_journal (wj_date, user_id, wj_type, wj_volume, wj_volume_unit)
        VALUES (CURRENT_TIMESTAMP, 1, ${text}, ${volume}, ${isMlSelected ? 'ml' : 'oz'})
      `;
      
      console.log("Database updated:", response);
      Keyboard.dismiss();
    } catch (error) {
      console.error("Error:", error);
    } 

    setVolume('');
    setText('');   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Journal</Text>
      <TextInput
        style={styles.liquidBox}
        placeholder={placeholder}
        value={text}
        onChangeText={(value) => {
          setText(value);
          if (value) {
            setPlaceholder('');
          } else {
            setPlaceholder('Type of liquid consumed');
          }
        }}
      />
      <TextInput
        style={styles.liquidBox}
        placeholder={volumePlaceholder}
        value={volume}
        onChangeText={(value) => {
          setVolume(value);
          if (value) {
            setVolumePlaceholder('');
          } else {
            setVolumePlaceholder('Enter volume');
          }
        }}
        keyboardType="numeric" 
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          title="ml"
          checked={isMlSelected}
          onPress={handleMlCheckbox}
          containerStyle={styles.checkbox}
        />
        <CheckBox
          title="oz"
          checked={isOzSelected}
          onPress={handleOzCheckbox}
          containerStyle={styles.checkbox}
        />
      </View>
      <Button
        title="Submit"
        buttonStyle={styles.enterButton}
        //onPress={() => console.log('Button Pressed')}
        onPress={updateWaterJournal}
      />
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
  liquidBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  enterButton: {
    backgroundColor: '#007bff', 
    marginTop: 20, 
    width: 200, 
  },
});

export default WaterJournalScreen;