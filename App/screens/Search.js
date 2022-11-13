import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/services';

import Card from '../components/Card';
import Error from '../components/Error';
import Colors from '../configs/Color';
import {STYLES} from '../configs/Constants';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movies, tv]) => {
        const data = [...movies, ...tv];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <SafeAreaView style={STYLES.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Search Movie or TV Show"
            placeholderTextColor={Colors.white}
            onChangeText={onChangeText}
            onSubmitEditing={() => onSubmit(text)}
            value={text}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            onSubmit(text);
          }}>
          <Icon name="search-outline" size={30} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchItems}>
        {/* Searched items results */}
        {searchResults && searchResults.length > 0 && (
          <FlatList
            numColumns={3}
            data={searchResults}
            renderItem={({item}) => (
              <Card navigation={navigation} item={item} />
            )}
            keyExtractor={item => item.id}
          />
        )}

        {/* When searched but no results */}
        {searchResults && searchResults.length == 0 && (
          <View style={styles.noResults}>
            <Text style={styles.text}>No results matching your criteria.</Text>
            <Text style={styles.text}>Try different keywords.</Text>
          </View>
        )}

        {/* When nothing is searched */}
        {!searchResults && (
          <View style={styles.empty}>
            <Text style={styles.text}>Type something to start searching</Text>
          </View>
        )}

        {/* Error */}
        {error && <Error />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    color: Colors.white,
    borderColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    height: 50,
    padding: 8,
  },
  container: {
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },

  searchItems: {
    padding: 5,
  },

  noResults: {
    paddingTop: 20,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    padding: 5,
    fontSize: 18,
  },
});

export default Search;
