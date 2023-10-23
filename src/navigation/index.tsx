import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Splash} from '../screens';
import LoginNavigation from './LoginNavigation';
import HomeNavigation from './HomeNavigation';
import {useAtomValue, useSetAtom} from 'jotai';
import {initAtom, isLoadingAtom, userTokenAtom} from '../store/mainStore';

const Navigation = () => {
  const isLoading = useAtomValue(isLoadingAtom);
  const userToken = useAtomValue(userTokenAtom);
  const setInit = useSetAtom(initAtom);

  const getInit = useRef(async () => {});
  getInit.current = async () => {
    await setInit();
  };

  useEffect(() => {
    getInit.current();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {userToken ? <HomeNavigation /> : <LoginNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
