import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {styles} from '../hook/global';
import {globalStore} from '../utils/global';
import {useShallow} from 'zustand/shallow';
import ItemList from '../components/item_list';

export default function Home({navigation}: any) {
  const [values, setValues] = globalStore(
    useShallow(state => [state.values, state.setValues]),
  );

  return (
    <View>
      <View className="p-4 bg-yellow-200 flex flex-row justify-between">
        <Text className="uppercase text-sm">List Of Pokemon :</Text>
        <Text className="uppercase text-sm text-right font-medium">
          Total : 0
        </Text>
      </View>
      <ItemList />
    </View>
  );
}