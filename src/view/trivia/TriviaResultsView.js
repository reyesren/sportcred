import {StyleSheet, View} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';

const TriviaResultView = (props) => {
  const renderChart = () => {
    console.log('Reached renderChart');
    if (Object.keys(props.ACSHistory).length === 0) {
      console.log('ACSHistory is undefined');
      return <></>;
    }
    return (
      <LineChart
        data={props.ACSHistory}
        width={350} // from react-native
        height={220}
        yAxisInterval={5}
        chartConfig={{
          backgroundColor: '#FF652F',
          backgroundGradientFrom: '#FF652F',
          backgroundGradientTo: '#FF652F',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingBottom: 5,
          alignSelf: 'center',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Title style={styles.header}>TRIVIA</Title>
      <Text style={styles.subheader}>Results</Text>
      <Text style={styles.questions}>
        You got <Text style={styles.score}>{props.score}</Text> questions right!
      </Text>
      <Text style={styles.ACS}>
        ACS: {props.acs} + {props.score}
      </Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>ACS History</Text>
        {renderChart()}
      </View>
      <Button
        mode="contained"
        onPress={() => {
          props.goToTriviaLanding();
          props.addToAcs(props.score);
        }}>
        Continue
      </Button>
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
