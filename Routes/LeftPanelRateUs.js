import React from 'react'

// Import react navigation ,react navigation stack
import {createStackNavigator} from 'react-navigation-stack';
import HeaderPanel from '../Shared/HeaderPanel'
//import  Screens
import RateUs from "../LeftPanelScreens/RateUs"


const LeftPanelRateUs = createStackNavigator(
  {
    Rate:{
        screen:RateUs,
        navigationOptions:({navigation})=>{
            return{
            headerTitle:()=> <HeaderPanel navigation={navigation} title="Give us Review "/>
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

export default LeftPanelRateUs
