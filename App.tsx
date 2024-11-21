import {View, Text, StatusBar, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import './global.css';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeNavigation from './components/home_navigation';
import Detail from './screens/detail';
import {globalStore} from './utils/global';
import {useShallow} from 'zustand/shallow';
import CompareDialog from './components/compare_dialog';
import {getPokemonDetail} from './hook/global';

let Stack: any = createNativeStackNavigator();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  const [values, setValues] = globalStore(
    useShallow(state => [state.values, state.setValues]),
  );

  const handleItemAddCompare = () => {
    const a = values.item_compare;
    const b = a.find(itemm => itemm.name == values.item_detail.name);
    if (b) {
      //
    } else {
      setValues('item_compare', [...values.item_compare, values.item_detail]);
      setValues('item_detail_compare', true);
    }
  };

  const handleItemRemoveCompare = () => {
    const a = values.item_compare;
    const b = a.filter(itemm => itemm.name != values.item_detail.name);
    setValues('item_compare', b);
    setValues('item_detail_compare', false);
  };

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
                  {values.item_compare.length < 2 ? (
                    <View>
                      <Pressable
                        onPress={() => {
                          if (!values.item_detail_compare) {
                            handleItemAddCompare();
                          } else {
                            handleItemRemoveCompare();
                          }
                        }}>
                        <Text className="self-center">
                          {!values.item_detail_compare ? 'Compare' : 'Remove'}
                        </Text>
                      </Pressable>
                    </View>
                  ) : (
                    <>
                      {values.item_detail_compare && (
                        <View>
                          <Pressable
                            onPress={() => {
                              handleItemRemoveCompare();
                            }}>
                            <Text className="self-center">Remove</Text>
                          </Pressable>
                        </View>
                      )}
                    </>
                  )}
                </>
              ),
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="CompareDialog"
            component={CompareDialog}
            options={({navigation}) => ({
              title: 'Choose Pokemon',
              headerShown: true,
              // headerRight: () => (
              //   <>
              //     <View>
              //       <Pressable onPress={() => navigation.navigate('Customer')}>
              //         <Text className="text-white self-center">ADD</Text>
              //       </Pressable>
              //     </View>
              //   </>
              // ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
