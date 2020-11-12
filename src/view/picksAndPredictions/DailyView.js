import React from "react";
import {StyleSheet, View, Text, Image} from 'react-native';
import DailyCard from './DailyCard';

export const DailyView = () => {

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.sectionHeader}>Today's Picks</Text>
                <DailyCard />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    sectionHeader: {
        fontFamily: 'arial',
        fontSize: 25,
        fontWeight: 'bold'
    }
});