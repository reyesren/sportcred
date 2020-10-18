import React from 'react';
import {Text, View} from 'react-native';
import {TextInput, Title, Button} from 'react-native-paper';

const RegisterSuccessView = ({route, navigation}) => {
  const {name, otherParam} = route.params;
  return (
    <View
      style={{
        height: 100,
        padding: 40,
      }}>
      <Title style={{paddingTop: 100, paddingBottom: 50, textAlign: 'center'}}>
        Your account has been successfully created
      </Title>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('LoginQuestionnaire', {name: 'Jane'})
        }>
        Proceed
      </Button>
    </View>
  );
};
export default RegisterSuccessView;
