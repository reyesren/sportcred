import React, {useContext, useEffect, useState} from "react";
import {View, FlatList, Text} from 'react-native'
import {Button, List, Modal, Portal, Snackbar} from "react-native-paper";
import Slider from '@react-native-community/slider';


export const DebateListView = (props) => {
    console.log(JSON.stringify(props.list, null, 2))
    const [modalVisible, setModalVisible]   = useState(false);
    const [sbVisible, setSbVisible]   = useState(false);
    const [uid, setUid]                     = useState('')
    const [questionId, setQuestionId]       = useState('')
    const [scale, setScale]                 = useState(0.5)

    const showModal = (item) => {
        setUid(item.uid)
        setQuestionId(item.qid)
        setModalVisible(true);
    };
    const hideModal = () => setModalVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, alignItems: 'center', justifyContent: 'center'};

    const renderItem = ({item}) => {
        return (
            <List.Item
                title={item.question}
                description={item.response}
                descriptionNumberOfLines={10}
                onPress={() => showModal(item)}
            />
        );
    };

    const setRating = () => {
        props.addRating(uid, props.user.uid, scale, questionId, showSnackbar)
    }

    const showSnackbar = () => {
        setSbVisible(true)
    }

    const hideSnackbar = () => {
        setSbVisible(false)
    }

    const emptyList = () => {
        return <></>;
    };

    return (
        <View>
            <Portal>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text> I agree {(scale * 100).toFixed(0)}%</Text>
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={1}
                        value={scale}
                        step={0.01}
                        onSlidingComplete={setScale}
                        minimumTrackTintColor="#FF6060"
                        maximumTrackTintColor="#000000"
                    />
                    <Button onPress={() => {
                        setRating();
                        hideModal();
                    }
                    }>
                        Submit rating
                    </Button>
                    <Button onPress={hideModal}> Cancel </Button>
                </Modal>
            </Portal>

            <FlatList
                data={props.list}
                renderItem={renderItem}
                keyExtractor={(item) => item.uid}
                ListEmptyComponent={emptyList}
            />

            <Snackbar
                visible={sbVisible}
                onDismiss={hideSnackbar}
            >
                Rating sent!
            </Snackbar>
        </View>
    )
}