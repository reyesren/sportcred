import React from 'react';
import {StyleSheet, View} from 'react-native';
import PreSeasonCard from './PreSeasonCard';

export const PreSeasonView = (props) => {
  return (
    <>
      <View style={styles.container}>
        <PreSeasonCard
          text="MVP"
          image={require('../../../assets/question.png')}
          onPress={() => props.goToPlayerChooser('MVP')}
        />
        <PreSeasonCard
          text="Best Defender"
          image={require('../../../assets/question.png')}
          onPress={() => props.goToPlayerChooser('Best Defender')}
        />
      </View>
      <View style={styles.container}>
        <PreSeasonCard
          text="Most Improved"
          image={require('../../../assets/question.png')}
          onPress={() => props.goToPlayerChooser('Most Improved')}
        />
        <PreSeasonCard
          text="Most Baskets"
          image={require('../../../assets/question.png')}
          onPress={() => props.goToPlayerChooser('Most Baskets')}
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
