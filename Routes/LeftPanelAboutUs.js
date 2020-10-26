import React from 'react'

// Import react navigation ,react navigation stack
import {createStackNavigator} from 'react-navigation-stack';
import HeaderPanel from '../Shared/HeaderPanel'
//import  Screens
import AboutUs from "../LeftPanelScreens/AboutUs"


const LeftPanelAboutUs = createStackNavigator(
  {
    About:{
        screen:AboutUs,
        navigationOptions:({navigation})=>{
            return{
            headerTitle:()=> <HeaderPanel navigation={navigation} title="About Us"/>
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

export default LeftPanelAboutUs
