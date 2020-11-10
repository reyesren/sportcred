import React from "react";
import {View} from "react-native";
import {Headline} from "react-native-paper";

/**
 *
 * @param props Object pickType should be either of {'Playoff', 'Preseason', 'Daily', etc...}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Unavailable(props) {
    const pickType = props.pickType;
    return (
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20}}>
            <Headline style={{textAlign: 'center', color: 'grey'}}>{pickType} picks are currently closed. Check back later!</Headline>
        </View>
    );
}