import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {TextInput, Title, Button} from 'react-native-paper';

const LoginTextComponent = (props) => {
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState('');

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
      }}
      >
      <Image
        style={styles.logo}
        source={require('./../../../assets/logo.png')}
      />
      <TextInput onChangeText={(text) => setEmail(text)} label="Email" />
      <TextInput secureTextEntry={true} style={styles.textfield} onChangeText={(text) => setPassword(text)} label="Password" />
      <Button
        mode="contained"
        disabled = {(email && password) ? false : true}
        onPress={() => props.onUserLogin({email, password})}
        style={styles.button}>
        Login
      </Button>
      <Button mode="contained" onPress={() => props.register()} style={styles.button}>
        Sign Up
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    padding: 0
  },
  logo: {
    marginTop: 40,
    marginBottom: 40,
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  textfield: {
    marginTop: 15
  }
});
export default LoginView;
