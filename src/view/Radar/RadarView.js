import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Button} from 'react-native-paper';

export const RadarView = (props) => {
  const RadarElement = (props) => {
    const styles = StyleSheet.create({
      elementText: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      elementContainer: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#ccc',
        borderRadius: 10,
      },
      elementSubtext: {
        fontSize: 20,
        color: '#555',
      },
    });

    return (
      <View style={styles.elementContainer}>
        <Text style={styles.elementText}>{props.displayName}</Text>
        <Text style={styles.elementSubtext}>{props.status}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button
        mode={'contained'}
        labelStyle={{fontSize: 20}}
        onPress={() => props.goToAddUser()}>
        +
      </Button>
      <View style={{margin: 10}} />
      <FlatList
        data={props.docList}
        renderItem={(item) => {
          console.log('item', item);
          return (
            <RadarElement
              displayName={item.item.profile.displayName}
              status={item.item.profile.about}
            />
          );
        }}
        keyExtractor={(item) => {
          console.log('item id', item.id);
          return item.id;
        }}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
