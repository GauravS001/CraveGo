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

function Search({navigation}){

    const [Search, setSearch] = useState([]);
    const [Searchkey, setSearchkey] = useState('');
    
    const handleButtonPress = (text) => {
        setSearchkey(text)
      };
    const getSearch = async () => {
        try {
          const res = await axios.get(`http://192.168.1.3:8080/services/search?searchkey=${Searchkey}`);
          setSearch(res.data);
        
        } catch (error) {
          console.log(error);
        }
      };

    return(
        <View>
           <View style={{height: 40, width: "92%", backgroundColor: "white", left: 15, top: 15, borderRadius: 10, elevation: 10}}>
            <TouchableOpacity style={{height: 20, width: 20, top: 10, left: 8,}} 
             onPress={()=>navigation.goBack()}>
             <Image source={require("./Images/back_50px.png")} style={{height: 20, width: 20}}/>
              </TouchableOpacity> 
               <TextInput
                placeholder="Search Cake"
                value={Searchkey}
                onChangeText={handleButtonPress}
                style={{height: "100%", width: "72%", backgroundColor: "white", position: "absolute", left: "11%"}}>
               </TextInput>
               <View style={{height: "100%", width: "17%", backgroundColor: "white", position: "absolute", left: "83%", borderTopRightRadius: 10,
                borderBottomRightRadius: 10}}>
                     <TouchableOpacity style={{height: "100%", width: "100%", backgroundColor: "white", borderTopRightRadius: 10,
                        borderBottomRightRadius: 10}}
                     onPress={()=> getSearch()}>
                         <Image source={require("./Images/search_50px.png")} style={{height: 26, width: 26, top: 6.5, left: 15, position: "absolute"}}/>
                        </TouchableOpacity>
                </View>
             </View>

             <Text style={{letterSpacing: 3, top: 25, left: 17}}>SEARCH RESULT</Text>
              <ScrollView style={{top: 35, backgroundColor: "transparent"}}>
              {Search.map((item, index)=>(
                <TouchableOpacity key={index} style={{height: 100, width: "100%", backgroundColor: "transparent", marginTop: 5}}
                 onPress={()=> navigation.navigate("Menu", 
                 menukey= item.title,
                 type2= item.type2,
                 avgprice= item.avgprice,
                 rating= item.rating,
                 location= item.location
                 )}>
                    <View style={{height: 70, width: "24%", backgroundColor: "white", top: 10, left: 15, elevation: 15, borderRadius: 15}}>
                     <Image source={{ uri: item.url }} style={{height: "87%", width: "88.5%", borderRadius: 10, marginTop: "5.5%", marginLeft: "5.5%"}}/>
                      </View>
                    <Text style={{position: "absolute", color: "black", fontWeight: "500", left: "32%", top: 10, fontSize: 17,
                     letterSpacing: 1.5}}>{item.title}</Text>
                      <View style={{height: 20, width: 35, backgroundColor: "green", position: "absolute", top: "40%", left: "32%", borderRadius: 3}}>
                       <Image source={require("./Images/star_50px.png")} style={{height: 6, width:6, position: "absolute", left: "72%", top: 7}}/>
                        <Text style={{color: "white", fontWeight: "800", top: 2, left: 6, fontSize: 11}}>{item.rating}</Text>
                      </View>
                       <View style={{position: "absolute", left: "43%", top: "42%", width: "100%"}}>
                       <Image source={require("./Images/Location_50px.png")} style={{height: 17, width: 17}}/>
                        <Text style={{position: "absolute", fontWeight: "600", fontSize: 12, left: 20}}>{item.location}</Text>
                       </View>
                       <Text style={{position: "absolute", top: "66%", left: "32%", fontSize: 11.5, fontWeight: "500"}}>{item.type2}  ~  {item.avgprice}</Text>
                    
                </TouchableOpacity>
               ))}
               <View style={{height: 30, width: "100%"}}></View>
              </ScrollView>
        </View>
    )
}

export default Search