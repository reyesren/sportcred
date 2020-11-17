import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PostSummary} from './../../components/index.js';

import {CreatePostView} from './CreatePostView';
import {createStackNavigator} from '@react-navigation/stack';

import {getPostIds} from './../../controller/TheZoneController';
import { FullPostView } from './FullPostView';



export function TheZoneContentView({navigation}) {
  const [postIds, updatePostIds] = React.useState([]);
  if(postIds.length === 0) {
    getPostIds().then(post => {
        updatePostIds(post);
    })
  }
  function renderButtons(nav) {
    return postIds.map((id) => {
      return <PostSummary postId={id} key={id} navigation={nav}/>;
    });
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Image
            style={styles.logo}
            source={require('./../../../assets/logo.png')}
          />
          <View>
            <Text style={styles.titleText}>THE ZONE</Text>
          </View>

          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate('Create Post');
            }}>
            Create Post
          </Button>

          { renderButtons(navigation) }
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
      <Stack.Navigator headerMode={'none'} initialRouteName={'The Zone'}>
        <Stack.Screen name="The Zone" component={TheZoneContentView} />
        <Stack.Screen name="Create Post" component={CreatePostView} />
        <Stack.Screen name='Full Post' component={FullPostView} />
      </Stack.Navigator>
    </>
  );
}
