import * as React from 'react';
import { TextInput } from 'react-native-paper';

const CMTextfield = ({ label }) => {
  const [text, setText] = React.useState('');

  const textHandler = (text) => {
    setText(text);
    console.log(text);
  };

  return (
    <TextInput label={label} value={text} onChangeText={text => textHandler(text)} />
  );
};

export default CMTextfield;