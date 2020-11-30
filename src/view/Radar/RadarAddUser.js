import React, {useState} from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, TextInput} from 'react-native-paper';

const RadarAddUser = (props) => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  console.log('users', props.users);

  const filterData = (search) => {
    const regex = new RegExp(search);
    setFilteredData([]);
    for (const user of props.users) {
      if (regex.test(user._data.profile.displayName)) {
        setFilteredData((prevState) => prevState.concat(user));
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Search for user by display name'}
        value={search}
        onChangeText={(value) => {
          setSearch(value);
          filterData(value);
        }}
      />
      <FlatList
        data={filteredData}
        initialNumToRender="5"
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                console.log('item id', item.id);
                props.addUser(item.id);
              }}>
              <Text style={styles.itemText}>
                {item._data.profile.displayName}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    padding: 20,
    backgroundColor: '#dddddd',
    borderBottomWidth: 1,
    borderColor: '#808080',
  },
  itemText: {
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  flatlist: {
    paddingVertical: 50,
  },
});

export default RadarAddUser;
