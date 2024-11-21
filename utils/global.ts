import {create} from 'zustand';

export const globalStore = create(set => ({
  values: {
    item_total: 0,
    item_list: [],
    item_detail: null,
    item_detail_compare: false,
    item_compare: [],
    url: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=25',
  },
  setValues: (key, value) =>
    set(state => ({values: {...state.values, [key]: value}})),
  resetValues: () =>
    set(state => ({
      values: {
        item_total: 0,
        item_list: [],
        item_detail: null,
        item_detail_compare: false,
        item_compare: [],
        url: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=25',
      },
    })),
}));
