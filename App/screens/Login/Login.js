import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import LoginForm from '../../components/LoginForm';

const Login = ({navigation}) => (
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
    <LoginForm navigation={navigation} />
  </View>
);

export default Login;

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
