import React,{useEffect} from 'react';
import { StyleSheet,View,StatusBar } from 'react-native';

import NavigationRoute from "./Routes/NavigationRoute";
import SplashScreen from 'react-native-splash-screen'
import admob, { MaxAdContentRating, BannerAd, TestIds, BannerAdSize } from "@react-native-firebase/admob"
import PushNotification from "react-native-push-notification";

export default function App() {
  useEffect(()=>{
    SplashScreen.hide()

    PushLocalScheduleNotifications()
    
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

  PushLocalScheduleNotifications=()=>{
    PushNotification.configure({
      onRegister: function(token) {
        console.log("TOKEN:", token);
      },
     
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
    PushNotification.localNotificationSchedule({
      id:'11', 
      message: "Never miss anything with Manage ToDos, add Task now !", // (required)
      color:'teal',
      // smallIcon:"ic_notification",
      // largeIcon:"ic_launcher",
      //repeatTime:"300000" //7200000 for 2 hrs
      repeatType:"time",
      repeatTime:7200000,
      date: new Date(Date.now()+3600000), // in 180 secs
    });
    console.log("APP . js code for notification")
  }
  return (
    <View style={styles.container}>
       {/* <StatusBar barStyle="default" hidden={false} backgroundColor="#00a08c" translucent={false}/> */}
       <NavigationRoute />
       <StatusBar barStyle="default" hidden={false} backgroundColor="#00a08c" translucent={false}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});