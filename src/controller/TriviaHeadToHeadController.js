import React, {useContext, useState} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Loading} from '../view/Buffer';
import ChallengeAUserView from "../view/trivia/headtohead/ChallengeAUserView";
import PendingChallengesView from "../view/trivia/headtohead/PendingChallengesView";
import IncomingChallengesView from "../view/trivia/headtohead/IncomingChallengesView";
import CompletedChallengesView from "../view/trivia/headtohead/CompletedChallengesView";
import UserModel from "../model/UserModel";
import TriviaChallengeModel from "../model/TriviaChallengeModel";

const Tab = createBottomTabNavigator();

export const HeadToHeadTabs = ({navigation, route}) => {
    const user = useContext(AuthContext);

    return (
        <Tab.Navigator>
            <Tab.Screen name={"ChallengeUsersTab"} component={ChallengeUsers} />
            {/*<Tab.Screen name={"PendingChallengesTab"} component={PendingChallengesView} />*/}
            <Tab.Screen name={"IncomingChallengesTab"} component={IncomingChallenges} />
            {/*<Tab.Screen name={"CompletedChallengesTab"} component={CompletedChallengesView} />*/}
        </Tab.Navigator>
    );
}

function ChallengeUsers() {
    const perPage = 20
    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(0);

    function loadMore() {
        setPage(page + 1);
        UserModel.getRegisteredUsers(page * perPage, perPage).then((snapshots) => {
            const list = userList
            snapshots.forEach((doc) => {
                let lastSeen = new Date()
                lastSeen.setMilliseconds(doc.data()["last_login"])
                lastSeen = lastSeen.toString();
                list.push({uid: doc.id, name: doc.data()["displayName"], lastSeen})
            })
            setUserList(list)
            }
        )
    }

    loadMore();

    function onChallenge() {
    // todo route to play
    }



    return ChallengeAUserView({userList, loadMore, onChallenge, page});
}

function IncomingChallenges() {
    const user = useContext(AuthContext);

    let incList = {};
    TriviaChallengeModel.getIncomingChallenges(user.uid).then((doc) => {
        incList = doc;

    })



    return IncomingChallengesView();
}