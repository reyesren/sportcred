import React, {useContext, useState} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';
import TriviaResultView from '../view/trivia/TriviaResultsView';
import ACSModel from '../model/ACSModel';
import {useFocusEffect} from '@react-navigation/core';

const TriviaResultsController = ({route, navigation}) => {
  const [acs, setAcs] = useState();
  const [ACSHistory, setACSHistory] = React.useState({}); // object with 2 arrays (labels, data)

  const user = useContext(AuthContext);
  const {msg} = route.params === undefined ? {} : route.params;

  useFocusEffect(
    React.useCallback(() => {
      ACSModel.getACS(user.uid).then((acsDoc) => {
        const m = acsDoc.acsHistory;
        let array = Object.keys(m).map((k) => m[k]);
        let sum = array.reduce((a, b) => a + b, 100);
        setAcs(sum);
        console.log(sum);
      });
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
        ACSModel.getACS(user.uid).then(
            acsDoc => {
              const m = acsDoc['acsHistory'];
              let dataObj = {};
              let acsArray = [];
              let timeArray = Object.keys(m).sort();
              let acsFinal;

              if(timeArray.length === 0) {
                  acsFinal = [100];
                  let date = new Date();
                  let day = date.getDate();
                  let month = date.getMonth() + 1;
                  date = `${month}/${day}`;
                  timeArray = [date];
              }
              else {
                  acsArray.push(m[timeArray[0]]);
                  for(let i = 1; i < timeArray.length; i++) {
                      acsArray[i] = acsArray[i - 1] + m[timeArray[i]];
                  }

                  acsFinal = acsArray.map(i => i + 100);

                  for(let j = 0; j < timeArray.length; j++) {
                      let date = new Date(parseInt(timeArray[j]));
                      let day = date.getDate();
                      let month = date.getMonth() + 1;
                      date = `${month}/${day}`;
                      timeArray[j] = date;
                  }
              }
              dataObj['datasets'] = [{'data': acsFinal}];
              dataObj['labels'] = timeArray;
              setACSHistory(dataObj);
            });
    }, []),
  );

  const addToAcs = (score) => {
    if (score > 0) {
      console.log('Adding to ACS...', score);
      ACSModel.addToACS(user.uid, score, () => {});
    }
  };

  const goToTriviaLanding = () => {
    navigation.navigate('Trivia');
  };

  return TriviaResultView({
    score: route.params.score,
    goToTriviaLanding,
    acs: acs,
    addToAcs,
    ACSHistory: ACSHistory,
  });
};

export default TriviaResultsController;
