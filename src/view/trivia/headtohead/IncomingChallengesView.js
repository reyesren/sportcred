import React, {useState} from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import {Modal, Portal, Button, List, Title} from 'react-native-paper'

export function IncomingChallengesView (props) {
    const {listState, onChallenge} = props;

    const [visible, setVisible] = useState(false)
    const [challenger, setChallenger] = useState("");

    const showModal = (item) => {
        setChallenger(item.opDisplayName)
        setVisible(true);
    }

    const hideModal = () => setVisible(false);

    const containerStyle = {backgroundColor: 'white', padding: 20};

    const renderItem = ({item}) => {
        return (
            <List.Item
                title={item.opDisplayName}
                onPress={() => showModal(item)}
            />
        )
    }

    const emptyList = () => {
        return (
            <></>
        );
    }

    return (
        <View>
            {/*<Title>Incoming challenges:</Title>*/}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text> Start game against {challenger}? </Text>
                    <Button onPress={onChallenge} > Accept </Button>
                    <Button onPress={hideModal}> Cancel </Button>
                </Modal>
            </Portal>

            <FlatList
                data={listState}
                renderItem={renderItem}
                ListEmptyComponent={emptyList}
            >
            </FlatList>
        </View>
    );
}