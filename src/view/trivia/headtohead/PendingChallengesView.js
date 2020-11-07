import React, {useState} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';
import {Modal, Portal, Button, List, Title} from 'react-native-paper';

export function PendingChallengesView(props) {
  const {listState} = props;

  const renderItem = ({item}) => {
    return (
        <List.Item title={item.opDisplayName}/>
    );
  };

  const emptyList = () => {
    return <></>;
  };

  return (
      <View>
        <FlatList
            data={listState}
            renderItem={renderItem}
            ListEmptyComponent={emptyList}
        />
      </View>
  );
}
