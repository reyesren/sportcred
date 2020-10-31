import React, {useState} from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import Portal, {Button, List} from 'react-native-paper'
import Modal from "react-native-paper";


export default function ChallengeUsersView (props) {
    const { userList, loadMore, onChallenge, page } = props;

    const [visible, setVisible] = useState(false)
    const [userToChallenge, setUserToChallenge] = useState("");

    const showModal = (item) => {
        setUserToChallenge(item.displayName)
        setVisible(true);
    }
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};


    function renderItem({item}) {
        return (
            <List.Item
                title={item.displayName}
                description={"Last Seen: " + item.lastSeen}
                onpress={() => showModal(item)}
            />
        )
    }

    return (
        <>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text> Challenge user {userToChallenge} to a game? </Text>
                    <Button onPress={onChallenge} > Confirm </Button>
                    <Button onPress={hideModal}> Cancel </Button>
                </Modal>
            </Portal>

            <FlatList
            data={userList}
            renderItem={renderItem}
            keyExtractor={item => item.uid}
            onEndReached={loadMore}
            >
            </FlatList>
        </>


    );
}