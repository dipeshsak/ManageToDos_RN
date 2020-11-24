import React from 'react'

// Import react navigation ,react navigation stack
import {createStackNavigator} from 'react-navigation-stack';
import HeaderPanel from '../Shared/HeaderPanel'
//import  Screens
import QuoteScreen from "../LeftPanelScreens/QuoteScreen"


const LeftPanelQuotes = createStackNavigator(
  {
    Quote:{
        screen:QuoteScreen,
        navigationOptions:({navigation})=>{
            return{
            headerTitle:()=> <HeaderPanel navigation={navigation} title="Quote of the Day "/>
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

export default LeftPanelQuotes
