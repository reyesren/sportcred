import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Animated, TouchableOpacity} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/core';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(325)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        width: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

/**
 * @param {Object[]} props.questions[]
 * @param {String} props.questions[]._data.answer
 * @param {Number} props.numOfQuestions
 * @param {Function} props.goToResults()
 * @param {Function} props.processResults()
 */
const TriviaMainGameView = (props) => {
  const firstQuestion = props.questions[0];
  const questions = props.questions;
  const numOfQuestions = props.numOfQuestions;

  const interval = 1000;
  const timeBarTotal = 10000;

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
  const [isAnswerHandler, setIsAnswerHandler] = useState(undefined);
  const [intervalId, setIntervalId] = useState(0);
  const [intervalIdTimeBar, setIntervalIdTimeBar] = useState(0);
  const [timeBarLeft, setTimeBarLeft] = useState(timeBarTotal);
  const [timeoutID, setTimeoutID] = useState(0);

  const fadeAnim = useRef(new Animated.Value(325)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  const checkAnswer = (answer) => {
    /* if (
      (answer === 0 && option1 === actualAnswer) ||
      (answer === 1 && option2 === actualAnswer) ||
      (answer === 2 && option3 === actualAnswer) ||
      (answer === 3 && option4 === actualAnswer)
    ) {
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
    return false;*/

    return (
      (answer === 0 && option1 === actualAnswer) ||
      (answer === 1 && option2 === actualAnswer) ||
      (answer === 2 && option3 === actualAnswer) ||
      (answer === 3 && option4 === actualAnswer)
    );
  };

  const answerHandler = (whichAnswer) => {
    // clearInterval(intervalId);
    // clearInterval(intervalIdTimeBar);
    clearTimeout(timeoutID);
    Animated.timing(fadeAnim).stop();
    setIsAnswerHandler(0);
    setAnswerSelected(true);
    setDisabledAnswer1(true);
    setDisabledAnswer2(true);
    setDisabledAnswer3(true);
    setDisabledAnswer4(true);

    if (whichAnswer !== -1) {
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
    if (questionCount === numOfQuestions && isAnswerSelected) {
      setTimeout(() => {
        props.goToResults(score);
        props.processResults(score);
      }, 2000);
    }
  });

  /* useEffect(() => {
    // if (timeBarLeft === 0 && typeof isAnswerHandler !== 'number') {
    if (timeLeft === 0 && typeof isAnswerHandler !== 'number') {
      answerHandler(-1);
    }
  });*/

  useFocusEffect(
    React.useCallback(() => {
      const id = setTimeout(() => {
        answerHandler(-1);
      }, 10000);
      setTimeoutID(id);

      return () => {
        clearTimeout(timeoutID);
      };
    }, []),
  );

  /* useFocusEffect(
    React.useCallback(() => {
      const id = setInterval(() => {
        setTimeLeft((prevState) => {
          return prevState > 0 ? prevState - 1 : 0;
        });
      }, 1000);
      setIntervalId(id);

      return () => {
        clearInterval(intervalId);
      };
    }, []),
  );*/

  /* useFocusEffect(
    React.useCallback(() => {
      const id = setInterval(() => {
        setTimeBarLeft((prevState) => {
          console.log(prevState);
          return prevState > 0 ? prevState - interval : 0;
        });
      }, interval);
      setIntervalIdTimeBar(id);

      return () => {
        clearInterval(intervalIdTimeBar);
      };
    }, []),
  );*/

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
      /* let id = setInterval(() => {
        console.log('interval');
        setTimeLeft((prevState) => {
          return prevState > 0 ? prevState - 1 : 0;
        });
      }, 1000);
      setIntervalId(id);*/

      /* setTimeBarLeft(timeBarTotal);
      const timeBarID = setInterval(() => {
        setTimeBarLeft((prevState) => {
          console.log(prevState);
          return prevState > 0 ? prevState - interval : 0;
        });
      }, interval);
      setIntervalIdTimeBar(timeBarID);*/
      fadeAnim.resetAnimation();
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 10000,
        useNativeDriver: false,
      }).start();
      let id = setTimeout(() => {
        answerHandler(-1);
      }, 10000);
      setTimeoutID(id);

      setIsAnswerHandler(undefined);
    }
  };

  return (
    <View style={styles.container}>
      {/*<FadeInView style={{height: 50, backgroundColor: 'powderblue'}}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          Fading in
        </Text>
      </FadeInView>*/}
      <View>
        <View style={styles.behind} />
        <Animated.View // Special animatable View
          style={{
            height: 50,
            backgroundColor: 'orange',
            width: fadeAnim, // Bind opacity to animated value
            borderRadius: 3,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderBottomWidth: 1,
          }}
        />
      </View>
      {/*<View
        style={[
          styles.timeBar,
          {width: (timeBarLeft / timeBarTotal) * 100 + '%'},
        ]}
      />*/}
      <Text style={styles.questionCounter}>
        Question {questionCount}/{numOfQuestions}
      </Text>
      <View style={styles.scoreContainer}>
        {/*<Text style={styles.timeLeft}>{timeLeft}</Text>*/}
        <Text style={styles.score}>{score}</Text>
      </View>
      <Text style={styles.question}>{question}</Text>
      <TouchableOpacity
        style={[styles.option, {backgroundColor: colorAnswer1}]}
        onPress={() => answerHandler(0)}
        disabled={isDisabledAnswer1}>
        <Text style={styles.optionText}>{option1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, {backgroundColor: colorAnswer2}]}
        onPress={() => answerHandler(1)}
        disabled={isDisabledAnswer2}>
        <Text style={styles.optionText}>{option2}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, {backgroundColor: colorAnswer3}]}
        onPress={() => answerHandler(2)}
        disabled={isDisabledAnswer3}>
        <Text style={styles.optionText}>{option3}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, {backgroundColor: colorAnswer4}]}
        onPress={() => answerHandler(3)}
        disabled={isDisabledAnswer4}>
        <Text style={styles.optionText}>{option4}</Text>
      </TouchableOpacity>
      {/*<Button
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
      </Button>*/}
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
    fontFamily: 'Roboto',
    color: '#6d6d6d',
    alignSelf: 'center',
  },
  scoreContainer: {
    height: 100,
    width: 150,
    backgroundColor: '#ff9020',
    borderWidth: 3,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  score: {
    alignSelf: 'center',
    fontSize: 40,
  },
  question: {
    fontSize: 25,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timeLeft: {
    alignSelf: 'center',
    fontSize: 20,
  },
  behind: {
    height: 50,
    width: 325,
    backgroundColor: '#ffd5b3',
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 3,
  },
  option: {
    borderRadius: 3,
    borderWidth: 1,
  },
  optionText: {
    alignSelf: 'center',
    padding: 10,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
  },
});

export default TriviaMainGameView;
