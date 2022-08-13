import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import SignupForm from '../../components/SignupForm';

const Signup = ({navigation}) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/images/movies.png')}
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
    paddingTop: 30,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});
