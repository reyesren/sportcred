import React from 'react';
import Text from "react-native-paper/src/components/Typography/Text";
import {View} from "react-native";
import {Button, TextInput, Title} from "react-native-paper";

export function ProfileSetupView(props) {
    const [displayName, setDisplayName] = React.useState('');
    const [about, setAbout] = React.useState('');

    return (
        <View
            style={{
                height: 100,
                padding: 40,
            }}>
            <Title style={{padding: 50, alignSelf: 'center'}}>SPORTCRED</Title>
            <TextInput onChangeText={(text) => setDisplayName(text)} label="Display name" />
            <TextInput onChangeText={(text) => setAbout(text)} label="About" />
            <Button
                mode="contained"
                onPress={() =>
                    props.onSubmit({displayName, about})
                }>
                Login
            </Button>
        </View>
    );
}
