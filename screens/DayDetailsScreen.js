import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import { neon } from "@neondatabase/serverless";

const DayDetailsScreen = ({ route, navigation }) => {
  const { date } = route.params || {};
  const dateObject = new Date(date);
  const adjustedDate = new Date(dateObject.getTime() + dateObject.getTimezoneOffset() * 60000);
  const [journalData, setJournalData] = useState([]);

  const databaseUrl = process.env.EXPO_PUBLIC_DATABASE_URL;
  console.log("Using Database URL:", databaseUrl);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        "use server";

        if (!databaseUrl) {
          throw new Error("DATABASE_URL is not set in .env file");
        }

        const sql = neon(databaseUrl);
        const adjustedDateStr = adjustedDate.toISOString().split('T')[0];
        console.log("Fetching data for date:", adjustedDateStr);

        const waterResponse = await sql`
          SELECT 'water' as type, wj_date as date, user_id, wj_type, wj_volume, wj_volume_unit 
          FROM mv_water_journal 
          WHERE wj_date::date = ${adjustedDateStr}
        `;
        console.log("Water Journal Response:", waterResponse);

        const urineResponse = await sql`
          SELECT 'urine' as type, uj_date as date, user_id, uj_volume, uj_void, uj_color 
          FROM mv_urine_journal 
          WHERE uj_date::date = ${adjustedDateStr}
        `;
        console.log("Urine Journal Response:", urineResponse);

        const combinedData = [...waterResponse, ...urineResponse].sort((a, b) => new Date(a.date) - new Date(b.date));
        console.log("Combined Data:", combinedData);

        setJournalData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJournal();
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
              <View style={styles.entryRow}>
                <View style={styles.entryTextContainer}>
                  {entry.type === 'water' ? (
                    <View style={styles.waterEntry}>
                      <Text>Entry type: Water Journal</Text>
                      <Text>Date: {new Date(entry.date).toLocaleString()}</Text>
                      <Text>Type of liquid consumed: {entry.wj_type}</Text>
                      <Text>Volume: {entry.wj_volume} {entry.wj_volume_unit}</Text>
                    </View>
                  ) : (
                    <View style={styles.urineEntry}>
                      <Text>Entry type: Urine Journal</Text>
                      <Text>Date: {new Date(entry.date).toLocaleString()}</Text>
                      <Text>Volume: {entry.uj_volume}</Text>
                      <Text>Void: {entry.uj_void}</Text>
                      <Text>Color: {entry.uj_color}</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteEntry(entry.date)}>
                  <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
              </View>
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
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  dateContainer: {
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    
    padding: 10,
    width: '100%',
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  entryTextContainer: {
    flex: 1,
  },
  waterEntry: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  urineEntry: {
    backgroundColor: '#FFFF6E',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
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
    marginTop: 20,
  },
});

export default DayDetailsScreen;