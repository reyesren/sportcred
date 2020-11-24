import React, {useContext, useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";
import {
    Button,
    List,
    Modal,
    Portal,
    Snackbar,
    Headline,
    Caption,
    TextInput,
    HelperText,
    Subheading
} from "react-native-paper";

export const DebateQuestionsView = (props) => {
    const {acs, questions, saveResponse, userLabel} = props

    const [modalVisible, setModalVisible]   = useState(false);
    const [sbVisible, setSbVisible]   = useState(false);
    const [question, setQuestion] = useState('')
    const [response, setResponse] = useState('')

    const showModal = (item) => {
        if (item[0] === userLabel){
            setQuestion(item[1])
            setModalVisible(true);
        }
    };

    function submit() {
        saveResponse(question, response, showSnackbar);
        hideModal()
    }
    const hideModal = () => setModalVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, alignItems: 'center', justifyContent: 'center'};
    const showSnackbar = () => {
        setSbVisible(true)
    }
    const hideSnackbar = () => {
        setSbVisible(false)
    }
    const emptyList = () => {
        return <></>;
    };
    function notEmpty() {
        return response.length < 50
    }

    const renderItem = ({item}) => {
        const l = item[0]
        const q = item[1]
        return (
            <List.Item
                title={q}
                titleNumberOfLines={5}
                titleStyle={{color: l === userLabel ? '#1F6521' : 'grey', textAlign: 'justify', lineHeight: 20}}
                description={l}
                descriptionStyle={{textTransform: 'uppercase', color: l === userLabel ? 'black' : 'grey' }}
                descriptionNumberOfLines={10}
                onPress={() => showModal(item)}
            />
        );
    };
    return (
        <View>
            <Portal>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Subheading>{question}</Subheading>
                    <TextInput label={"Response"} value={response} onChangeText={setResponse} mode={"flat"} multiline={true} style={{width: 350}} numberOfLines={10}/>
                    <HelperText type={"error"} visible={notEmpty()}>
                        Minimum 50 characters
                    </HelperText>
                    <Button mode={"contained"} onPress={submit} disabled={notEmpty()}>
                        Submit response
                    </Button>
                </Modal>
            </Portal>
            <View style={{alignItems: 'center', marginTop: 15, marginBottom: 40}}>
                <Headline>
                    DAILY DEBATE
                </Headline>
                <Caption>ACS: {acs} - {userLabel}</Caption>
            </View>

            <FlatList
                data={questions}
                renderItem={renderItem}
                keyExtractor={(item) => item[0]}
                ListEmptyComponent={emptyList}
            />

            <Snackbar
                visible={sbVisible}
                onDismiss={hideSnackbar}
            >
                Response submitted!
            </Snackbar>
        </View>
    )
}