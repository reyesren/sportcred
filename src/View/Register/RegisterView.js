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

const RegisterView = () => {
  return (
    <View
      style={{
        height: 100,
        padding: 40,
      }}>
      <Title style={{padding: 50, alignSelf: 'center'}}>SPORTCRED</Title>
      <RegisterTextComponent label="Name" />
      <RegisterTextComponent label="Username" />
      <RegisterTextComponent label="Email" />
      <RegisterTextComponent label="Password" />
      <Button mode="contained">Create Account</Button>
    </View>
  );
};
export default RegisterView;
