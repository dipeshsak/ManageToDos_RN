import React from 'react';
import { StyleSheet,Dimensions, View,Linking,Keyboard,Alert,TouchableWithoutFeedback,TouchableOpacity,ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import LinearGradient from 'react-native-linear-gradient';

const screenHeight=Math.round(Dimensions.get('window').height)

class RateUs extends React.Component {

  render(){
  return (
    <LinearGradient colors={['#16a085', '#f4d03f']} style={styles.linearGradient}>
    <Container style={styles.container}>
        {/* <Header /> */}
        <Content padder style={{flex:1,top:screenHeight/5}} >
          <Card style={styles.card} >
            <CardItem header bordered>
              <Text style={styles.mtText}>Manage ToDos</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.quoteText}>
                "The key is not to prioritize what's on your schedule, but to schedule your priorities." 
                </Text>
                <Text>Kindly Give us Rating/Review so that we can improve.</Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <TouchableOpacity onPress={()=>Linking.openURL('https://play.google.com/store/apps/details?id=com.amazinginventos.managetodos')}>
              <Text style={styles.reviewText}>Give us a Review</Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
        </Content>
      </Container>
      </LinearGradient>
  );
}
}

export default RateUs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'transparent'
  },
  card:{
    justifyContent:'center',
    alignItems:'center',
  },
  mtText:{
    fontSize:22,
    fontWeight:'bold'
  },
  quoteText:{
    fontSize:18,
    color:'teal',
    fontWeight:'bold'
  },
  reviewText:{
    fontSize:20,
    textDecorationLine:'underline'
  },
  linearGradient: {
    flex: 1,
    width:'100%',
    paddingLeft: 15,
    paddingRight: 15,
     borderRadius: 5
  },
});
