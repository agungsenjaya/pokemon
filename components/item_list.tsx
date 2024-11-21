import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {getPokemonDetail, styles} from '../hook/global';
import {globalStore} from '../utils/global';
import {useShallow} from 'zustand/shallow';
import {useNavigation} from '@react-navigation/native';

export default function ItemList(props) {
  const navigation = useNavigation();
  const [values, setValues] = globalStore(
    useShallow(state => [state.values, state.setValues]),
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleScroll = event => {
    const {contentOffset, contentSize} = event.nativeEvent;
    const distanceFromBottom =
      contentSize.height - contentOffset.y - Dimensions.get('window').height;
    if (distanceFromBottom < 100 && !loading && hasMore) {
      getPokemonData();
    }
  };

  const getPokemonData = async () => {
    try {
      const a = await axios.get(values.url).then(item => {
        if (loading || !hasMore) return;
        if (item.data.results) {
          setLoading(true);
          setValues('item_list', [...values.item_list, ...item.data.results]);
          setHasMore(item.data.results.length > 0);
          setPage(page + 1);
          setLoading(false);
          setValues('item_total', item.data.count);
        }
        if (item.data.next) {
          setValues('url', item.data.next);
        }
        if (item.data.count) {
          setTotal(item.data.count);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemAddCompare = async e => {
    const a = values.item_compare;
    await getPokemonDetail(e).then(item => {
      const b = a.find(itemm => itemm.name == item.name);
      if (b) {
        //
      } else {
        setValues('item_compare', [...values.item_compare, item]);
        navigation.goBack();
      }
    });
  };

  // === SORT ALPHABET ===
  // const sortData =
  //   values.item_list &&
  //   values.item_list.sort((a, b) => {
  //     const nameA = a.name.toUpperCase();
  //     const nameB = b.name.toUpperCase();
  //     if (nameA < nameB) {
  //       return -1;
  //     }
  //     if (nameA > nameB) {
  //       return 1;
  //     }
  //     return 0;
  //   });

  useEffect(() => {
    getPokemonData();
  }, []);

  return (
    <ScrollView onScroll={handleScroll}>
      <View className="flex flex-row flex-wrap">
        {values.item_list &&
          values.item_list.map((item, index) => (
            <Pressable
              onPress={() => {
                if (props.compare) {
                  handleItemAddCompare(item);
                } else {
                  navigation.navigate('Detail', item);
                }
              }}
              className="basis-1/2"
              key={index}>
              <View className="pb-5 border-hairline border-black/50">
                <Images data={item.url} />
                <Text className="capitalize text-center text-lg font-medium">
                  {item.name}
                </Text>
              </View>
            </Pressable>
          ))}
      </View>
    </ScrollView>
  );
}

const Images = props => {
  const [data, setData] = useState(null);

  const getImage = async e => {
    try {
      const a = await axios.get(e).then(item => {
        if (item.data.sprites) {
          setData(item.data.sprites.front_default);
        }
      });
    } catch (error) {
      setData(null);
    }
  };

  useEffect(() => {
    getImage(props.data);
  }, []);

  if (data) {
    return (
      <Image
        style={styles.imageList}
        source={{
          uri: data,
        }}
      />
    );
  } else {
    <View className="h-[200px]"></View>;
  }
};
