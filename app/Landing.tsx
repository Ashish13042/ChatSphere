import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import {Marquee} from '@animatereactnative/marquee'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Colors from '@/services/Colors'
import { useLogto } from '@logto/rn';
export default function Landing() {
    const { signIn, signOut, isAuthenticated } = useLogto();
    const imageList=[
        require('./../assets/images/1.jpg'),
        require('./../assets/images/2.jpg'),
        require('./../assets/images/3.jpg'),
        require('./../assets/images/4.jpg'),
        require('./../assets/images/5.jpg'),
        require('./../assets/images/6.jpg'),
    ]
  return (
    <GestureHandlerRootView>
    <View>
     <Marquee spacing={10} speed={0.7}
     style={{
        transform:[{rotate:'-4deg'}]
     }}>
      <View style={styles.imageContainer}>
        {imageList.map((image,index)=>(
            <Image source={image} style={styles.image}/>
        ))}
      </View>
      </Marquee>
      <Marquee spacing={10} speed={0.4}
     style={{
        transform:[{rotate:'-4deg'}],
        marginTop:10
     }}>
      <View style={styles.imageContainer}>
        {imageList.map((image,index)=>(
            <Image source={image} style={styles.image}/>
        ))}
      </View>
      </Marquee>
      <Marquee spacing={10} speed={0.5}
     style={{
        transform:[{rotate:'-4deg'}],
        marginTop:10
     }}>
      <View style={styles.imageContainer}>
        {imageList.map((image,index)=>(
            <Image source={image} style={styles.image}/>
        ))}
      </View>
      </Marquee>
    </View>
    <View style={{
        backgroundColor: Colors.WHITE,
        height: '100%',
        padding:20
    }}>
        <Text style={{
            fontFamily:'Outfit-ExtraBold',
            fontSize:25,
            textAlign:'center'
        }}>Cookwithme 🥗🔍 | Find, Create & Enjoy Delicious Recipes !
        </Text>
        <Text style={{
            fontFamily:'Outcook-ExtraBold',
            textAlign:'center',
            color:Colors.GRAY
        }}>Generate recipes in seconds with the power of AI ! 🍕
        </Text>
        <TouchableOpacity 
        onPress={async () => signIn('exp://192.168.0.129:8081')}
        style={styles.button}>
            <Text style={{
                textAlign:'center',
                color:Colors.WHITE,
                fontSize:17,
                fontFamily:'Outfit'
            }}>Get Started</Text>
        </TouchableOpacity>
        <Button title="Sign out" onPress={async () => signOut()} />

    </View>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
    image:{
        width:160,
        height:160,
        borderRadius:25
    },
    imageContainer:{
        display:'flex',
        flexDirection:'row',
        gap: 10
    },
    button:{
        backgroundColor:Colors.PRIMARY,
        padding:12,
        borderRadius:15,
    }
})