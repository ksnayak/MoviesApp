import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import Error from '../components/Error';
import List from '../components/List';
import Colors from '../configs/Color';
import {
  getPopularMovies,
  getUpComingMovies,
  // getPopularTv,
  getActionMovies,
  getAnimationMovies,
  getComedyMovies,
  getDocumentaryMovies,
  getFamilyMovies,
  getFantasyMovies,
  getHorrorMovies,
  getRomanceMovies,
  getScienceFictionMovies,
} from '../services/services';

const dimensions = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [actionMovies, setActionMovies] = useState();
  const [animationMovies, setAnimationMovies] = useState();
  const [comedyMovies, setComedyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [fantasyMovies, setFantasyMovies] = useState();
  const [horrorMovies, setHorrorMovies] = useState();
  const [romanceMovies, setRomanceMovies] = useState();
  const [scienceFictionMovies, setScienceFictionMovies] = useState();

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpComingMovies(),
      getPopularMovies(),
      getActionMovies(),
      getAnimationMovies(),
      getComedyMovies(),
      getDocumentaryMovies(),
      getFamilyMovies(),
      getFantasyMovies(),
      getHorrorMovies(),
      getRomanceMovies(),
      getScienceFictionMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          actionMoviesData,
          animationMoviesData,
          comedyMoviesData,
          documentaryMoviesData,
          familyMoviesData,
          fantasyMoviesData,
          horrorMoviesData,
          romanceMoviesData,
          ScienceFictionMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });
          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setActionMovies(actionMoviesData);
          setAnimationMovies(animationMoviesData);
          setComedyMovies(comedyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
          setFamilyMovies(familyMoviesData);
          setFantasyMovies(fantasyMoviesData);
          setHorrorMovies(horrorMoviesData);
          setRomanceMovies(romanceMoviesData);
          setScienceFictionMovies(ScienceFictionMoviesData);
          setLoaded(true);
        },
      )
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <View style={{backgroundColor: Colors.primary}}>
      {loaded && !error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <Text>slider</Text>
              {/* <Carousel
                data={moviesImages}
                loop={true}
                autoplay={true}
                height={dimensions.height / 1.5}
                // scrollAnimationDuration={1000}
                onSnapToItem={index => console.log('current index:', index)}
                renderItem={({item}) => (
                  <Image source={{uri: item}} resizeMode="cover" />
                )}
              /> */}
            </View>
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}
          {actionMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Action Movies"
                content={actionMovies}
              />
            </View>
          )}
          {animationMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Animation Movies"
                content={animationMovies}
              />
            </View>
          )}
          {comedyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Comedy Movies"
                content={comedyMovies}
              />
            </View>
          )}
          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={documentaryMovies}
              />
            </View>
          )}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}
          {fantasyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Fantasy Movies"
                content={fantasyMovies}
              />
            </View>
          )}
          {horrorMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Horror Movies"
                content={horrorMovies}
              />
            </View>
          )}
          {romanceMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Romance Movies"
                content={romanceMovies}
              />
            </View>
          )}

          {scienceFictionMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Science Fiction Movies"
                content={scienceFictionMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size={'large'} />}
      {error && <Error />}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: Colors.danger,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
