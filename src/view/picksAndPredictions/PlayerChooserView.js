import {Text, TextInput, Title} from 'react-native-paper';
import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import players from '../../../assets/players.json';

const playerChooserView = (props) => {
  const [search, setSearch] = React.useState('');
  const [selectedId, setSelectedId] = React.useState(null);
  const [filteredData, setFilteredData] = React.useState([]);

  const DATA = players;

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      {/*<Text>{item.title}</Text>*/}
      <Text>{item.firstName + ' ' + item.lastName}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor =
      item.playerId === selectedId ? '#a7a7a7' : '#dbdbdb';
    return (
      <Item
        item={item}
        onPress={() => {
          //setSelectedId(item.id);
          setSelectedId(item.playerId);
          console.log('player selected', item.playerId);
          props.submitPicks(props.whichAward, item.playerId, props.whichTeam);
          setTimeout(() => props.goBack(), 1000);
        }}
        style={{backgroundColor}}
      />
    );
  };

  const filterData = (search) => {
    const regex = new RegExp(search, 'i');
    const newData = [];
    for (const player of DATA) {
      /*if (search === '') {
        setFilteredData([]);
      }*/
      if (regex.test(player.firstName + ' ' + player.lastName)) {
        newData.push(player);
      }
    }
    setFilteredData(newData);
  };

  return (
    <>
      <View style={styles.container}>
        <Title>Choose a player:</Title>
        <TextInput
          label="Player Name"
          value={search}
          onChangeText={(search) => {
            setSearch(search);
            filterData(search);
          }}
        />
        <FlatList
          //data={DATA}
          data={filteredData}
          initialNumToRender="5"
          renderItem={renderItem}
          keyExtractor={(item) => {
            //item.id;
            return item.playerId.toString();
          }}
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
