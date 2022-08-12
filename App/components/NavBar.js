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
};

class Navbar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.logo}
                source={require('../assets/images/movies.png')}
              />
              <Text style={styles.greetingText}>Hello</Text>
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
              <Icon name={'chevron-back'} size={40} color={Colors.lightGray} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  mainNav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.tertiary,
    marginLeft: 20,
  },
});

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
