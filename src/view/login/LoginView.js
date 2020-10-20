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

const LoginView = ({navigation}) => {
  return (
    <View
      style={{
        height: 100,
        padding: 40,
      }}>
      <Title style={{padding: 50, alignSelf: 'center'}}>SPORTCRED</Title>
      <LoginTextComponent label="Email" />
      <LoginTextComponent label="Password" />
      <Button
        mode="contained"
//        onPress={() =>
//          navigation.navigate('RegisterSuccessView', {name: 'Jane'})
//        }>
        Login
      </Button>
    </View>
  );
};
export default LoginView;
