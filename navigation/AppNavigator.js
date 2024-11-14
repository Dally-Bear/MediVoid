import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // for icon library
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import WaterJournalScreen from '../screens/WaterJournalScreen';
import UltrasoundScreen from '../screens/UltrasoundScreen';
import ProfilePageScreen from '../screens/ProfilePageScreen';
import UrineJournalScreen from '../screens/UrineJournalScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Water Journal') {
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
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderTopWidth: 2, 
          borderTopColor: 'black',
        },
        tabBarShowLabel: false, 
        headerTitleAlign: 'center', 
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }} // Hide the header for MainTabs
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;