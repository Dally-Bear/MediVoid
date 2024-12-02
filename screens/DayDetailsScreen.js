import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Button } from 'react-native';
import { neon } from "@neondatabase/serverless";


const DayDetailScreen = ({ route, navigation }) => {
  const { date } = route.params || {};
  const dateObject = new Date(date);
  const adjustedDate = new Date(dateObject.getTime() + dateObject.getTimezoneOffset() * 60000);
  const [journalData, setJournalData] = useState([]);

  const databaseUrl = process.env.EXPO_PUBLIC_DATABASE_URL;
  console.log("Using Database URL:", databaseUrl);

  useEffect(() => {
    const fetchWaterJournal = async () => {
      try {
        "use server";

        if (!databaseUrl) {
          throw new Error("DATABASE_URL is not set in .env file");
        }

        const sql = neon(databaseUrl);
        const response = await sql`
          SELECT * FROM mv_water_journal WHERE wj_date::date = ${adjustedDate.toISOString().split('T')[0]}
        `;

        setJournalData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWaterJournal();
  }, []); 


  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{adjustedDate.toDateString()}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {journalData.length > 0 ? (
          journalData.map((entry, index) => (
            <View key={index} style={styles.entry}>
              <Text>Type of liquid consumed: {entry.wj_type} </Text>
              <Text>Volume: {entry.wj_volume} {entry.wj_volume_unit}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteEntry(entry.wj_date)}>
                <Text style={styles.deleteButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No entries for this day.</Text>
        )}
    
      </ScrollView>
      <View style={styles.returnButtonContainer}>
        <Button title="Return" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 35,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  entry: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  returnButtonContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default DayDetailScreen;