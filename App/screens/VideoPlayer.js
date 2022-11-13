import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Colors from '../configs/Color';

import {SIZES, STYLES} from '../configs/Constants';

const VideoPlayer = ({route}) => {
  const {videoId} = route.params;
  return (
    <SafeAreaView style={STYLES.AndroidSafeArea}>
      <View style={styles.container}>
        <YoutubePlayer
          height={SIZES.height}
          play={true}
          videoId={videoId}
          webViewStyle={{
            backgroundColor: Colors.background,
            borderRadius: 10,
          }}
          //   playList={videoId}
        />
      </View>
    </SafeAreaView>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
