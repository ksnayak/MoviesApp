import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';

import {Rating} from 'react-native-ratings';
import dateFormat from 'dateformat';

import {getMovies} from '../services/services';
import Colors from '../configs/Color';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieId = route.params?.movieId;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMovies(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  return (
    <>
      {loaded && (
        <View style={{paddingBottom: 10, backgroundColor: Colors.white}}>
          <ScrollView>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genres => {
                    return (
                      <Text style={styles.genresText} key={genres.id}>
                        {genres.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <Rating
                imageSize={30}
                readonly={true}
                ratingCount={5}
                fractions={3}
                startingValue={movieDetail.vote_average / 2}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Release Date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dd, yyyy ')}
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
      {!loaded && <ActivityIndicator size={'large'} />}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height / 2,
  },
  movieTitle: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genresText: {
    marginRight: 10,
    color: Colors.black,
    fontWeight: 'bold',
  },
  overview: {
    color: Colors.black,
    padding: 15,
  },
  release: {
    color: Colors.black,
    fontWeight: 'bold',
  },
});

export default Detail;
