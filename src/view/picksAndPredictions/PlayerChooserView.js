import {Text, TextInput, Title} from 'react-native-paper';
import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const playerChooserView = (props) => {
  const [search, setSearch] = React.useState('');
  const [selectedId, setSelectedId] = React.useState(null);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Steph Curry',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Lebron James',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Michael Jordan',
    },
  ];

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#a7a7a7' : '#dbdbdb';

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
        onPress={() => {
          setSelectedId(item.id);
          props.goBack();
        }}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Title>Choose a player:</Title>
        <TextInput
          label="Player Name"
          value={search}
          onChangeText={(search) => setSearch(search)}
        />
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    marginVertical: 1,
  },
});

export default playerChooserView;
