import {atom} from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataUser} from '../types/dataList';

export enum StorageKind {
  userData = 'userData',
  userToken = 'userToken',
}

const initialUserData: DataUser = {
  email: '',
  name: '',
  password: '',
};

export const isLoadingAtom = atom<boolean>(true);
export const userDataAtom = atom<DataUser>(initialUserData);
export const userTokenAtom = atom<string>('');

export const initAtom = atom(null, async (get, set) => {
  try {
    const userStorage = await AsyncStorage.getItem(StorageKind.userData);
    const tokenStorage = await AsyncStorage.getItem(StorageKind.userToken);

    const userDataParse: DataUser =
      userStorage === null ? initialUserData : JSON.parse(userStorage);

    const userData = userDataParse.email ? userDataParse : initialUserData;
    const userToken = tokenStorage === null ? '' : tokenStorage;

    const tokenDate = new Date(userToken).getTime();
    const currDate = new Date().getTime();
    const isValidToken = !userToken
      ? false
      : currDate > tokenDate
      ? false
      : true;

    console.log(`data: ${userStorage}`);

    set(isLoadingAtom, false);
    set(userDataAtom, userData);
    set(userTokenAtom, isValidToken ? userToken : '');
  } catch (err: unknown) {
    console.log('error retrieve: ', err);
    set(isLoadingAtom, false);
    set(userDataAtom, initialUserData);
    set(userTokenAtom, '');
  }
});

export const signInAtom = atom(null, async (get, set, values: DataUser) => {
  try {
    const currDate = new Date().getTime();
    const oneHour = 1000 * 60 * 60;
    const userToken = new Date(currDate + oneHour * 8).toISOString();
    await AsyncStorage.setItem(StorageKind.userData, JSON.stringify(values));
    await AsyncStorage.setItem(StorageKind.userToken, userToken);

    set(userDataAtom, values);
    set(userTokenAtom, userToken);
  } catch (err: unknown) {
    console.log('error signin: ', err);
  }
});

export const signOutAtom = atom(null, async (get, set) => {
  try {
    await AsyncStorage.removeItem(StorageKind.userData);
    await AsyncStorage.removeItem(StorageKind.userToken);

    set(userDataAtom, initialUserData);
    set(userTokenAtom, '');
  } catch (err: unknown) {
    console.log('error logout: ', err);
  }
});
