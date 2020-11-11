import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card} from 'react-native-paper';
import PreSeasonCard from './PreSeasonCard';

export const PreSeasonView = () => {
  return (
    <>
      <View style={styles.container}>
        <PreSeasonCard
          text="MVP"
          image={require('../../../assets/question.png')}
        />
        <PreSeasonCard
          text="Best Defender"
          image={require('../../../assets/question.png')}
        />
      </View>
      <View style={styles.container}>
        <PreSeasonCard
          text="Most Improved"
          image={require('../../../assets/question.png')}
        />
        <PreSeasonCard
          text="Most Baskets"
          image={require('../../../assets/question.png')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
