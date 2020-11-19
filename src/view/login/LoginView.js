import React from 'react';
import {Text, View} from 'react-native';
import {TextInput, Title, Button} from 'react-native-paper';

const LoginTextComponent = (props) => {
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

const LoginView = (props) => {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <View
      style={{
        height: 100,
        padding: 40,
      }}>
      <Title style={{padding: 50, alignSelf: 'center'}}>SPORTCRED</Title>
      <TextInput onChangeText={(text) => setEmail(text)} label="Email" />
      <TextInput secureTextEntry={true} onChangeText={(text) => setPassword(text)} label="Password" />
      <Button
        mode="contained"
        onPress={() => props.onUserLogin({email, password})}>
        Login
      </Button>
      <Button mode="contained" onPress={() => props.register()}>
        Sign Up
      </Button>
    </View>
  );
};
export default LoginView;
