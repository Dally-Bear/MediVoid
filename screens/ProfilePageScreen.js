import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const ProfilePageScreen = ({ navigation }) => {
  const [notes, setNotes] = useState('');

  return (
    <View style={styles.container}>
      <Icon
        name="person-circle-outline" 
        size={150}
        color="#000"
        style={styles.profileImage}
      />
      <Text style={[styles.text, styles.title]}>John Doe</Text>
      <Text style={[styles.text, styles.email]}>john.doe@example.com</Text>
      <Text style={[styles.text, styles.gender]}>Gender: Male</Text>
      <Text style={[styles.text, styles.Birthdate]}>Birthdate: 01/04/1988</Text>
      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    color: '#000', 
    fontFamily: 'Arial', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    marginBottom: 16,
  },
  gender: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 8,
    
    width: '80%',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
     
  },
  button: {
    backgroundColor: '#007bff', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfilePageScreen;