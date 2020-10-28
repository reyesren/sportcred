import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';

const TriviaMainGameView = () => {
  return (
    <View style={styles.container}>
      <Title style={styles.header}>TRIVIA</Title>
      <Text style={styles.questionCounter}>Question 1/10</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>5</Text>
      </View>
      <Text style={styles.question}>
        Trivia question that the user answers?
      </Text>
      <Button mode="contained" style={styles.answerButton}>
        Question 1
      </Button>
      <Button mode="contained" style={styles.answerButton}>
        Question 2
      </Button>
      <Button mode="contained" style={styles.answerButton}>
        Question 3
      </Button>
      <Button mode="contained" style={styles.answerButton}>
        Question 4
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 35,
  },
  header: {
    alignSelf: 'center',
    paddingBottom: 50,
  },
  divider: {
    color: '#000000',
    marginBottom: 50,
  },
  questionCounter: {
    fontSize: 20,
  },
  scoreContainer: {
    height: 100,
    width: 150,
    backgroundColor: '#ff9020',
    alignSelf: 'center',
  },
  score: {
    alignSelf: 'center',
    paddingTop: 25,
    fontSize: 40,
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
  },
  answerButton: {},
});

export default TriviaMainGameView;
