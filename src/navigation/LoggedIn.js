import * as React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DisplayExample from "../controller/ExampleController";

const Stack = createStackNavigator();

// todo replace screens with controllers for when user is logged in

export default function LoggedInStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={"none"}>
                <Stack.Screen name="Example" component={DisplayExample}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}