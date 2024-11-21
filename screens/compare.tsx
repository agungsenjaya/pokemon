import {View, Text, Pressable, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStore} from '../utils/global';
import {useShallow} from 'zustand/shallow';
import {styles} from '../hook/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BarChart} from 'react-native-gifted-charts';

const colorBar = ['#fde047', '#000000'];

export default function Compare({navigation}) {
  const [values, setValues] = globalStore(
    useShallow(state => [state.values, state.setValues]),
  );
  return (
    <ScrollView>
      {values.item_compare.length < 2 ? (
        <Pressable
          onPress={() => {
            navigation.navigate('CompareDialog');
          }}
          className="text-white bg-yellow-300  focus:ring-4 focus:ring-yellow-300 px-5 py-2.5">
          <Text className="text-center text-base font-medium">Add Pokemon</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            setValues('item_compare', []);
          }}
          className="text-white bg-red-300  focus:ring-4 focus:ring-red-300 px-5 py-2.5">
          <Text className="text-center text-base font-medium">
            Clear Compare
          </Text>
        </Pressable>
      )}
      {values.item_compare.length > 0 && (
        <View className="flex flex-row flex-wrap border-t-hairline border-black/50">
          {values.item_compare.map((item, index) => (
            <View
              // className={`basis-1/${values.item_compare.length} border-l-hairline border-black/50`}
              className={`basis-1/${values.item_compare.length} border-l-hairline border-black/50`}
              key={index}>
              <View className="gap-4">
                <Pressable
                  onPress={() => {
                    const a = values.item_compare;
                    a.splice(index, 1);
                    setValues('item_compare', a);
                  }}
                  className="text-white bg-red-300  focus:ring-4 focus:ring-red-300 px-5 py-2.5">
                  <Text className="text-center text-base font-medium">
                    Remove
                  </Text>
                </Pressable>
                <View style={styles.imageDetail}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                    source={{
                      uri: item.sprites.front_default,
                    }}
                  />
                </View>
                <Text className="capitalize text-center text-lg font-medium">
                  {item.name}
                </Text>
                <View className="flex flex-row flex-nowrap">
                  <View className="basis-1/2 bg-yellow-200 flex flex-col items-center justify-center">
                    <View className="w-[80px] p-3">
                      <Text className="text-xs">Height :</Text>
                      <Text className="text-xl font-medium">
                        {item.information.height}
                      </Text>
                    </View>
                  </View>
                  <View className="basis-1/2 bg-yellow-100 flex flex-col items-center justify-center">
                    <View className="w-[80px] p-3">
                      <Text className="text-xs">Weight :</Text>
                      <Text className="text-xl font-medium">
                        {item.information.weight}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text className="text-sm uppercase text-center">types :</Text>
                <View
                  className={`${
                    values.item_compare.length > 1 && 'h-[100px]'
                  }`}>
                  <View className="flex flex-row justify-center">
                    <View
                      className={`flex ${
                        values.item_compare.length > 1 ? 'flex-col' : 'flex-row'
                      } flex-nowrap gap-2`}>
                      {item.information.types.map(item => (
                        <View
                          className={`border-hairline bg-yellow-100 rounded-full ${
                            values.item_compare.length > 1 ? 'p-1' : 'p-2'
                          } w-[100px] flex flex-row justify-center gap-1`}
                          key={item.slot}>
                          <Text>
                            <Icon
                              name="circle-multiple"
                              color={'black'}
                              size={15}
                            />
                          </Text>
                          <Text className="uppercase text-xs self-center">
                            {item.type.name}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
                {values.item_compare.length == 1 && (
                  <View className="gap-2">
                    <Text className="text-sm uppercase text-center">
                      stats :
                    </Text>
                    <ChartBars stats={item.stats} />
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
      {values.item_compare.length > 1 && (
        <View className=" gap-2">
          <Text className="text-sm uppercase text-center">compare stats :</Text>
          <View className="flex flex-row justify-center">
            <View
              className={`flex flex-row
              flex-nowrap gap-2`}>
              {values.item_compare.map((item, index) => (
                <View
                  style={{backgroundColor: colorBar[index]}}
                  className={`border-hairline rounded-full p-2
                  } w-[100px]`}
                  key={index}>
                  <Text
                    className={`uppercase text-xs self-center ${
                      index == 0 ? 'text-black' : 'text-white'
                    }`}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <ChartBars />
        </View>
      )}
    </ScrollView>
  );
}

const ChartBars = props => {
  const [values] = globalStore(
    useShallow(state => [state.values, state.setValues]),
  );
  const [stats, setStats] = useState(null);

  const handleSingleStats = e => {
    const b = [];
    e.forEach(item => {
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
  };

  const handleMultiStats = () => {
    const a = values.item_compare;
    const b = [];
    const c = [];
    a.forEach((item, index) => {
      item.stats.forEach(itemm => {
        b.push(itemm);
      });
    });

    const d = b.reduce((acc, stat) => {
      const statName = stat.stat.name;
      acc[statName] = acc[statName] || [];
      acc[statName].push(stat);
      return acc;
    }, {});

    Object.keys(d).forEach(item => {
      d[item].forEach((itemm, index) => {
        const e = {};
        e.value = itemm.base_stat;
        if (index == 0) {
          e.label = itemm.stat.name;
          e.spacing = 2;
          e.labelWidth = 30;
          e.frontColor = colorBar[index];
        } else {
          e.frontColor = colorBar[index];
        }
        e.topLabelComponent = () => (
          <Text style={{color: 'black'}}>{itemm.base_stat}</Text>
        );
        e.labelTextStyle = {
          fontSize: 8,
          textTransform: 'capitalize',
        };
        c.push(e);
      });
    });

    setStats(c);
  };

  useEffect(() => {
    if (values.item_compare.length > 1) {
      handleMultiStats();
    } else {
      if (props.stats) {
        handleSingleStats(props.stats);
      }
    }
  }, []);

  if (stats) {
    if (values.item_compare.length > 1) {
      return (
        <BarChart
          data={stats}
          spacing={24}
          adjustToWidth
          hideYAxisText
          xAxisThickness={0}
          yAxisThickness={0}
          noOfSections={5}
          barBorderRadius={10}
        />
      );
    } else {
      return (
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
      );
    }
  }
};
