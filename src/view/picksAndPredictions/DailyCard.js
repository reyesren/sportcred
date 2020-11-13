import React from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const DailyCard = (props) => {

    const openModal = () => {
        // TODO: open modal
    }

    const formatTeamName = (ogName) => {
        var listName = ogName.toLowerCase().split(' ');
        return listName.join('_')+'.png';
    }

    const renderUserPick = () => {}
    const renderWinner = () => {}

    const team1logo = './../../../assets/teamLogos/' + formatTeamName(props.matchData.team1);
    const team2logo = './../../../assets/teamLogos/' + formatTeamName(props.matchData.team2);

    
    const styles = StyleSheet.create({
        teamImage: {
            width: 100,
            height: 100
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center', 
            alignItems: 'center',    
            paddingVertical: 20,
            paddingHorizontal: 10,
            marginVertical: 10,
            backgroundColor: '#ddd',
            borderRadius: 10,
            minHeight: 140,
        },
        textContainer: {
            flex: 2,
            alignItems: 'center'
        },
        choiceBanner: {
            backgroundColor: '#e55',
            padding: 3,
            paddingHorizontal: 10,
            alignItems: 'center',
            marginHorizontal: 20,
            marginTop: 10
        },
        bannerText: {},
        winBanner: {
            backgroundColor: '#5e5',
            padding: 3,
            paddingHorizontal: 10,
            alignItems: 'center',
            marginHorizontal: 20,
            marginBottom: 10
        },
    });

    const renderBanner = (winner, text, styling) => {
        if (winner == 0) return;
        if (winner == 1)
            return (
                <View style={styling}>
                    <Text style={styles.bannerText}>{'<'} {text}</Text>
                </View>
            );
        return (
            <View style={styling}>
                <Text style={styles.bannerText}>{text} {'>'}</Text>
            </View>
        );
    }


    return (
        <>
            <TouchableOpacity style={styles.container} onPress={openModal}>
                <View>
                    <Image style={styles.teamImage} source={require('./../../../assets/teamLogos/unknown.png')} />
                    
                </View>
                <View style={styles.textContainer}>
                    { renderBanner(props.matchData.result, 'won', styles.winBanner) }
                    <Text>{props.matchData.date.getHours()}:{("0" + props.matchData.date.getMinutes()).slice(-2)}:00</Text>
                    <Text>00/00/00</Text>
                    { renderBanner(props.matchData.userPick, 'picked', styles.choiceBanner) }
                </View>
                <View>
                    <Image style={styles.teamImage} source={require('./../../../assets/teamLogos/unknown.png')} />
                </View>
            </TouchableOpacity>
            { console.log(team1logo) }
            { console.log(team2logo) }
        </>
    );
}

export default DailyCard;
