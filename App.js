import React from 'react';
import { StyleSheet,View,StatusBar } from 'react-native';

import NavigationRoute from "./NavigationRoute";

export default function App() {
  return (
    <View style={styles.container}>
       <StatusBar barStyle="default" hidden={false} backgroundColor="#00a08c" translucent={false}/>
       <NavigationRoute style={styles.container}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});