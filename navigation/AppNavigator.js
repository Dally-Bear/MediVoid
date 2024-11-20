import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import UrineJournalScreen from '../screens/UrineJournalScreen';
import CalendarScreen from '../screens/CalendarScreen';
import WaterJournalScreen from '../screens/WaterJournalScreen';
import UltrasoundScreen from '../screens/UltrasoundScreen';
import ProfilePageScreen from '../screens/ProfilePageScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Water Journal') {
            iconName = focused ? 'water' : 'water-outline';
          } else if (route.name === 'Ultrasound') {
            iconName = focused ? 'pulse' : 'pulse-outline';
          } else if (route.name === 'Profile Page') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Urine Journal') {
            iconName = focused ? 'journal' : 'journal-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Water Journal" component={WaterJournalScreen} />
      <Tab.Screen name="Ultrasound" component={UltrasoundScreen} />
      <Tab.Screen name="Profile Page" component={ProfilePageScreen} />
      <Tab.Screen name="Urine Journal" component={UrineJournalScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;