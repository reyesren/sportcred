import React from 'react';
import {View, Platform, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';

export function QuestionnaireView(props) {
  const [q1, setQ1] = React.useState('');
  const [q2, setQ2] = React.useState('');
  const [q3, setQ3] = React.useState('');
  const [q4, setQ4] = React.useState('');
  const [q5, setQ5] = React.useState('');

  return (
    <KeyboardAvoidingView behavior={'height'} style={styles.container}>
      <View style={styles.inner}>
        <View>
          <Text style={styles.header}>Favorite sport?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Question 1"
            onChangeText={(text) => setQ1(text)}
          />
        </View>
        <View>
          <Text style={styles.header}>Age</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Question 2"
            onChangeText={(text) => setQ2(text)}
          />
        </View>
        <View>
          <Text style={styles.header}>Highest level of sport play?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Question 3"
            onChangeText={(text) => setQ3(text)}
          />
        </View>
        <View>
          <Text style={styles.header}>
            What sport would you like to learn / know about?
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Question 4"
            onChangeText={(text) => setQ4(text)}
          />
        </View>
        <View>
          <Text style={styles.header}>Favorite sports team?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Question 5"
            onChangeText={(text) => setQ5(text)}
          />
        </View>
        <Button
          mode="contained"
          onPress={() => props.onSubmit({q1, q2, q3, q4, q5})}>
          Submit
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {},
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
