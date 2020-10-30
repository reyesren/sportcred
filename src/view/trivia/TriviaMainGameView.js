import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';

const TriviaMainGameView = () => {
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(1);
  const [colorAnswer1, setColorAnswer1] = useState('orange');
  const [colorAnswer2, setColorAnswer2] = useState('orange');
  const [colorAnswer3, setColorAnswer3] = useState('orange');
  const [colorAnswer4, setColorAnswer4] = useState('orange');
  const [answer1, setAnswer1] = useState('Question 1');
  const [answer2, setAnswer2] = useState('Question 2');
  const [answer3, setAnswer3] = useState('Question 3');
  const [answer4, setAnswer4] = useState('Question 4');
  const [isDisabledAnswer1, setDisabledAnswer1] = useState(false);
  const [isDisabledAnswer2, setDisabledAnswer2] = useState(false);
  const [isDisabledAnswer3, setDisabledAnswer3] = useState(false);
  const [isDisabledAnswer4, setDisabledAnswer4] = useState(false);
  const [index, setIndex] = useState(0);

  const mockBackendCheckAnswer = (answer) => {
    if (answer === 1) {
      return true;
    } else {
      return false;
    }
  };

  const mockBackendGetAnswers = () => {
    setIndex(index + 1);
    return [
      'answer' + index,
      'answer' + (index + 1),
      'answer' + (index + 2),
      'answer' + (index + 3),
    ];
  };

  const answerHandler = (whichAnswer) => {
    if (whichAnswer === 1) {
      setDisabledAnswer2(true);
      setDisabledAnswer3(true);
      setDisabledAnswer4(true);
    } else if (whichAnswer === 2) {
      setDisabledAnswer1(true);
      setDisabledAnswer3(true);
      setDisabledAnswer4(true);
    } else if (whichAnswer === 3) {
      setDisabledAnswer1(true);
      setDisabledAnswer2(true);
      setDisabledAnswer4(true);
    } else {
      setDisabledAnswer1(true);
      setDisabledAnswer2(true);
      setDisabledAnswer3(true);
    }
    if (mockBackendCheckAnswer(whichAnswer)) {
      setScore(score + 1);
      if (whichAnswer === 1) {
        setColorAnswer1('green');
      } else if (whichAnswer === 2) {
        setColorAnswer2('green');
      } else if (whichAnswer === 3) {
        setColorAnswer3('green');
      } else {
        setColorAnswer4('green');
      }
    } else {
      if (whichAnswer === 1) {
        setColorAnswer1('red');
      } else if (whichAnswer === 2) {
        setColorAnswer2('red');
      } else if (whichAnswer === 3) {
        setColorAnswer3('red');
      } else {
        setColorAnswer4('red');
      }
    }
    setTimeout(() => updateAnswers(whichAnswer), 2000);
  };

  const updateAnswers = (whichAnswer) => {
    const questions = mockBackendGetAnswers(whichAnswer);
    setAnswer1(questions[0]);
    setAnswer2(questions[1]);
    setAnswer3(questions[2]);
    setAnswer4(questions[3]);
    setQuestionCount(questionCount + 1);
    setColorAnswer1('orange');
    setColorAnswer2('orange');
    setColorAnswer3('orange');
    setColorAnswer4('orange');
    setDisabledAnswer1(false);
    setDisabledAnswer2(false);
    setDisabledAnswer3(false);
    setDisabledAnswer4(false);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.header}>TRIVIA</Title>
      <Text style={styles.questionCounter}>Question {questionCount}/10</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
      </View>
      <Text style={styles.question}>
        Trivia question that the user answers?
      </Text>
      <Button
        mode="contained"
        style={{backgroundColor: colorAnswer1}}
        onPress={() => answerHandler(1)}
        disabled={isDisabledAnswer1}>
        {answer1}
      </Button>
      <Button
        mode="contained"
        style={{backgroundColor: colorAnswer2}}
        onPress={() => answerHandler(2)}
        disabled={isDisabledAnswer2}>
        {answer2}
      </Button>
      <Button
        mode="contained"
        style={{backgroundColor: colorAnswer3}}
        onPress={() => answerHandler(3)}
        disabled={isDisabledAnswer3}>
        {answer3}
      </Button>
      <Button
        mode="contained"
        style={{backgroundColor: colorAnswer4}}
        onPress={() => answerHandler(4)}
        disabled={isDisabledAnswer4}>
        {answer4}
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
});

export default TriviaMainGameView;
