const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = mergeConfig(getDefaultConfig(__dirname), {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'svg','json','css'],
  },
});

module.exports = wrapWithReanimatedMetroConfig(config);
module.exports = withNativeWind(config, {input: './global.css'});
