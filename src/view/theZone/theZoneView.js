import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Image, TouchableOpacity, Button} from 'react-native';

import { Colors,} from 'react-native/Libraries/NewAppScreen';
import { PostSummary } from './../../components/index.js';

import {CreatePostView} from './CreatePostView';
import {createStackNavigator} from '@react-navigation/stack';

import { getPostIds } from './../../controller/TheZoneController';


function renderButtons() {
  return getPostIds().map((id) => {
    return (<PostSummary postId={id} key={id} />);
  });
};

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

                  <Button title='Create Post' onPress={() => {navigation.navigate('Create Post')}} />

                  { renderButtons() }
              </ScrollView>
          </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
    padding: 10,
    margin: 10
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

