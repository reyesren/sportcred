import React from "react";
import {StyleSheet, View, Text, Image, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import DailyCard from './DailyCard';

export const DailyView = (props) => {

    
    const [todayMatches, setTodayMatches] = React.useState([]);
    const [todayMatchesFetched, setTodayMatchesFetched] = React.useState(false);
    const [previousMatches, setPreviousMatches] = React.useState([]);
    const [previousMatchesfetched, setPreviousMatchesFetched] = React.useState(false);

    if (!todayMatchesFetched) {
        props.getTodayMatchData().then(async (arr) => {
            setTodayMatches(arr);
            setTodayMatchesFetched(true);
        });
    }
    if (!previousMatchesfetched) {
        props.getPreviousMatchData().then(async (arr) => {
            setPreviousMatches(arr);
            setPreviousMatchesFetched(true);
        });
    }

    const renderTodayCards = () => {
        if (todayMatches.length == 0) {
            return (
                <View>
                    <Text style={styles.noMatchesText}>No Matches Today</Text>
                </View>
            );
        }
        return todayMatches.map((match) => {
            return <DailyCard 
            matchData={match} 
            key={match.id}
            updateMatchDatabase={props.updateMatchDataDatabase}
            teamLogos={props.teamLogos}/>;
          });
    }

    const renderPreviousCards = () => {
        if (previousMatches && previousMatches.length === 0) {
            return (
                <View>
                    <Text style={styles.noMatchesText}>No Matches Found</Text>
                </View>
            );
        }
        return previousMatches.map((match) => {
            return <DailyCard 
                        matchData={match} 
                        key={match.id}
                        updateMatchDatabase={props.updateMatchDatabase}
                        teamLogos={props.teamLogos}/>;
          });
    }

    return (
        <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.container}>
                    <Text style={styles.sectionHeader}>Today's Picks</Text>
                    { renderTodayCards() }
                    <Text style={styles.sectionHeader}>Previous Picks</Text>
                    { renderPreviousCards() }
                </View>
            </ScrollView>
      </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 0,
        marginVertical: 20,
        paddingHorizontal: 0,
    },
    sectionHeader: {
        fontFamily: 'arial',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 20
    },
    noMatchesText: {
        fontSize: 20,
        color: '#999',
        padding: 40,
        fontStyle: 'italic',
        textAlign: 'center'
    }
});