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
  RefreshControl
} from 'react-native';
import {Button} from 'react-native-paper';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PostSummary} from './../../components/index.js';

export function RadarPostsView(props) {
  const [postIds, updatePostIds] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  if (props.shouldRefresh()) {
    setRefreshing(true);
  }

  if(postIds.length === 0) {
    //console.log('Fetching posts in THE ZONE');
    props.getPostIds().then(post => {
        updatePostIds(post);
    })
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //console.log('Fetching posts in THE ZONE (Refresh)');
    props.getPostIds().then(post => {
        updatePostIds(post);
        setRefreshing(false);
    })
  }, []);

  function renderButtons(nav) {
    return postIds.map((id) => {
      return <PostSummary 
                postId={id} 
                key={id} 
                navigation={nav} 
                goToFullPost={props.goToFullPost} 
                getPostData={props.getPostData}
                castUpvote={props.castUpvote}
                castDownvote={props.castDownvote}
                checkIfUserVoted={props.checkIfUserVoted}
                refresh={props.shouldRefresh()}
                />;
    });
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View>
            <Text style={styles.titleText}>MY RADAR</Text>
          </View>
          { renderButtons(props.navigation) }
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
