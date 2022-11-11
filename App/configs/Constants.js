import {
  Dimensions,
  Platform,
  Appearance,
  StyleSheet,
  StatusBar,
} from 'react-native';
const {width, height} = Dimensions.get('window');

export const SIZES = {
  width,
  height,
};

export const STYLES = StyleSheet.create({
  AndroidSafeArea: {
    flexGrow: 1,
    //backgroundColor: '#ffffff',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

const appTheme = {SIZES, STYLES};

export default appTheme;
