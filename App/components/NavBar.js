import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import Colors from '../configs/Color';

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
  name: '',
};

class Navbar extends React.PureComponent {
  render() {
    const {navigation, main, name} = this.props;

    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav(main)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.logo}
                source={require('../assets/images/movies.png')}
              />
              <Text style={styles.greetingText}>
                Hello{' '}
                <Text style={{fontSize: 15, fontWeight: '400'}}>{name}</Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon
                name={'search-outline'}
                size={30}
                color={Colors.secondary}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={35} color={Colors.lightGray} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
  },
  mainNav: main => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: main ? 5 : 10,
    alignItems: 'center',
    backgroundColor: main ? Colors.primary : Colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  }),
  greetingText: {
    textAlign: 'center',
    fontSize: 22,
    marginLeft: 20,
    fontWeight: '600',
    color: Colors.white,
  },
});

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
