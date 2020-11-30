import React from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity, Modal, TouchableHighlight} from 'react-native';

const DailyCard = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false);
    const openModal = () => {
        if (props.matchData.result == 0) setModalVisible(true)
    }

    const formatTeamName = (ogName) => {
        var listName = ogName.toLowerCase().split(' ');
        return listName.join('_')+'.png';
    }

    const getTeamLogo = (teamName) => {
        if (props.teamLogos.hasOwnProperty(teamName)) return props.teamLogos[teamName];
        return props.teamLogos['unknown'];
    }

    const updateMatchData = (pick) => {
        props.matchData.userPick = pick;
        props.updateMatchDatabase(props.matchData);
    }

    const styles = StyleSheet.create({
        teamImageSelect: {
            flex: 1,
            width: 150,
            height: 150,
            resizeMode: 'contain',
            backgroundColor: '#ffd00050'
        },
        teamImageNormal: {
            flex: 1,
            width: 150,
            height: 150,
            padding: 10,
            resizeMode: 'contain',
        },
        teamImageCorrect: {
            flex: 1,
            width: 150,
            height: 150,
            padding: 10,
            resizeMode: 'contain',
            backgroundColor: '#00ff1550'
        },
        teamImageIncorrect: {
            flex: 1,
            width: 150,
            height: 150,
            padding: 10,
            resizeMode: 'contain',
            backgroundColor: '#ed100050'
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center', 
            alignItems: 'center',    
            paddingVertical: 20,
            paddingHorizontal: 30,
            marginVertical: 10,
            backgroundColor: '#ddd',
            minHeight: 140,
            borderRightWidth: 3,
            borderLeftWidth: 3,
            borderRightColor: '#ddd',
            borderLeftColor: '#ddd'
        },
        leftSelectContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center', 
            alignItems: 'center',    
            //paddingVertical: 20,
            //paddingHorizontal: 30,
            marginVertical: 10,
            backgroundColor: '#ddd',
            minHeight: 140,
            borderRightWidth: 3,
            borderLeftWidth: 7,
            borderRightColor: '#ddd',
            borderLeftColor: '#1F6521'
        },
        rightSelectContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center', 
            alignItems: 'center',    
            //paddingVertical: 20,
            //paddingHorizontal: 30,
            marginVertical: 10,
            backgroundColor: '#ddd',
            minHeight: 140,
            borderRightWidth: 7,
            borderLeftWidth: 3,
            borderRightColor: '#1F6521',
            borderLeftColor: '#ddd'
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
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
            backgroundColor: 'rgba(52, 52, 52, 0.8)'
          },
          modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          },
          openButton: {
            backgroundColor: "#F194FF",
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            marginVertical: 10
          },
          textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          },
          modalText: {
            marginBottom: 15,
            textAlign: "center"
          },
          matchText: {
              fontWeight: 'bold'
          }
    });

    const renderBanner = (winner, text, styling) => {
        if (winner == 0) return;
        if (winner == 1) {
            return (
                <View style={styling}>
                    <Text style={styles.bannerText}>{'<'} {text}</Text>
                </View>
            );
        }
        return (
            <View style={styling}>
                <Text style={styles.bannerText}>{text} {'>'}</Text>
            </View>
        );
    }

    const renderCard = () => {
        var styleToUseForContainer;
        if (props.matchData.userPick === 0) styleToUseForContainer = styles.container;
        else if (props.matchData.userPick === 1) styleToUseForContainer = styles.leftSelectContainer;
        else styleToUseForContainer = styles.rightSelectContainer;

        var styleToUseForTeam1 = styles.teamImageNormal;
        var styleToUseForTeam2 = styles.teamImageNormal;
        if (props.matchData.result === 0) {
            if (props.matchData.userPick === 1) {
                styleToUseForTeam1 = styles.teamImageSelect;
            }
            else if (props.matchData.userPick === 2) {
                styleToUseForTeam2 = styles.teamImageSelect;
            }
        }
        else if (props.matchData.result === 1) {
            if (props.matchData.userPick === 1) {
                styleToUseForTeam1 = styles.teamImageCorrect;
            }
            else if (props.matchData.userPick === 2) {
                styleToUseForTeam2 = styles.teamImageCorrect;
            }
        }
        else if (props.matchData.result === 2) {
            if (props.matchData.userPick === 2) {
                styleToUseForTeam2 = styles.teamImageIncorrect;
            }
            else if (props.matchData.userPick === 1) {
                styleToUseForTeam1 = styles.teamImageIncorrect;
            }
        }
        else {
            console.log('ERROR: invalid props.matchData.result found');
        }

        return (
            <TouchableOpacity style={styleToUseForContainer} onPress={openModal}>
                <View>
                    <Image style={styleToUseForTeam1} source={getTeamLogo(props.matchData.team1)} />
                    
                </View>
                <View style={styles.textContainer}>
                    {/* { renderBanner(props.matchData.result, 'won', styles.winBanner) } */}
                    <Text style={styles.matchText}>{props.matchData.date.getHours()}:{("0" + props.matchData.date.getMinutes()).slice(-2)}:00</Text>
                    <Text>00/00/00</Text>
                    {/* { renderBanner(props.matchData.userPick, 'picked', styles.choiceBanner) } */}
                </View>
                <View>
                    <Image style={styleToUseForTeam2} source={getTeamLogo(props.matchData.team2)} />
                </View>
            </TouchableOpacity>
        );
    }


    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Who will win?</Text>
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#1F6521" }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            updateMatchData(1);
                        }}
                        >
                        <Text style={styles.textStyle}>{props.matchData.team1}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#1F6521" }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            updateMatchData(2);
                        }}
                        >
                        <Text style={styles.textStyle}>{props.matchData.team2}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#1F6521" }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            updateMatchData(0);
                        }}
                        >
                        <Text style={styles.textStyle}>I don't know</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            { renderCard() }
        </>
    );
}

export default DailyCard;
