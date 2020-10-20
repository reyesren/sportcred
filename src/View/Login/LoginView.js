/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
import {
  CMTextfield,
  EditableText
} from './../../components/index.js';
import { HelperText, TextInput, Button } from 'react-native-paper';

const LoginView = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [usernameChanged, setUsernameChanged] = React.useState(false);
  const [passwordChanged, setPasswordChanged] = React.useState(false);

  const onChangeUsername = text => {
      setUsername(text);
      setUsernameChanged(true);
  }
  const onChangePassword = text => {
      setPassword(text);
      setPasswordChanged(true);
  }

  const usernameIsValid = () => {
    return username == '';
  }
  const passwordIsValid = () => {
    return password == '';
  }

  const usernameHasErrors = () => {
    return usernameIsValid() && usernameChanged;
  }
  const passwordHasErrors = () => {
    return passwordIsValid() && passwordChanged
  }

  const loginButtonHandler = () => {};
    
  const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 50,
        flex: 1,
    },
    textInputContainer: {
        flex: 1,
        marginVertical: 10,
    },
    allContainer: {
        margin: 30,
        marginTop: 100,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    logo: {
      width: '100%',
      height: 100,
      resizeMode: 'contain',
    },
    scrollView: {
      backgroundColor: Colors.lighter,
    },
  });
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          
          <Image style={styles.logo} source={require('./../../../assets/logo.png')} />

          <View style={styles.allContainer}>
              <View style={styles.textInputContainer}>
                <TextInput label='Username' value={username} onChangeText={onChangeUsername} />
                <HelperText type="error" visible={usernameHasErrors()}>
                    Invalid Username
                </HelperText>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput label='Password' value={password} onChangeText={onChangePassword} />
                <HelperText type="error" visible={passwordHasErrors()}>
                    Invalid Password
                </HelperText>
              </View>
              <View style={styles.buttonContainer}>
                  <Button title='Login' onPress={loginButtonHandler}/>
              </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default LoginView;
