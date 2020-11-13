import React from "react";
import {StyleSheet, View, Text, Image} from 'react-native';
import DailyCard from './DailyCard';
import {getTodayMatchData, getPreviousMatchData} from './../../controller/picksAndPredictions/DailyController';

export const DailyView = () => {

    const todayMatches = getTodayMatchData();
    const previousMatches = getPreviousMatchData();

    const renderTodayCards = () => {
        if (todayMatches.length == 0) {
            return (
                <View>
                    <Text style={styles.noMatchesText}>No Matches Today</Text>
                </View>
            );
        }
        return todayMatches.map((match) => {
            return <DailyCard matchData={match} key={match.id}/>;
          });
    }

    const renderPreviousCards = () => {
        if (previousMatches.length == 0) {
            return (
                <View>
                    <Text style={styles.noMatchesText}>No Matches Found</Text>
                </View>
            );
        }
        return previousMatches.map((match) => {
            return <DailyCard matchData={match} key={match.id}/>;
          });
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.sectionHeader}>Today's Picks</Text>
                { renderTodayCards() }
                <Text style={styles.sectionHeader}>Previous Picks</Text>
                { renderPreviousCards() }
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
    },
    noMatchesText: {
        fontSize: 20,
        color: '#999',
        padding: 40,
        fontStyle: 'italic'
    }
});