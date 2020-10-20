import React, {createContext, useEffect, useState} from 'react';
import UserModel from '../model/UserModel';
import LoggedInStack from './LoggedIn';
import LoggedOutStack from './LoggedOut';

export const AuthContext = createContext(null);

export default function AuthNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(result) {
    setUser(result);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const authSubscriber = UserModel.getAuthSubscriber(onAuthStateChanged);
    // unsubscribe on unmount
    return authSubscriber;
  }, []);

  if (initializing) {
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <LoggedInStack />
    </AuthContext.Provider>
  ) : (
    <LoggedOutStack />
  );
}
