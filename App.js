import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Formulario from './screens/Fomulario';
import Create from './screens/Create';
import Listagem from './screens/Listagem';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Listagem">
        <Stack.Screen name="Create" component={Create} options={{ headerShown: false }}/>
        <Stack.Screen name="Formulario" component={Formulario} options={{ headerShown: false }}/>
        <Stack.Screen name="Listagem" component={Listagem} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
