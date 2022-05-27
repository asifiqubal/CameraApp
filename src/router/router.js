import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LandingScreen} from './screen';
const Stack = createStackNavigator();

const StackApp = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Landing" component={LandingScreen} />
    </Stack.Navigator>
  );
};

function AppNavigator(props) {
  return (
    <NavigationContainer>
      <StackApp />
    </NavigationContainer>
  );
}
export default AppNavigator;
