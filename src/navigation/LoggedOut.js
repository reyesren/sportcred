import * as React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {Register, RegisterSuccess} from "../controller/RegisterController";

const Stack = createStackNavigator();

// todo replace screens with user registration / login controllers

export default function LoggedOutStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={"none"}>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="RegisterSuccess" component={RegisterSuccess}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}