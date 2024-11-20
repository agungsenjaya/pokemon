import {View, Text, StatusBar, Pressable} from 'react-native';
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
import {globalStore} from './utils/global';
import {useShallow} from 'zustand/shallow';

let Stack: any = createNativeStackNavigator();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  const values = globalStore(useShallow(state => state.values));
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
            options={{
              headerTitle: values.item_detail
                ? values.item_detail.name[0].toUpperCase() +
                  values.item_detail.name.slice(1)
                : '',
              headerRight: () => (
                <>
                  {values.item_compare.length < 2 && (
                    <View>
                      <Pressable onPress={() => {
                        // 
                      }}>
                        <Text className="self-center">ADD</Text>
                      </Pressable>
                    </View>
                  )}
                </>
              ),
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
