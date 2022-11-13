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
import {useSelector, useDispatch} from 'react-redux';

import Navbar from '../components/NavBar';
import Error from '../components/Error';
import List from '../components/List';
import Colors from '../configs/Color';
import {STYLES} from '../configs/Constants';

import {
  getUpComingMoviesAction,
  getActionMoviesAction,
  getAnimationMoviesAction,
  getComedyMoviesAction,
  getDocumentaryMoviesAction,
  getFamilyMoviesAction,
  getFantasyMoviesAction,
  getHorrorMoviesAction,
  getPopularMoviesAction,
  getPopularTvAction,
  getRomanceMoviesAction,
  getScienceFictionMoviesAction,
} from '../store/Home';

const dimensions = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState([]);
  const [currentLogInUser, setCurrentLogInUser] = useState('');

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const upcomingMoviesData = useSelector(state => state.Home.upComingMovieData);
  const popularMoviesData = useSelector(state => state.Home.popularMovies);
  const popularTvData = useSelector(state => state.Home.popularTv);
  const actionMoviesData = useSelector(state => state.Home.actionMovies);
  const animationMoviesData = useSelector(state => state.Home.animationMovies);
  const comedyMoviesData = useSelector(state => state.Home.comedyMovies);
  const documentaryMoviesData = useSelector(
    state => state.Home.documentaryMovies,
  );
  const familyMoviesData = useSelector(state => state.Home.familyMovies);
  const fantasyMoviesData = useSelector(state => state.Home.fantasyMovies);
  const horrorMoviesData = useSelector(state => state.Home.horrorMovies);
  const romanceMoviesData = useSelector(state => state.Home.romanceMovies);
  const scienceFictionMoviesData = useSelector(
    state => state.Home.scienceFictionMovies,
  );

  const dispatch = useDispatch();

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 50);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });

  useEffect(() => {
    getDispatchData();
    setLoaded(true);
  }, []);

  useEffect(() => {
    getupComingMovies();
  }, [upcomingMoviesData]);

  useFocusEffect(
    useCallback(() => {
      getUserName();
    }, []),
  );

  const getDispatchData = async () => {
    try {
      dispatch(getUpComingMoviesAction());
      dispatch(getPopularMoviesAction());
      dispatch(getPopularTvAction());
      dispatch(getActionMoviesAction());
      dispatch(getAnimationMoviesAction());
      dispatch(getComedyMoviesAction());
      dispatch(getDocumentaryMoviesAction());
      dispatch(getFamilyMoviesAction());
      dispatch(getFantasyMoviesAction());
      dispatch(getHorrorMoviesAction());
      dispatch(getRomanceMoviesAction());
      dispatch(getScienceFictionMoviesAction());
    } catch (error) {
      console.log(error);
    }
  };

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

  const getupComingMovies = () => {
    const moviesImagesArray = [];
    upcomingMoviesData?.forEach(movie => {
      moviesImagesArray.push({
        id: movie.id,
        image: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
      });
    });
    setMoviesImages(moviesImagesArray);
  };

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
          onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}
          showsVerticalScrollIndicator={false}>
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
                    source={{uri: item.image}}
                    resizeMode="cover"
                    style={{width: '100%', height: '100%'}}
                  />
                )}
              />
            </View>
          )}
          {popularMoviesData && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMoviesData}
              />
            </View>
          )}
          {actionMoviesData && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Action Movies"
                content={actionMoviesData}
              />
            </View>
          )}
          {animationMoviesData && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Animation Movies"
                content={animationMoviesData}
              />
            </View>
          )}
          {comedyMoviesData && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Comedy Movies"
                content={comedyMoviesData}
              />
            </View>
          )}
          {documentaryMoviesData && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={documentaryMoviesData}
              />
            </View>
          )}
          {familyMoviesData && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMoviesData}
              />
            </View>
          )}
          {fantasyMoviesData && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Fantasy Movies"
                content={fantasyMoviesData}
              />
            </View>
          )}
          {horrorMoviesData && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Horror Movies"
                content={horrorMoviesData}
              />
            </View>
          )}
          {romanceMoviesData && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Romance Movies"
                content={romanceMoviesData}
              />
            </View>
          )}

          {scienceFictionMoviesData && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Science Fiction Movies"
                content={scienceFictionMoviesData}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && (
        <ActivityIndicator
          size="large"
          style={STYLES.activityIndicatorContainer}
        />
      )}
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
