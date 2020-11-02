import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PostSummary} from './../../components/index.js';

import {CreatePostView} from './CreatePostView';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import {getPostIds} from './../../controller/TheZoneController';
import TriviaLandingView from '../trivia/TriviaLandingView';
import {TriviaLanding} from '../../controller/TriviaController';


function renderButtons() {
  return getPostIds().map((id) => {
    return <PostSummary postId={id} key={id} />;
  });
}

export function TheZoneContentView({navigation}) {
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

                  <Button mode='contained' 
                  onPress={() => {navigation.navigate('Create Post')}}
                  >Create Post</Button>

                  { renderButtons() }
              </ScrollView>
          </SafeAreaView>
        </>
    );
};

function TriviaScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('TriviaController')}
        title="Trivia"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
    padding: 10,
    margin: 10,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

const Stack = createStackNavigator();

export function TheZoneView({navigation}) {
    return (
    <>
      <Stack.Navigator headerMode={'none'} initialRouteName={"The Zone"}>
        <Stack.Screen name="The Zone" component={TheZoneContentView} />
        <Stack.Screen name="Create Post" component={CreatePostView} />
      </Stack.Navigator>
    </>
  );
}
