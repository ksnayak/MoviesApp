import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  FlatList,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import dateFormat from 'dateformat';

import PlayButton from '../components/PlayButton';
import Colors from '../configs/Color';
import {SIZES, STYLES} from '../configs/Constants';
import {getCast, getMovies, getVideos} from '../services/services';

const placeholderImage = require('../assets/images/placeholder.png');

const Detail = ({route, navigation}) => {
  const movieId = route.params?.movieId;

  const [movieDetail, setMovieDetail] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [castData, setCastData] = useState([]);
  const [castDetail, setCastDetail] = useState([]);
  const [trailerKey, setTrailerKey] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMovies(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
    getVideos(movieId, 'movie').then(videoData => {
      setVideoData(videoData);
    });
    getCast(movieId, 'movie').then(castData => {
      setCastData(castData);
    });
  }, [movieId]);

  useEffect(() => {
    getCastDetails();
  }, [castData]);

  useEffect(() => {
    getVideosTrailer();
  }, [videoData]);

  const getVideosTrailer = () => {
    if (videoData) {
      const videos =
        videoData.filter(video => video.type === 'Trailer') ||
        videoData.filter(video => video.type === 'Teaser') ||
        videoData.filter(video => video.type === 'Clip');
      setTrailerKey(videos[0]?.key);
    }
  };

  const getCastDetails = () => {
    if (castData) {
      const castDetailsArray = [];
      const actor = castData.filter(
        cast => cast.known_for_department === 'Acting',
      );
      const size = actor.length > 15 ? 15 : actor.length;
      const actorSlice = actor.slice(0, size);
      actorSlice.forEach(cast => {
        castDetailsArray.push({
          id: cast.id,
          name: cast.original_name,
          character: cast.character,
          profile_path:
            cast.profile_path === null
              ? null
              : 'https://image.tmdb.org/t/p/w500' + cast.profile_path,
        });
      });
      setCastDetail(castDetailsArray);
    }
  };

  const onPlayBtn = () => {
    navigation.navigate('VideoPlayer', {videoId: trailerKey});
  };

  return (
    <>
      {loaded && (
        <SafeAreaView style={{paddingBottom: 10}}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
              <View style={styles.playButton}>
                <PlayButton handlePress={onPlayBtn} />
              </View>
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
                tintColor={Colors.primary}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Release Date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dd, yyyy ')}
              </Text>
            </View>
            <FlatList
              data={castDetail}
              horizontal={true}
              style={{
                paddingVertical: 10,
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => <RenderCastDetail castDetail={item} />}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        </SafeAreaView>
      )}
      {!loaded && (
        <ActivityIndicator
          size="large"
          style={STYLES.activityIndicatorContainer}
        />
      )}
    </>
  );
};

const RenderCastDetail = ({castDetail}) => (
  <View style={styles.castContainer}>
    <Image
      resizeMode="contain"
      style={styles.castImage}
      source={
        castDetail.profile_path
          ? {
              uri: castDetail.profile_path,
            }
          : placeholderImage
      }
    />
    <View style={styles.castDetail}>
      <Text style={styles.castName}>{castDetail.name}</Text>
      <Text style={styles.castCharacter}>{castDetail.character}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  image: {
    height: SIZES.height / 2,
  },
  movieTitle: {
    color: Colors.lightGray,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  container: {
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
    color: Colors.lightGray,
    fontWeight: 'bold',
  },
  overview: {
    color: Colors.lightGray,
    padding: 15,
  },
  release: {
    color: Colors.lightGray,
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  castContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  castImage: {
    height: 130,
    width: 100,
    borderRadius: 20,
  },
  castDetail: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
  },
  castName: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.lightGray,
    textAlign: 'center',
  },
  castCharacter: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.lightGray,
  },
});

export default Detail;
