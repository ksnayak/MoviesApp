import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  Image,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

import Navbar from '../components/NavBar';
import Error from '../components/Error';
import List from '../components/List';
import Colors from '../configs/Color';
import {STYLES} from '../configs/Constants';
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
  const [currentLogInUser, setCurrentLogInUser] = useState('');

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 50);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });

  const getUserName = () => {
    const user = auth().currentUser;
    // console.log('user', user);
    if (user) {
      const unsubscribe = firestore()
        .collection('users')
        .where('owner_uid', '==', user?.uid)
        .limit(1)
        .onSnapshot(snapshot =>
          snapshot.docs.map(doc => {
            setCurrentLogInUser({
              username: doc.data().username,
            });
          }),
        );
      console.log('currentUser', currentLogInUser);
      return unsubscribe;
    } else {
      setCurrentLogInUser('');
    }
  };

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

  useFocusEffect(
    useCallback(() => {
      getUserName();
    }, []),
  );

  return (
    <SafeAreaView style={STYLES.AndroidSafeArea}>
      <Animated.View style={[styles.navbar, {transform: [{translateY}]}]}>
        <Navbar
          navigation={navigation}
          main={true}
          name={currentLogInUser.username}
        />
      </Animated.View>
      {loaded && !error && (
        <ScrollView
          onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <Carousel
                data={moviesImages}
                autoPlay={true}
                autoPlayInterval={2000}
                height={Math.round(dimensions.height / 1.6)}
                width={Math.round(dimensions.width)}
                renderItem={({item}) => (
                  <Image
                    source={{uri: item}}
                    resizeMode="cover"
                    style={{width: '100%', height: '100%'}}
                  />
                )}
              />
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
    </SafeAreaView>
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
    marginBottom: 15,
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 100,
  },
});

export default Home;
