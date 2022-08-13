import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import Card from './Card';
import Colors from '../configs/Color';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => (
              <Card navigation={navigation} item={item} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    padding: 10,
    paddingBottom: 15,
  },
});

List.propTypes = propTypes;

export default List;
