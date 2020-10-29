import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Image, TouchableOpacity, Button} from 'react-native';

import { Colors,} from 'react-native/Libraries/NewAppScreen';
import { EditableText, PostSummary } from './../../components/index.js';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

export function TheZoneContentView({route, navigation}) {
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

                    <Image style={styles.logo} source={require('./../../../assets/logo.png')}/>
                    <View>
                        <Text style={styles.titleText}>THE ZONE</Text>
                    </View>

                    <PostSummary postId='1' />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
  titleText: {
    fontWeight: '300',
    textAlign: 'center',
    fontSize: 40
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  }
});

const Drawer = createDrawerNavigator();

export function TheZoneView() {
    return (
    <>
        <Drawer.Navigator initialRouteName="The Zone">
          <Drawer.Screen name="The Zone" component={TheZoneContentView} />
        </Drawer.Navigator>
    </>
    );
}

