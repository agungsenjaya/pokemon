import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Compare from '../screens/compare';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../hook/global';

const Tab = createBottomTabNavigator();

export default function HomeNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 18,
        },
        headerTintColor: 'black',
        headerTitleAlign: 'center',
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarInactiveBackgroundColor: 'white',
        tabBarActiveBackgroundColor: '#fde047',
      }}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          headerTitle: '',
          headerLeft: () => (
            <View>
              <Image
                style={styles.imagesLogo}
                source={{
                  uri: 'https://static.vecteezy.com/system/resources/previews/027/127/571/non_2x/pokemon-logo-pokemon-icon-transparent-free-png.png',
                }}
              />
            </View>
          ),
          headerRight: () => (
            <View className='mr-2'>
              <Text className="text-right text-xs uppercase">
                Credits By : 
              </Text>
              <Text className="text-right font-bold">Agung Senjaya</Text>
            </View>
          ),
          title: 'Home',
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Icon
                name="home-variant"
                color={focused ? 'black' : 'black'}
                size={25}
              />
            );
          },
          // headerStyle: {
          //   elevation: 0,
          //   shadowOpacity: 0,
          //   borderBottomWidth: 0,
          // },
        }}
        component={Home}
      />
      <Tab.Screen
        name="CompareScreen"
        options={{
          headerTitle: 'Compare',
          title: 'Compare',
          headerShown:false,
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Icon
                name="circle-slice-4"
                color={focused ? 'black' : 'black'}
                size={25}
              />
            );
          },
        }}
        component={Compare}
      />
    </Tab.Navigator>
  );
}
