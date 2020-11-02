import {StyleSheet, View} from 'react-native';
import {Divider, Text, Title} from 'react-native-paper';
import React from 'react';

const TriviaResultView = () => {
  return (
    <View style={styles.container}>
      <Title style={styles.header}>TRIVIA</Title>
      <Text style={styles.subheader}>Results</Text>
      <Text style={styles.questions}>
        You got <Text style={styles.score}>7</Text> questions right!
      </Text>
      <Text style={styles.ACS}>ACS: ? + ?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 35,
  },
  header: {
    alignSelf: 'center',
    paddingBottom: 50,
  },
  subheader: {
    fontSize: 20,
    paddingBottom: 30,
    color: 'grey',
  },
  questions: {
    fontSize: 25,
    paddingBottom: 30,
    alignSelf: 'center',
  },
  score: {
    color: 'green',
  },
  ACS: {
    fontSize: 25,
    paddingBottom: 30,
    alignSelf: 'center',
  },
});

export default TriviaResultView;
