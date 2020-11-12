import React from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const DailyCard = () => {

    const openModal = () => {
        // TODO: open modal
    }

    return (
        <>
        <TouchableOpacity onPress={openModal}>
            <View style={styles.container}>
                <Image style={styles.teamImage} source={require('./../../../assets/teamLogos/unknown.png')} />
                <View style={styles.textContainer}>
                    <Text>Match 1</Text>
                    <Text>00/00/00</Text>
                </View>
                <Image style={styles.teamImage} source={require('./../../../assets/teamLogos/unknown.png')} />
            </View>
        </TouchableOpacity>
        </>
    );
}

export default DailyCard;

const styles = StyleSheet.create({
    teamImage: {
        width: 100,
        height: 100
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',     
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#ddd',
        borderRadius: 10,
        minHeight: 140
    },
    textContainer: {
        zIndex: 5,
        flex: 2,
        alignItems: 'center',
        paddingTop: 30
    }
});