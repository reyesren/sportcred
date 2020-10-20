import React from 'react';
import {Text, View} from 'react-native';
import {TextInput, Title, Button} from 'react-native-paper';

const RegisterTextComponent = (props) => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      style={{marginBottom: 20}}
      label={props.label}
      value={text}
      onChangeText={(text) => setText(text)}
    />
  );
};

const RegisterView = (props) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <View
      style={{
        height: 100,
        padding: 40,
      }}>
      <Title style={{padding: 50, alignSelf: 'center'}}>SPORTCRED</Title>
      <TextInput onChangeText={(text) => setName(text)} label="Name" />
      <TextInput onChangeText={(text) => setUsername(text)} label="Username" />
      <TextInput onChangeText={(text) => setEmail(text)} label="Email" />
      <TextInput onChangeText={(text) => setPassword(text)} label="Password" />
      <Button
        mode="contained"
        onPress={() =>
          props.onUserRegistered({username, password, name, email})
        }>
        Create Account
      </Button>
    </View>
  );
};
export default RegisterView;
