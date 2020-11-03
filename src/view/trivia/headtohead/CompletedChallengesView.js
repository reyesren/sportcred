import React, {useState} from "react";
import {FlatList, Text, View} from 'react-native';
import {Button, List, Modal, Portal} from 'react-native-paper'

export function CompletedChallengesView (props) {
    const {listState} = props;

    const [visible, setVisible] = useState(false)

    const showModal = (item) => {
        setVisible(true);
    }

    const hideModal = () => setVisible(false);

    const containerStyle = {backgroundColor: 'white', padding: 20};

    const desc = ({item}) => {
        return <>
            <Text>
                {'opponent' in item && "Opponent: " +  item.opponent}
            </Text>
        </>
    }

    const title = ({item}) => {
        return (
            <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                <Text style={{flex: 3}}> {item.mode === "solo" ? "Solo" : "Head to head"} </Text>

                <>
                    {item.acs > 0 ?
                        <Text style={{color: "green", flex: 1}}> +{item.acs} </Text> :
                        <Text style={{color: "red", flex: 1}}> {item.acs} </Text>}
                </>

                <Text style={{flex: 3, color: "grey", flexGrow: 2}}>
                    {item.date}
                </Text>
            </View>
        );
    }


    const renderItem = ({item}) => {
        return (
            <List.Item
                title={title({item})}
                titleStyle={{}}
                description={desc({item})}
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
                    {/*TODO add game details when ACS is implemented*/}
                    <Text> Game details:  </Text>
                    <Button onPress={hideModal}> Ok </Button>
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