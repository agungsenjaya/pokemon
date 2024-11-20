import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {styles} from '../hook/global';

export default function Home({navigation}: any) {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=25',
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
      getData();
    }
  };

  const getData = async () => {
    try {
      const a = await axios.get(url).then(item => {
        if (loading || !hasMore) return;
        if (item.data.results) {
          setLoading(true);
          setData([...data, ...item.data.results]);
          setHasMore(item.data.results.length > 0);
          setPage(page + 1);
          setLoading(false);
        }
        if (item.data.next) {
          setUrl(item.data.next);
        }
        if (item.data.count) {
          setTotal(item.data.count);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sortData =
    data &&
    data.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <View className="p-4 bg-yellow-300 flex flex-row justify-between">
        <Text className="uppercase text-sm">List Of Pokemon :</Text>
        <Text className="uppercase text-sm text-right font-semibold">
          Total : {total}
        </Text>
      </View>
      <ScrollView onScroll={handleScroll}>
        <View className="flex flex-row flex-wrap">
          {data &&
            sortData.map((item, index) => (
              <Pressable
                onPress={() => navigation.navigate('Detail', item)}
                className="basis-1/2"
                key={index}>
                <View className="pb-5 border-hairline border-dashed border-black/50">
                  <Images data={item.url} />
                  <Text className="capitalize text-center text-lg font-medium">
                    {item.name}
                  </Text>
                </View>
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </View>
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
