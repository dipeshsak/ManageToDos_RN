import React from 'react'

// Import react navigation ,react navigation stack
import {createStackNavigator} from 'react-navigation-stack';
import HeaderPanel from '../Shared/HeaderPanel'
//import  Screens
import ShareApp from "../LeftPanelScreens/ShareApp"


const LeftPanelShareApp = createStackNavigator(
  {
    Rate:{
        screen:ShareApp,
        navigationOptions:({navigation})=>{
            return{
            headerTitle:()=> <HeaderPanel navigation={navigation} title="Share"/>
            }
        }
        
    },
    
  },
  {
    defaultNavigationOptions:{
      headerTintColor:"#fff",
      headerStyle:{
        backgroundColor:"teal"
      },
      headerTitleStyle:{
        color:"#fff",        
      }
    }
  }
)

export default LeftPanelShareApp
