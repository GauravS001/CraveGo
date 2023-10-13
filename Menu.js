import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TextInput, TouchableOpacity
  } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Menu({ route, navigation }){
    useEffect(() => {
        getMenu();
        }, []);
     route.params = { menukey, type2, avgprice, rating, location }

     const [Menu, setMenu] = useState([]);
    
     const getMenu = async () => {
        try {
          const res = await axios.get(`http://192.168.1.3:8080/services/menu?menukey=${menukey}`);
          setMenu(res.data);
        
        } catch (error) {
          console.log(error);
        }
      };

    const userId = 101;
    let restaurent = menukey;
    const [Cart, setCart] = useState([]);
    const [cH, setcH] = useState(40);
    const addToCart = async (itemname, price, quantity, userid) =>{
        try{
          const res = await axios.post('http://192.168.1.3:8080/services/saveToCart',{
           itemname,
           price,
           quantity,
           userid,
           restaurent
          });

          const rest = axios.get('http://192.168.1.3:8080/services/AllCart')
          setCart(rest);

          Alert.alert(
            'Add to cart',
            'Item added to cart.',
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              },
            ],
            { cancelable: false }
          );
        }catch(error){
          console.log(error);
        }
    };

    function expC(){
      setcH(400);
    }

    function retC(){
      setcH(40);
    }
   
    const remItemFromCart = async (itemname, price, quantity, userid) =>{
      try{
        const res = await axios.post('http://192.168.1.3:8080/services/delFromCart',{
         itemname,
         price,
         quantity,
         userid,
         restaurent
        });
      }catch(error){
        console.log(error);
      }
    };

    return(
        <View>
        <TouchableOpacity style={{top: 10, left: 10}}
         onPress={()=> navigation.goBack()}>
            <Image source={require("./Images/back_50px.png")} style={{height: 25, width: 25}}/>
        </TouchableOpacity>

        <View style={{position: "absolute", left: "90%", top: 5}}>
        <TouchableOpacity
        onPress={()=> getMenu()}>
            <Image source={require("./Images/vertical_menu_50px.png")} style={{height: 25, width: 25}}/>
        </TouchableOpacity>
        </View>

       

        <View style={{height: 120, width: "90%", backgroundColor: "transparent", left: "5%", top: 50, alignItems: 'center',}}>
            <Text style={{color: "black", fontWeight: "600", fontSize: 25}}>{menukey}</Text>
             <Text style={{color: "gray", fontWeight: "400", top: 5, letterSpacing: 1}} >{type2}</Text>
             <View style={{height: 25, width: 45, backgroundColor: "green", top: 16, borderRadius: 6}}>
                  <Image source={require("./Images/star_50px.png")} style={{height: 10, width:10, position: "absolute", left: "63%", top: 7}}/>
                   <Text style={{color: "white", fontWeight: "800", top: 2, left: 6}}>{rating}</Text>
                </View>
                <View style={{height: 40, width: 100, backgroundColor: "transparent", top: 20}}>
                    
                <Image source={require("./Images/Location_50px.png")} style={{height: 20, width: 20}}/>
                  <Text style={{fontWeight: "600", fontSize: 14, position: "absolute", left: 25}}>{location}</Text>
                </View>
        </View>

        <Text style={{color: "black", top: 90, left: 20, color: "black", fontWeight: "600", fontSize: 17}}>MENU</Text>
         <ScrollView style={{backgroundColor: "transparent", width: "100%", height: 500, top: 95}}>
            {Menu.map((item, index)=>(
                <View key={index} style={{height: 200, width: "100%", backgroundColor: "transparent", marginTop: 20}}>
                 <View style={{height: "75%", width: "43%", backgroundColor: "white", top: "13%", left: "52%",
                  borderRadius: 15, elevation: 3}}>
                    <Image source={{ uri: item.url }} style={{height: "100%", width: "100%", borderRadius: 15}}/>
                  </View>
                   <View style={{position: "absolute", top: 25}}>
                   <Text style={{fontSize:18, width: 150,left: 15, color: "black", fontWeight: "500", letterSpacing: 0.4}} numberOfLines={2} ellipsizeMode="tail">{item.item_name}</Text>
                     <View style={{height: 22, width: 45, backgroundColor: "rgb(252, 238, 211)", top: 10, left: 16, borderRadius: 5, borderColor: "orange",
                      borderWidth: 1}}>
                        <Text style={{color: "black", fontWeight: "600", left: 7, fontSize: 13}}>{item.rating}</Text>
                         <Image source={require("./Images/star_24px.png")} style={{height: 10, width: 10, position: "absolute", top: 5, left: 28}}/>
                      </View>
                       <Text style={{marginTop: -10, left: 68, fontWeight: "500", color: "rgb(77, 77, 77)", fontSize: 12.5}}>{item.rating_count} ratings</Text>
                       <Text style={{left: 20, top: 7, color: "black", fontWeight: "500"}}>Rs.{item.price}</Text>
                        <Text style={{width: 130, top: 10, left: 20, fontSize: 13, fontWeight: "400", letterSpacing: 0.3}}numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
                         <Text style={{top: 7, left: 20, fontWeight: "600", fontSize: 13}}>read more</Text>
                          <View style={{height: 35, width: 120, backgroundColor: "rgb(252, 215, 215)", position: "absolute", top: 127, left: 206.5, borderRadius: 5, 
                           borderWidth: 0.5, borderColor: "red"}}>
                           <TouchableOpacity style={{height: 35, width: 120}}
                           onPress={()=>addToCart(item.item_name, item.price, 1, userId)}>
                            <Text style={{color: "red", fontWeight: "600", fontSize: 18, left: "36%", top: 3.5}}>ADD</Text>
                             <Image source={require("./Images/plus_math_26px.png")} style={{height: 11, width: 11, position: "absolute",
                              left: "85%", top: 4}}/>
                           </TouchableOpacity>
                          </View>
                         
                   </View>
                   <View style={styles.dashedLineContainer}>
                  <View style={styles.dashedLine} />
                 </View>
                </View>
            ))}
            <View style={{height: 100, width: "100%"}}></View>
         </ScrollView>

         <View style={{height: cH, width: "100%", backgroundColor: "white", position: "absolute", bottom: -55, borderTopRightRadius: 15, 
         borderTopLeftRadius: 15}}>
          <TouchableOpacity style={{height: 30, width: 30, backgroundColor: "white", left: "90%", justifyContent: "center", alignItems: "center"}}
          onPress={()=>expC()}>
            <Image source={require("./Images/open.png")} style={{height: 25, width: 25, top: 5}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{height: 30, width: 30, backgroundColor: "white", left: "80%", position: "absolute", justifyContent: "center", alignItems: "center"}}
          onPress={()=>retC()}>
             <Image source={require("./Images/close.png")} style={{height: 25, width: 25, top: 5}}/>
          </TouchableOpacity>
          <Image source={require("./Images/cart.png")} style={{position: "absolute", height: 22, width: 22, left: 15, top:9}}></Image>
          <Text style={{color: "black", fontSize: 16, fontWeight: 600, position: "absolute", top: 7, left: "12%"}}>Cart</Text>
          {Cart.map((item)=>(
            <View style={{height: 50, width: "100%", backgroundColor: "gray"}}>
              <Text>{item.itemname}</Text>
              <Text>{item.price}</Text>
              <Text>{item.quantity}</Text>
              <TouchableOpacity style={{height: 20, width: "30%", backgroundColor: "red"}}
              onPress={()=>remItemFromCart(item.item_name, item.price, 1)}>
                <Text style={{color: "white", fontSize: 15, fontWeight: 500}}>-</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={{height: 40, width: "30%", backgroundColor: "red", top: "79%", left: "67%", 
           borderRadius: 10, justifyContent: "center", alignItems: "center"}}
           onPress={()=>navigation.navigate("PlaceOrder", uid = menukey)}>
            <Text style={{color: "white", fontSize: 16, fontWeight: 700}}>NEXT</Text>
           </TouchableOpacity>
         </View>
        </View>
    )
}

const styles = StyleSheet.create({
  dashedLineContainer: {
    top: 48,
    left: 16,
    width: '90%',
    alignItems: 'center',
  },
  dashedLine: {
    width: '100%',
    height: 0.2,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgb(209, 207, 207)',
  },
});


export default Menu