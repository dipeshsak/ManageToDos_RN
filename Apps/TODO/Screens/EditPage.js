import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Keyboard,TouchableWithoutFeedback,ScrollView,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Form , Item , Input, Label,Button,Icon} from 'native-base'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import PushNotification from "react-native-push-notification";
import moment from 'moment';
import  { BannerAd, TestIds, BannerAdSize } from "@react-native-firebase/admob"
export default class EditContactScreen extends React.Component {
  state={
    time:"",
    todo:"",
    date:"",
    DTPVisibility:false,
    selectedVal:"Select Date/Time",
    key:"",
    schTime:''

  }
  static navigationOptions = {
    title:" Edit Todo"
  }
  PushLocalScheduleNotifications=()=>{
    PushNotification.configure({
      onRegister: function(token) {
        console.log("TOKEN:", token);
      },
      // onNotification: function(notification) {
      //   console.log("NOTIFICATION:", notification);
      //   notification.finish(PushNotificationIOS.FetchResult.NoData);
      // },
     
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      id:'2',
      message: "A Minute Left for - "+this.state.todo, // (required)
      date: new Date(Date.now()+((this.state.schTime * 1000)-(60*1000))),
      color:'teal',
     // bigText:this.state.todo,
      smallIcon:"ic_notification"
    });
    
    PushNotification.cancelLocalNotifications({id:'1'})
  }
  componentDidMount(){
    const {navigation} =this.props;
    navigation.addListener("willFocus",()=>{
      var key = this.props.navigation.getParam("key","")
      // ToDo
       this.getTodo(key)
    })
  }

  getTodo = async key =>{
    await AsyncStorage.getItem(key)
    .then(todoJsonString=>{
      var todoData =JSON.parse(todoJsonString)
      //set key in object
      todoData["key"]=key
      //set state
      this.setState(todoData)
      this.setState({
        selectedVal:this.state.date +" "+this.state.time
      })
    })
    .catch(error=>{
      console.log(error)
    })
  }

  updateTodo = async key =>{
    if(
      this.state.todo !== ""
    ){
      var todoData={
        todo:this.state.todo,
        time:this.state.time,
        date:this.state.date,
        desc:this.state.desc
      }
      await AsyncStorage.mergeItem(key,JSON.stringify(todoData))
      .then(
        ()=>{
          this.props.navigation.goBack()
        }
      )
      .catch(error=>{
        console.log(error)
      })
    }else{
      Alert.alert("Please fill the Task field !")
    }
    this.setState({
      schTime:moment(this.state.selectedVal).unix() - moment().unix()
    })
    if(this.state.time){
      this.PushLocalScheduleNotifications();
    }
  }
  
  handleConfirm =(date)=>{
    this.setState({
      selectedVal:date.toString(),
      DTPVisibility:false,
      date:date.toString().substring(0,15),
      time:date.toString().substring(16,21)
    })
 }

 onPressCancel=()=>{
   this.setState({DTPVisibility:false})
 }
 onPressButton=()=>{
   this.setState({DTPVisibility:true})
 }
  render(){
  return (
    <TouchableWithoutFeedback
    onPress={
      Keyboard.dismiss
    }>
    <ScrollView style={styles.container}>
      <Form>
        <Item style={styles.inputItem}>
        <Icon type="FontAwesome" name='tasks' style={{fontSize:25,color:'red'}}/>
          {/* <Label style={styles.labelStyle}>Task * : </Label> */}
            <Input
              // style={styles.inputStyle}
              autoCorrect={false}
              autoCapitalize="sentences"
              keyboardType="default"
              onChangeText={
                todo=>this.setState({
                  todo
                })
              }
              value={
                this.state.todo
              }
            />
        </Item>
        <Item style={styles.inputItem}>
        <Icon type="FontAwesome" name='calendar-times-o' style={{fontSize:25,color:'green'}}/>
          {/* <Label style={styles.labelStyle}>Date/Time : </Label> */}
          <TouchableOpacity
            style={styles.touchanleOpastyle}
            onPress={this.onPressButton}
            >
            <Text style={styles.touchanleOpaText}>{this.state.date ? this.state.selectedVal.toString().substring(0,21):"Select Date/Time"}</Text>
            </TouchableOpacity>
          <DateTimePickerModal 
            isVisible={this.state.DTPVisibility}
            onConfirm={this.handleConfirm}
            onCancel={this.onPressCancel}
            minimumDate={new Date()}
            mode="datetime"
          />
          
        </Item>
        <Item style={styles.inputItem}>
        <Icon type="FontAwesome" name='list-alt' style={{fontSize:25,color:'green'}}/>
          {/* <Label style={styles.labelStyle}>Description  : </Label> */}
            <Input
            placeholder="Add Description here"
              autoCorrect={false}
              autoCapitalize="sentences"
              keyboardType="default"
              multiline={true}
              onChangeText={
                desc=>this.setState({
                  desc
                })
              }
              value={
                this.state.desc
              }
            />
        </Item>
      </Form>

      <BannerAd 
      size={BannerAdSize.SMART_BANNER}
      unitId="ca-app-pub-9245860659796671/4701717675"/>

      <Button
      full
      rounded
      onPress={()=>this.updateTodo(this.state.key)}
      style={styles.button}
      ><Text style={styles.buttonText}>Save  </Text></Button>
      <View style={styles.scrollview}></View>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "teal",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    // alignSelf:"stretch",
    // textAlign:"center",
    fontWeight: "bold"
  },
  scrollview:{
    height:50
  },
  datePickstyle:{
    top:'23%',
    fontSize:20,
    color:"black",
  },
  labelStyle:{
    color:"black",
    fontWeight:'bold'
  },
  touchanleOpastyle:{
    width:"100%",
    height:45,
  },
  touchanleOpaText:{
    fontSize:18,
    top:10,
    color:'teal'
  }
});
