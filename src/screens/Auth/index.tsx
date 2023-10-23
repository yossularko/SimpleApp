import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

const Splash = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gray" />
      <Text>App Loading..</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
