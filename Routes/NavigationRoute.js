// Import react navigation ,react navigation stack
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator,DrawerItems} from "react-navigation-drawer";
//import  Screens
import HomeRoute from './HomeRoute';
// import LeftPanelRoute from './LeftPanelRoutes'
import LeftPanelAboutUs from './LeftPanelAboutUs'
import LeftPanelRateUs from './LeftPanelRateUs'
import LeftPanelShareApp from './LeftPanelShareApp'

import {Container,Content,Header,Body,Icon,Text} from 'native-base'
 import {Image,Share,TouchableOpacity,Linking} from'react-native'
import React from 'react'

const CustomDrawerContentComponent =(props)=>(
    <Container style={{Left:50}}>
      <Header style={{height:150,backgroundColor:'white'}}>
        <Body style={{alignItems:'center',justifyContent:'center'}}>
          <Image source={require('../assets/mticon.png')} style={{height:100,width:100}}/>
          <Text style={{color:'teal',fontSize:20,fontWeight:'bold'}} >Manage ToDos</Text>
        </Body>
      </Header>
      <Content>
        <DrawerItems {...props}/>
      </Content>
    </Container>
)
const MainNavigator = createDrawerNavigator(
  {
    Home:{screen:HomeRoute},
    RateUs:{
      screen:LeftPanelRateUs,
      navigationOptions:{
        title:"Give us Review"
      }
    },
    Share:{
      screen:LeftPanelShareApp,
      navigationOptions:{
        title:"Share"
      }
    },
    // AboutUs:{
    //   screen:LeftPanelAboutUs,
    //   navigationOptions:{
    //     title:"About Us"
    //   }
    // },
    
  },
  {
    initialRouteName:'Home',
    contentComponent:CustomDrawerContentComponent,
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoue:'DrawerClose',
    drawerToggleRoute:'DrawerToggle'
  }
)
 const NavigationRoute= createAppContainer(MainNavigator)
 export default NavigationRoute

 