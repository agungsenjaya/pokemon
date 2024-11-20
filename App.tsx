import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import './global.css';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeNavigation from './components/home_navigation';
import Detail from './screens/detail';
import Compare from './screens/compare';
import {name as appName} from './app.json';

let Stack: any = createNativeStackNavigator();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <NavigationContainer theme={customTheme}>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {
              fontSize: 18,
            },
            // headerTintColor: '#145a5b',
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen
            name={'Home'}
            component={HomeNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// import { View, Text } from 'react-native'
// import React from 'react'

// export default function App() {
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   )
// }
