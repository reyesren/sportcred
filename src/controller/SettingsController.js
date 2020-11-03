import {SettingsView} from '../view/settings/SettingsView.js';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthNavigator';

export const Settings = ({route, navigation}) => {
  const user = useContext(AuthContext);

  const {msg} = route.params === undefined ? {} : route.params;

  return SettingsView();
};
