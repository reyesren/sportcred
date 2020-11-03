import React from 'react';
import ActivityIndicator from 'react-native-paper/src/components/ActivityIndicator';
import {View} from 'react-native';

export function Loading(props) {
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    </>
  );
}
