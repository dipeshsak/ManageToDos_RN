import React from 'react';
import { StyleSheet,Dimensions,Linking,TouchableOpacity,Share } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";

const screenHeight=Math.round(Dimensions.get('window').height)

class ShareApp extends React.Component {

  render(){
  return (
    <Container style={styles.container}>
        <Content padder style={{flex:1,top:screenHeight/5}} >
          <Card style={styles.card} >
            <CardItem header bordered>
              {/* <Text style={styles.mtText}>Manage ToDos</Text> */}
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.quoteText}>
                “Love only grows by sharing. You can only have more for yourself by giving it away to others.”
                </Text>
                <Text>Share Manage ToDos so that your friend and family become more Productive.</Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <TouchableOpacity onPress={()=>Share.share({
                message:"Install Manage ToDOs and don't Miss anything Important.",
                uri:'https://play.google.com/store/apps/details?id=com.amazinginventos.managetodos'
              })}>
              <Text style={styles.reviewText}>Share Manage ToDos</Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
        </Content>
      </Container>
    
  );
}
}

export default ShareApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});
