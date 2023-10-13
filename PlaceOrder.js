import axios from "axios";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Image, TextInput, TouchableOpacity
  } from 'react-native';
import { useState, useEffect } from 'react';

function PlaceOrder({navigation, route}){
  
  useEffect(() => {
    getItems();
    }, []);
    const [C, setC] = useState([])
    route.params = { uid }
   
   const getItems = async () => {
    
   try{
    res = axios.get(`http://192.168.1.3/services/CartByUser?userid=${uid}`);
    setC(res);
   }catch(error){
    console.log(error);
   }

   };


    return(
        <View>
          <TouchableOpacity style={{height: 40, width: 40, backgroundColor: "transparent"}}>
          <Image source={require("./Images/back_50px.png")} style={{height: 25, width: 25, top: 5, left: 5}} />
          </TouchableOpacity>

          <View style={{height: 40, width: "90%", backgroundColor: "rgb(222, 221, 221)", left: "5%", borderRadius: 10, top: 20, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "black", fontSize: 16, fontWeight: 600}}>Delivery in 30 mins</Text>
             <Image source={require("./Images/Stopwatch.png")} style={{height: 25, width: 25, position: "absolute"}}/>
          </View>

          <View style={{paddingBottom: 20, width: "90%", backgroundColor: "rgb(222, 221, 221)", top: 40, left: "5%", borderRadius: 10}}>
            <Text>{item.restaurent}</Text>
            {Array.isArray(C) && C.map((item, index)=>(
              <View style={{height: 100, width: "90%", left: "5%", marginTop: 10}}>
               <Text style={{fontSize: 15, fontWeight: 500}}>{item.itemname}</Text>
               <Text>{item.price}</Text>
               <Text>{item.quantity}</Text>
              </View>
            ))}
          </View>
        </View>
    )

}

export default PlaceOrder;