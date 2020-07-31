// Import react navigation ,react navigation stack
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//import  Screens
import TODOHomeScreen from './Apps/TODO/Screens/HomePage.js'
import TODOViewPage  from './Apps/TODO/Screens/ViewPage'
import TODOCreatePage from './Apps/TODO/Screens/CreatePage'
import TODOEditPage   from './Apps/TODO/Screens/EditPage'

const MainNavigator = createStackNavigator(
  {
    ToDoHome:{screen:TODOHomeScreen},
    TODOView:{screen:TODOViewPage},
    TODOCreate:{screen:TODOCreatePage},
    TODOEdit:{screen:TODOEditPage}
  },{
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
const NavigationRoute = createAppContainer(MainNavigator)
export default NavigationRoute
