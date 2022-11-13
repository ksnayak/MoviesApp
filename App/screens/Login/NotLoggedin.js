import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Colors from '../../configs/Color';

const NotLoggedin = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Let's get started now!</Text>
      <Text style={styles.subtitleText}>
        Or <Text style={{fontWeight: '500'}}>create an account</Text> if not
        registered yet
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.loginBtnContainer}>
        <Text style={styles.btnText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.signupBtnContainer}>
        <Text style={[styles.btnText, {color: Colors.white}]}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotLoggedin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitleText: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 50,
    textAlign: 'center',
  },
  loginBtnContainer: {
    width: '80%',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  signupBtnContainer: {
    width: '80%',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  btnText: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
