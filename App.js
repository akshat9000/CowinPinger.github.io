import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Screen1 from "./components/Screen1"
import Screen2 from "./components/Screen2"
import Screen3 from "./components/Screen3"

const Stack = createStackNavigator()
const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="screen1" component={Screen1}/>
    <Stack.Screen name="screen2" component={Screen2}/>
    <Stack.Screen name="screen3" component={Screen3}/>
  </Stack.Navigator>
)

export default function App() {
  const onPress = (item) => {
    console.log(item)
  }
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
