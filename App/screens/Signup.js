import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import SignupForm from '../components/SignupForm';

const INSTAGRAM_LOGO =
  'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png';

const Signup = ({navigation}) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      {/* <Image source={{uri: INSTAGRAM_LOGO, height: 100, width: 100}} /> */}
      <Image
        source={require('../assets/images/movies.png')}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </View>
    <SignupForm navigation={navigation} />
  </View>
);

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
});
