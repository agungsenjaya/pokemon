import axios from 'axios';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  imageDetail: {
    width: '100%',
    resizeMode: 'contain',
    height: 150,
  },
  imageList: {
    width: '100%',
    resizeMode: 'contain',
    height: 150,
  },
  imagesLogo: {
    width: 100,
    resizeMode: 'contain',
    height: 150,
  },
});

export const getPokemonDetail = async e => {
  try {
    const a = {};
    const b = [];
    await axios.get(e.url).then(item => {
      if (item.data) {
        a.name = e.name;
        a.url = e.url;
        a.sprites = item.data.sprites;
        a.information = {
          height: item.data.height,
          weight: item.data.weight,
          types: item.data.types,
        };
        a.stats = item.data.stats;
        a.abilities = item.data.abilities;
      }
    });
    return a;
  } catch (error) {
    console.log(error);
  }
};
