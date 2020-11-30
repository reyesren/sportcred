import React from "react";
import {StyleSheet, View, Text, Image} from 'react-native';
import DailyCard from './DailyCard';

export const DailyView = (props) => {

    
    const [todayMatches, setTodayMatches] = React.useState([]);
    const [todayMatchesFetched, setTodayMatchesFetched] = React.useState(false);
    const [previousMatches, setPreviousMatches] = React.useState([]);
    const [previousMatchesfetched, setPreviousMatchesFetched] = React.useState(false);

    if (!todayMatchesFetched) {
        setTodayMatches(props.getTodayMatchData());
        setTodayMatchesFetched(true);
    }
    if (!previousMatchesfetched) {
        setPreviousMatches(props.getPreviousMatchData());
        setPreviousMatchesFetched(true);
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
        if (previousMatches.length == 0) {
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
        marginHorizontal: 0,
        marginVertical: 20,
        paddingHorizontal: 0,
    },
    sectionHeader: {
        fontFamily: 'arial',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    noMatchesText: {
        fontSize: 20,
        color: '#999',
        padding: 40,
        fontStyle: 'italic'
    }
});