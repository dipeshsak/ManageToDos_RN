import React,{useEffect} from 'react';
import { StyleSheet,View,StatusBar } from 'react-native';

import NavigationRoute from "./NavigationRoute";
import SplashScreen from 'react-native-splash-screen'
import admob, { MaxAdContentRating, BannerAd, TestIds, BannerAdSize } from "@react-native-firebase/admob"
export default function App() {
  useEffect(()=>{
    SplashScreen.hide()
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });


  },[])
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