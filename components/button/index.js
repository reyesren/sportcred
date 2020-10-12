import * as React from 'react';
import { Button } from 'react-native-paper';

const CMButton = ({ label }) => {
  const pressHandler = () => {
    console.log('pressed');
  };

  return (
    <Button mode="contained" onPress={() => pressHandler()}>
        { label }
      </Button>
  );
};

export default CMButton;