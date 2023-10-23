import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MyButton} from '../../components';
import {useAtomValue, useSetAtom} from 'jotai';
import {signOutAtom, userDataAtom} from '../../store/mainStore';

const Home = () => {
  const userData = useAtomValue(userDataAtom)
  const signOut = useSetAtom(signOutAtom);
  return (
    <View style={styles.container}>
      <Text>Welcome, {userData.name}</Text>
      <MyButton onPress={signOut} title="Logout" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
