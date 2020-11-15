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
  const [visible, setVisible] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [playerName, setPlayerName] = React.useState('');
  const [isPlayerChosen, setIsPlayerChosen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#fc8c00' : '#ffc87c';

    const regex = new RegExp(search);

    if (search === '') {
      return <></>;
    }
    if (!regex.test(item.title)) {
      return <></>;
    }
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          console.log('card pressed');
          props.onPress();
        }}>
        <Image style={styles.image} source={props.image} />
        <Text>{playerName}</Text>
        <Text>{props.text}</Text>
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
    backgroundColor: '#ffc87c',
  },
  image: {width: 200, height: 200},
  item: {
    padding: 15,
    marginVertical: 1,
  },
  title: {
    fontSize: 32,
  },
});
