import React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card,CardItem,Icon} from 'native-base'
import Entypo  from 'react-native-vector-icons/Entypo';
import  { BannerAd, TestIds, BannerAdSize } from "@react-native-firebase/admob"
export default class ViewPage extends React.Component {
  state={
    time:"",
    todo:"",
    date:"",
    desc:"",
    completed:"",
    key:"DummyKey"
  }
  static navigationOptions = {
    title:" View ToDo"
  }
  componentDidMount(){
    const { navigation } =this.props;
    navigation.addListener("willFocus",()=>{
      var key = this.props.navigation.getParam("key","");
      this.getTodos(key)
    })
  }

  getTodos= async key =>{
    await AsyncStorage.getItem(key)
    .then(todojsonString =>{
      var todoData= JSON.parse(todojsonString);
      todoData["key"]=key;
      this.setState(todoData)
    })
    .catch(error=>{
      console.log(error)
    })
    
  }



  editTodo = key =>{
    this.props.navigation.navigate("TODOEdit",{key:key})
  }

  deleteTodo = key =>{
    Alert.alert(
      "Delete Todo ?",
      `${this.state.todo}`,
      [
        {
          text:"Cancel", onPress: ()=>console.log("Cancel Tapped")
        },
        {
          text:"OK" ,
          onPress : async ()=>{
            await AsyncStorage.removeItem(key)
            .then(()=>{
              this.props.navigation.goBack();
            })
            .catch(error=>{
              console.log(error)
            })
          }
        }
      ]
    )
  }
  completedTodoHandler= async key =>{


    this.setState({
      completed: !this.state.completed
    })

    var todoData={
      completed : !this.state.completed,
    }

    await AsyncStorage.mergeItem(key,JSON.stringify(todoData))
      .then(
        ()=>{
          console.log("Gotcha!")
        }
      )
      .catch(error=>{
        console.log("errorr in view",error)
      })

  }

  render(){
  return (
    
  <ScrollView style={styles.container}>
    <View style={styles.infoContainer}>
    <Card>
          <CardItem bordered>
          <Icon type="FontAwesome" name='tasks' style={{fontSize:25,color:'red'}}/>
             <Text style={styles.infoText}>Task </Text>
          </CardItem>
          <CardItem bordered>
             <Text style={styles.infoTextVal}>
               {this.state.todo + "  "}
             </Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem bordered>
          <Icon type="FontAwesome" name='calendar-times-o' style={{fontSize:25,color:'green'}}/>
             <Text style={styles.infoText}>Date </Text>
          </CardItem>
          <CardItem bordered>
             <Text style={styles.infoTextVal}>
               {this.state.date ? this.state.date + " " : "  -- "}
             </Text>
          </CardItem>
        </Card>
        
        
        <Card>
          <CardItem bordered>
          <Icon type="FontAwesome" name='clock-o' style={{fontSize:25,color:'green'}}/>
             <Text style={styles.infoText}>Time </Text>
          </CardItem>
          <CardItem bordered>
             <Text style={styles.infoTextVal}>
               {this.state.time ? this.state.time + " ": "  -- "}
             </Text>
          </CardItem>
        </Card>

        

        <Card>
          <CardItem bordered>
          <Icon type="FontAwesome" name='list-alt' style={{fontSize:25,color:'green'}}/>
             <Text style={styles.infoText}>Description  </Text>
          </CardItem>
          <CardItem bordered>
             <Text style={styles.infoTextVal}>
               {this.state.desc ? this.state.desc+" " :"  -- "}
             </Text>
          </CardItem>
        </Card>
    </View>

    <BannerAd 
      size={BannerAdSize.SMART_BANNER}
      unitId="ca-app-pub-2344721204559110/2729085052"/>

     <Card style={styles.actionContainer}>
       <CardItem style={styles.actionButton} bordered>
         <TouchableOpacity
            onPress={()=>{
             this.editTodo(this.state.key)
            }}
         >
           <Entypo  
             name="edit"
             size={40}
             color="orange"
           />
           <Text>Edit</Text>
         </TouchableOpacity>
       </CardItem>
       
       <CardItem style={styles.actionButton} bordered>
         <TouchableOpacity
            onPress={()=>{
             this.completedTodoHandler(this.state.key)}
            }
         >
           <Entypo  
             name="thumbs-up"
             size={40}
             color={this.state.completed ? "green":"#DFAF2B"} 
           />
           <Text>{this.state.completed?"Completed":"Complete"}</Text>
         </TouchableOpacity>
       </CardItem>

       <CardItem style={styles.actionButton} bordered>
         <TouchableOpacity
            onPress={()=>{
             this.deleteTodo(this.state.key)
            }}
         >
           <Entypo  
             name="trash"
             size={40}
             color="red"
           />
           <Text>Delete</Text>
         </TouchableOpacity>
       </CardItem>

     </Card>
  </ScrollView>
    
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  infoText: {
    fontSize: 18,
    color:"black",
    alignSelf:"stretch",
    textAlign:"center",
    fontWeight:'bold'
  },
  infoTextVal: {
    fontSize: 18,
    fontWeight: "300",
    
  },
  infoContainer:{
    flexDirection:"column"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
