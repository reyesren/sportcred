import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/core';

/**
 * @param {{answer:string}} The answer to the question
 */
const TriviaMainGameView = (props) => {
  {
    /*
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = () => {
        return true;
      };

      BackHandler.BackHandler.addEventListener('hardwareBackPress', () =>
        backHandler(),
      );

      return () => {
        console.log('cleanup');
        BackHandler.BackHandler.removeEventListener('hardwareBackPress', () =>
          backHandler(),
        );
      };
    }, []),
  );*/
  }

  const firstQuestion = props.questions[0];
  const questions = props.questions;
  const numOfQuestions = props.numOfQuestions;

  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(firstQuestion._data.question);
  const [questionCount, setQuestionCount] = useState(1);
  const [colorAnswer1, setColorAnswer1] = useState('orange');
  const [colorAnswer2, setColorAnswer2] = useState('orange');
  const [colorAnswer3, setColorAnswer3] = useState('orange');
  const [colorAnswer4, setColorAnswer4] = useState('orange');
  const [option1, setOption1] = useState(firstQuestion._data.options[0]);
  const [option2, setOption2] = useState(firstQuestion._data.options[1]);
  const [option3, setOption3] = useState(firstQuestion._data.options[2]);
  const [option4, setOption4] = useState(firstQuestion._data.options[3]);
  const [actualAnswer, setActualAnswer] = useState(firstQuestion._data.answer);
  const [isDisabledAnswer1, setDisabledAnswer1] = useState(false);
  const [isDisabledAnswer2, setDisabledAnswer2] = useState(false);
  const [isDisabledAnswer3, setDisabledAnswer3] = useState(false);
  const [isDisabledAnswer4, setDisabledAnswer4] = useState(false);
  const [isAnswerSelected, setAnswerSelected] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerId, setTimerId] = useState(0);
  const [isAnswerHandler, setIsAnswerHandler] = useState(undefined);
  const [intervalId, setIntervalId] = useState(0);

  const checkAnswer = (answer) => {
    if (answer === 0 && option1 === actualAnswer) {
      return true;
    }
    if (answer === 1 && option2 === actualAnswer) {
      return true;
    }
    if (answer === 2 && option3 === actualAnswer) {
      return true;
    }
    if (answer === 3 && option4 === actualAnswer) {
      return true;
    }
    return false;
  };

  const answerHandler = (whichAnswer) => {
    clearInterval(intervalId);
    setIsAnswerHandler(0);
    setAnswerSelected(true);
    setDisabledAnswer1(true);
    setDisabledAnswer2(true);
    setDisabledAnswer3(true);
    setDisabledAnswer4(true);

    if (whichAnswer != -1) {
      if (checkAnswer(whichAnswer)) {
        setScore(score + 1);
        if (whichAnswer === 0) {
          setColorAnswer1('green');
        } else if (whichAnswer === 1) {
          setColorAnswer2('green');
        } else if (whichAnswer === 2) {
          setColorAnswer3('green');
        } else {
          setColorAnswer4('green');
        }
      } else {
        if (whichAnswer === 0) {
          setColorAnswer1('red');
        } else if (whichAnswer === 1) {
          setColorAnswer2('red');
        } else if (whichAnswer === 2) {
          setColorAnswer3('red');
        } else {
          setColorAnswer4('red');
        }
      }
    } else {
      setColorAnswer1('red');
      setColorAnswer2('red');
      setColorAnswer3('red');
      setColorAnswer4('red');
    }
    setTimeout(() => {
      console.log('setting update answer timeout');
      updateOptions(whichAnswer);
    }, 2000);
  };

  useEffect(() => {
    console.log('page updated');
    console.log('question count', questionCount);
    console.log('isAnswerPressed', isAnswerSelected);
    if (questionCount === numOfQuestions && isAnswerSelected) {
      setTimeout(() => {
        props.goToResults(score);
        props.processResults(score);
      }, 2000);
    }
  });

  useEffect(() => {
    if (timeLeft === 0 && typeof isAnswerHandler !== 'number') {
      answerHandler(-1);
    }
  });

  useFocusEffect(
    React.useCallback(() => {
      const id = setInterval(() => {
        console.log('interval');
        setTimeLeft((prevState) => {
          return prevState > 0 ? prevState - 1 : 0;
        });
      }, 1000);
      setIntervalId(id);

      return () => {
        clearInterval(intervalId);
      };
    }, []),
  );

  const updateOptions = () => {
    setAnswerSelected(false);
    console.log('question count before if statement', questionCount);
    if (questionCount < numOfQuestions) {
      let question = questions[questionCount];
      setQuestion(question._data.question);
      setOption1(question._data.options[0]);
      setOption2(question._data.options[1]);
      setOption3(question._data.options[2]);
      setOption4(question._data.options[3]);
      setQuestionCount((prevState) => prevState + 1);
      setActualAnswer(question._data.answer);
      setColorAnswer1('orange');
      setColorAnswer2('orange');
      setColorAnswer3('orange');
      setColorAnswer4('orange');
      setDisabledAnswer1(false);
      setDisabledAnswer2(false);
      setDisabledAnswer3(false);
      setDisabledAnswer4(false);
      setTimeLeft(10);
      /* clearTimeout(timerId);
      const timerId = setTimeout(() => {
        answerHandler(-1);
      }, 10000);
      setTimerId(timerId);*/
      setIsAnswerHandler(undefined);
      const id = setInterval(() => {
        console.log('interval');
        setTimeLeft((prevState) => {
          return prevState > 0 ? prevState - 1 : 0;
        });
      }, 1000);
      setIntervalId(id);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.header}>TRIVIA</Title>
      <Text style={styles.questionCounter}>
        Question {questionCount}/{numOfQuestions}
      </Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.timeLeft}>{timeLeft}</Text>
        <Text style={styles.score}>{score}</Text>
      </View>
      <Text style={styles.question}>{question}</Text>
      <Button
        mode="contained"
        style={{backgroundColor: colorAnswer1}}
        onPress={() => answerHandler(0)}
        disabled={isDisabledAnswer1}>
        {option1}
      </Button>
      <Button
        mode="contained"
        style={{backgroundColor: colorAnswer2}}
        onPress={() => answerHandler(1)}
        disabled={isDisabledAnswer2}>
        {option2}
      </Button>
      <Button
        mode="contained"
        style={{backgroundColor: colorAnswer3}}
        onPress={() => answerHandler(2)}
        disabled={isDisabledAnswer3}>
        {option3}
      </Button>
      <Button
        mode="contained"
        style={{backgroundColor: colorAnswer4}}
        onPress={() => answerHandler(3)}
        disabled={isDisabledAnswer4}>
        {option4}
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
    paddingTop: 5,
    fontSize: 40,
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
  },
  timeLeft: {
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default TriviaMainGameView;
