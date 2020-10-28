import React from 'react'

// Import react navigation ,react navigation stack
import {createStackNavigator} from 'react-navigation-stack';

//import  Screens
import TODOHomeScreen from '../Apps/TODO/Screens/HomePage'
import TODOViewPage  from '../Apps/TODO/Screens/ViewPage'
import TODOCreatePage from '../Apps/TODO/Screens/CreatePage'
import TODOEditPage   from '../Apps/TODO/Screens/EditPage'
import HeaderPanel from '../Shared/HeaderPanel'


const HomeRoute = createStackNavigator(
  {
    ToDoHome:{
        screen:TODOHomeScreen,
        navigationOptions:({navigation})=>{
            return{
            headerTitle :()=> <HeaderPanel navigation={navigation} title="Manage ToDos "/>
            }
        }
        // navigationOptions:{
        //     headerLeft:'Manage Todos 12'
        // }
    },
    TODOView:{screen:TODOViewPage},
    TODOCreate:{screen:TODOCreatePage},
    TODOEdit:{screen:TODOEditPage}
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

export default HomeRoute
