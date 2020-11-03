import {LiveView} from '../view/live/LiveView';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';

export const Live = ({route, navigation}) => {
  const user = useContext(AuthContext);

  const {msg} = route.params === undefined ? {} : route.params;

  return LiveView();
};
