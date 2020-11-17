import React from "react";
import {StyleSheet, View, Text, Image} from 'react-native';
import {getRadarList} from './../controller/RadarController';

export const RadarView = () => {
    const [radarList, updateRadarList] = React.useState(getRadarList());

    const RadarElement = (props) => {
        const styles = StyleSheet.create({
            elementText: {
                fontSize: 25,
                fontWeight: 'bold'
            },
            elementContainer: {
                padding: 20,
                margin: 10,
                backgroundColor: '#ccc',
                borderRadius: 10
            },
            elementSubtext: {
                fontSize: 20,
                color: '#555'
            }
        });
    
        return(
            <View style={styles.elementContainer}>
                <Text style={styles.elementText}>{props.displayName}</Text>
                <Text style={styles.elementSubtext}>{props.status}</Text>
            </View>
        );
    }

    const renderRadarList = () => {
        return radarList.map((user) => {
            return <RadarElement
                key={user.uId}
                displayName={user.profile.displayName}
                status={user.profile.about} />
        })
    }

    return(
        <>
        <View style={{margin: 10}}></View>
            <View>
                { renderRadarList() }
            </View>
        </>
    );
}