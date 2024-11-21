import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SvgUri} from 'react-native-svg';
import {getPokemonDetail, styles} from '../hook/global';
import {globalStore} from '../utils/global';
import {useShallow} from 'zustand/shallow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BarChart} from 'react-native-gifted-charts';

export default function Detail({...props}: any) {
  const [values, setValues] = globalStore(
    useShallow(state => [state.values, state.setValues]),
  );
  const [stats, setStats] = useState(null);
  const [sprites, setSprites] = useState(false);

  const getData = async e => {
    await getPokemonDetail(e).then(itemm => {
      setValues('item_detail', itemm);
      const b = [];
      itemm.stats.forEach(item => {
        const c = {};
        c.value = item.base_stat;
        c.label = item.stat.name;
        c.topLabelComponent = () => (
          <Text style={{color: 'black'}}>{item.base_stat}</Text>
        );
        c.labelTextStyle = {
          fontSize: 8,
          textTransform: 'capitalize',
        };
        b.push(c);
      });

      setStats(b);
    });
  };

  useEffect(() => {
    getData(props.route.params);
  }, []);

  useEffect(() => {
    const a = values.item_compare;
    const b = values.item_detail;
    if (a && b) {
      const c = a.find(itemm => itemm.name == props.route.params.name);
      if (c) {
        setValues('item_detail_compare', true);
      }else{
        setValues('item_detail_compare', false);
      }
    }
  }, []);

  return (
    <ScrollView>
      {values.item_detail && (
        <>
          <View className="p-4 flex justify-center">
            <View className="gap-8">
              <View style={styles.imageDetail}>
                {!sprites ? (
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                    source={{
                      uri: values.item_detail.sprites.front_default,
                    }}
                  />
                ) : (
                  <SvgUri
                    width="100%"
                    height="100%"
                    uri={`${values.item_detail.sprites.other.dream_world.front_default}`}
                  />
                )}
              </View>
              <View className="gap-4">
                <Text className="text-sm uppercase text-center">
                  sprites version :
                </Text>
                <View className="flex flex-row justify-center">
                  <View className="border-hairline border-black/50 w-[250px] rounded-full">
                    <View className="flex flex-row flex-nowrap">
                      <TouchableOpacity
                        onPress={() => setSprites(false)}
                        className={`p-2 basis-1/2 ${
                          !sprites && 'bg-yellow-300 rounded-l-full'
                        }`}>
                        <Text
                          className={`text-center uppercase text-sm ${
                            !sprites && 'font-medium'
                          }`}>
                          Original
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setSprites(true)}
                        className={`p-2 basis-1/2 ${
                          sprites && 'bg-yellow-400 rounded-r-full'
                        }`}>
                        <Text
                          className={`text-center uppercase text-sm ${
                            sprites && 'font-medium'
                          }`}>
                          Dream World
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="gap-4">
            <View className="flex flex-row flex-nowrap">
              <View className="basis-1/2 bg-yellow-200 flex flex-col items-center justify-center">
                <View className="w-[80px] p-3">
                  <Text className="text-xs">Height :</Text>
                  <Text className="text-xl font-medium">
                    {values.item_detail.information.height}
                  </Text>
                </View>
              </View>
              <View className="basis-1/2 bg-yellow-100 flex flex-col items-center justify-center">
                <View className="w-[80px] p-3">
                  <Text className="text-xs">Weight :</Text>
                  <Text className="text-xl font-medium">
                    {values.item_detail.information.weight}
                  </Text>
                </View>
              </View>
            </View>
            <Text className="text-sm uppercase text-center">types :</Text>
            <View className="flex flex-row justify-center">
              <View className="flex flex-row flex-nowrap gap-2">
                {values.item_detail.information.types.map(item => (
                  <View
                    className="border-hairline bg-yellow-100 rounded-full p-2 w-[100px] flex flex-row justify-center gap-1"
                    key={item.slot}>
                    <Text>
                      <Icon name="circle-multiple" color={'black'} size={15} />
                    </Text>
                    <Text className="uppercase text-xs self-center">
                      {item.type.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <Text className="text-sm uppercase text-center">stats :</Text>
            {stats && (
              <BarChart
                adjustToWidth
                noOfSections={5}
                barBorderRadius={10}
                hideYAxisText
                frontColor="#fde047"
                data={stats}
                yAxisThickness={0}
                xAxisThickness={0}
                isAnimated
              />
            )}
            <Text className="text-sm uppercase text-center">abilities :</Text>
            <View className="flex flex-row flex-wrap">
              {values.item_detail.abilities.map((item, index) => (
                <Abilities data={item.ability} index={index} key={index} />
              ))}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const Abilities = props => {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const a = await axios.get(props.data.url).then(item => {
        if (item.data) {
          setData(item.data.effect_entries[0].short_effect);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data) {
    return (
      <View className="basis-1/2 p-2">
        <View
          className={`bg-yellow-${
            props.index + 1
          }00 h-[200px] rounded-xl p-5 gap-2`}>
          <Text className="capitalize text-lg font-medium">
            {props.data.name}
          </Text>
          <Text className="text-sm">{data}</Text>
        </View>
      </View>
    );
  }
};
