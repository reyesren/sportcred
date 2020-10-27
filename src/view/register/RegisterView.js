import React from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {TextInput, Title, Button, HelperText} from 'react-native-paper';
import styles from '../styles/KBAVStyles';

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

  let nameError = '';
  let usernameError = '';
  let emailError = '';
  let passwordError = '';

  const hasNameErrors = () => {
    if (name.length === 0) {
      nameError = 'Name cannot be empty!';
      return true;
    }
    return false;
  };

  const hasUsernameErrors = () => {
    if (username.length === 0) {
      usernameError = 'Username cannot be empty!';
      return true;
    }
    return false;
  };

  function validateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail,
      )
    ) {
      return true;
    }
    return false;
  }

  const hasEmailErrors = () => {
    if (email.length === 0) {
      emailError = 'Email cannot be empty!';
      return true;
    }
    if (!validateEmail(email)) {
      emailError = 'Please enter a valid email.';
      return true;
    }
    return false;
  };

  const hasPasswordErrors = () => {
    if (password.length === 0) {
      passwordError = 'Password cannot be empty!';
      return true;
    }
    if (password.length < 5) {
      passwordError = 'Password must be at least length 5';
      return true;
    }
    return false;
  };

  return (
    <KeyboardAvoidingView behavior={'height'} style={styles.container}>
      <View style={styles.inner}>
        <Title style={{alignSelf: 'center'}}>SPORTCRED</Title>
        <View>
          <TextInput onChangeText={(text) => setName(text)} label="Name" />
          <HelperText type="error" visible={hasNameErrors()}>
            {nameError}
          </HelperText>
        </View>
        <View>
          <TextInput
            onChangeText={(text) => setUsername(text)}
            label="Username"
          />
          <HelperText type="error" visible={hasUsernameErrors()}>
            {usernameError}
          </HelperText>
        </View>
        <View>
          <TextInput onChangeText={(text) => setEmail(text)} label="Email" />
          <HelperText type="error" visible={hasEmailErrors()}>
            {emailError}
          </HelperText>
        </View>
        <View>
          <TextInput
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            label="Password"
          />
          <HelperText type="error" visible={hasPasswordErrors()}>
            {passwordError}
          </HelperText>
        </View>
        <Button
          mode="contained"
          disabled={
            hasNameErrors() ||
            hasEmailErrors() ||
            hasPasswordErrors() ||
            hasUsernameErrors()
          }
          onPress={() =>
            props.onUserRegistered({name, username, email, password})
          }>
          Create Account
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};
export default RegisterView;
