import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  Button,
  Card,
  Dialog,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import * as StatusBar from 'react-native';

const PreSeasonCard = (props) => {
  const [playerName, setPlayerName] = React.useState('');

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          console.log('card pressed');
          props.onPress();
        }}>
        <Image style={styles.image} source={props.image} />
        <Text>{props.player}</Text>
        <Text style={styles.title}>{props.text}</Text>
      </TouchableOpacity>
    </>
  );
};

export default PreSeasonCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 20,
    padding: 10,
    backgroundColor: '#ffc87c',
  },
  image: {height: 100, width: 100},
  title: {
    textAlign: 'center',
  },
});
