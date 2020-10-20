import React from 'react';
import {View} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';

export function QuestionnaireView(props) {
  const [q1, setQ1] = React.useState('');
  const [q2, setQ2] = React.useState('');
  const [q3, setQ3] = React.useState('');
  const [q4, setQ4] = React.useState('');
  const [q5, setQ5] = React.useState('');

  return (
    <View style={{padding: 50}}>
      <Text>Favorite sport?</Text>
      <TextInput
        style={{marginBottom: 20}}
        placeholder="Question 1"
        onChangeText={(text) => setQ1(text)}
      />
      <Text>Age</Text>
      <TextInput
        style={{marginBottom: 20}}
        placeholder="Question 2"
        onChangeText={(text) => setQ2(text)}
      />
      <Text>Highest level of sport play?</Text>
      <TextInput
        style={{marginBottom: 20}}
        placeholder="Question 3"
        onChangeText={(text) => setQ3(text)}
      />
      <Text>What sport would you like to learn / know about?</Text>
      <TextInput
        style={{marginBottom: 20}}
        placeholder="Question 4"
        onChangeText={(text) => setQ4(text)}
      />
      <Text>Favorite sports team?</Text>
      <TextInput
        style={{marginBottom: 20}}
        placeholder="Question 5"
        onChangeText={(text) => setQ5(text)}
      />
      <Button
        mode="contained"
        onPress={() => props.onSubmit({q1, q2, q3, q4, q5})}>
        Submit
      </Button>
    </View>
  );
}
