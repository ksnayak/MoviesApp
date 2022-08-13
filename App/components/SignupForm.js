import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Colors from '../configs/Color';

const SignupForm = ({navigation}) => {
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    username: Yup.string().required().min(2, 'A username is required'),
    password: Yup.string()
      .required()
      .min(6, 'Your Password has to have at least 6 characters'),
    confirmPassword: Yup.string()
      .required()
      .min(6, 'Your Password has to have at least 6 characters'),
    number: Yup.string()
      .required()
      .min(10)
      .max(10, 'A phone number is required'),
  });

  const onSignup = async (email, password, username, number) => {
    try {
      const authUser = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('Firebase Signup Successful', email, password);
      firestore().collection('users').doc(authUser.user.email).set({
        owner_uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        phoneNumber: number,
      });
    } catch (errror) {
      Alert.alert('OOPS!..', errror.message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
          number: '',
        }}
        onSubmit={values => {
          onSignup(
            values.email,
            values.password,
            values.username,
            values.number,
          );
        }}
        validationSchema={SignupFormSchema}
        validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? Colors.lightGray
                      : Colors.danger,
                },
              ]}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={Colors.placeholder}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.username.length || values.username.length >= 2
                      ? Colors.lightGray
                      : Colors.danger,
                },
              ]}>
              <TextInput
                placeholder="Username"
                placeholderTextColor={Colors.placeholder}
                autoCapitalize="none"
                textContentType="username"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 6
                      ? Colors.lightGray
                      : Colors.danger,
                },
              ]}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={Colors.placeholder}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.confirmPassword.length ||
                    (values.confirmPassword.length >= 6 &&
                      values.confirmPassword === values.password)
                      ? Colors.lightGray
                      : Colors.danger,
                },
              ]}>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={Colors.placeholder}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.number.length <= 10
                      ? Colors.lightGray
                      : Colors.danger,
                },
              ]}>
              <TextInput
                placeholder="Number"
                placeholderTextColor={Colors.placeholder}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={handleChange('number')}
                onBlur={handleBlur('number')}
                value={values.number}
              />
            </View>
            <View style={{alignItems: 'flex-end', marginBottom: 30}}>
              <Text style={{color: '#6BB0F5'}}>Forgot password?</Text>
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}>
              <Text style={styles.buttonText}>Sign UP</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text style={{color: Colors.black, paddingHorizontal: 5}}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{color: '#6BB0F5'}}>Log in</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
  inputField: {
    borderRadius: 6,
    padding: 8,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },
  button: isValid => ({
    backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: '600',
    color: Colors.white,
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default SignupForm;
