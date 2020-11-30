import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

export const RadarView = (props) => {
  const RadarElement = (props) => {
    const styles = StyleSheet.create({
      elementText: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      elementContainer: {
        padding: 20,
        margin: 10,
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
    <>
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
          return item.profile.displayName;
        }}
      />
    </>
  );
};
