import React from 'react';
import { StyleSheet,Dimensions,Linking,Share,View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button,Icon, Right } from "native-base";
import  { BannerAd, TestIds, BannerAdSize ,InterstitialAd, AdEventType} from "@react-native-firebase/admob"
const screenHeight=Math.round(Dimensions.get('window').height)

class QuoteScreen extends React.Component {
  
    state={
        data:"",
        randomNumber:"",
        clickOnRefresh:0,
        clickOnShare:1
    }

    componentDidMount(){
        this.getNewQuote()
    }
    
    getNewQuote = async () => {
        try {
          const response = await fetch("https://api.quotable.io/random");

          const data = await response.json();
          console.log("Inside Get new dta",data)
          if (!response.ok) throw new Error(data);
          this.setState({ data });
        } catch (error) {
          // If the API request failed, log the error to console and update state
          // so that the error will be reflected in the UI.
          console.error(error);
          this.setState({ 
            data: { content: "Opps... Something went wrong" } });
        }
        // console.log("Data from api",this.state);

        this.setState( {clickOnRefresh : this.state.clickOnRefresh +1 });
        console.log("Data from api Number refresh",this.state.clickOnRefresh);
        if(this.state.clickOnRefresh % 3 === 0){
         this.fullScreenAd()
        }
      };

      ShareQuote=()=>{
        this.setState( {clickOnShare : this.state.clickOnShare +1 });
        if(this.state.clickOnShare % 2 === 0){
          this.fullScreenAd()
         }

        // console.log("Data from api Number Share",this.state.clickOnShare);
        Share.share({
            message:"“ "+this.state.data.content +" ” --  "+this.state.data.author,
            uri:'https://play.google.com/store/apps/details?id=com.amazinginventos.managetodos'
          })

      }

      // RandomColorGenerator=()=>{
      //     let RanColor=["black","blue","teal","red"]
      //     return RanColor[0]
      // }

      fullScreenAd=()=>{
        let adUnitId="ca-app-pub-9245860659796671/4183271525";

      let interstitial=  InterstitialAd.createForAdRequest(adUnitId,{
                requestNonPersonalizedAdsOnly:true,
                keywords:['fashion','clothing']
        });

      let interstitialListener =interstitial.onAdEvent(type=>{
        if(type === AdEventType.LOADED){
          interstitial.show()
        }
      });

      interstitial.load()

      return ()=>{
        interstitialListener = null
      }
      }
      
  render(){
    const { data } = this.state;
  return (
    <Container style={styles.container}>
        <Content padder style={{flex:1,top:screenHeight/5,backgroundColor:"#B4F4F8"}} >
          <Card style={styles.card} >
            <CardItem header bordered>
              {/* <Text style={styles.mtText}>Manage ToDos</Text> */}
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.quoteText}>
                 “{data.content ? data.content :"Loading ...."}”
                </Text>
                <Text style={styles.authorText}>
                 --  {data.author ? data.author : "Please Wait"}
                </Text>
                
              </Body>
            </CardItem>
            <CardItem footer bordered>
              
              <View style={styles.btnView}>
              <Button  rounded style ={{backgroundColor:'red'}} onPress={()=>{this.getNewQuote()}}>
                  <Icon name="refresh"/>
                  {/* <Text></Text> */}
              </Button>
              <Button  rounded style ={{backgroundColor:'green'}} onPress={()=>{this.ShareQuote()}}>
                  <Icon name="send"/>
                  {/* <Text>Share </Text> */}
              </Button>
              </View>
            </CardItem>
          </Card>
        </Content>
       
        <BannerAd 
      size={BannerAdSize.SMART_BANNER}
       unitId="ca-app-pub-9245860659796671/4701717675"
      // unitId={TestIds.BANNER}
      />
      
      </Container>
    
  );
}
}

export default QuoteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'skyblue',
  },
  card:{
      width:"100%",
      height:"100%",
    justifyContent:'center',
    alignItems:'center',
    // borderRadius:15,
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
  authorText:{
    fontSize:18,
    color:'black',
    // fontWeight:"bold",
    fontStyle:'italic',
    // position:"absolute",
    // bottom:10
  },
//   reviewText:{
//     fontSize:20,
//     textDecorationLine:'underline'
//   },
  btnView:{
      width:"100%",
    //   backgroundColor:'blue',
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-around"
  }
});
