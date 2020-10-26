import React from 'react';
import {StyleSheet,Text,View} from 'react-native'
import { Icon } from 'native-base'

 HeaderPanel=({navigation,title})=> {

    const  openMenu=()=>{
        navigation.openDrawer();
    }
    return (
        <View style={styles.header}>
            <Icon type="FontAwesome" name='bars' style={styles.icon} onPress={openMenu}/>
            <View>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    headerText:{
        fontWeight:'bold',
        fontSize:22,
        color:'white',
        letterSpacing:1,
    },
    icon:{
        fontSize:24,
        position:'absolute',
        color:'white',
        left:8,

    }
})
export default HeaderPanel