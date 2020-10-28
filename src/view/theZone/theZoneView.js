import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Image, TouchableOpacity, Button} from 'react-native';

import { Colors,} from 'react-native/Libraries/NewAppScreen';
import { EditableText, PostSummary } from './../../components/index.js';

export function TheZoneView(props) {

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

                    <Button title='PICKS & PREDICTIONS' onPress={() => {}} />
                    <Button title='TRIVIA' onPress={() => {}} />
                    <Button title='PROFILE' onPress={() => {}} />
                    <PostSummary postId='1' />
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

export default TheZoneView;

