import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Card, Text} from 'react-native-paper';

const PreSeasonCard = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={props.image} />
      <Text>{props.text}</Text>
    </View>
  );
};

export default PreSeasonCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#ffc87c',
  },
  image: {width: 200, height: 200},
});
