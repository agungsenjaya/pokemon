import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Detail({...props}: any) {
  const [data, setData] = useState(null);

  const getData = async e => {
    try {
      const a = await axios.get(e).then(item => {
        // if (item.data.sprites) {
        //   setData(item.data.sprites.front_default);
        // }
        if (item.data) {
          console.log(item.data)
          // setData()
        }
      });
    } catch (error) {
      setData(null);
    }
    // if (data) {
    //   return (
    //     <Image
    //       style={styles.imageList}
    //       source={{
    //         uri: data,
    //       }}
    //     />
    //   );
    // } else {
    //   <View className="h-[200px]"></View>;
    // }
  };

  useEffect(() => {
    getData(props.route.params.url);
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(props.route.params)}</Text>
    </View>
  );
}
