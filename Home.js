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

  

import {Colors} from 'react-native/Libraries/NewAppScreen';

    
function Home({navigation}){

  useEffect(() => {
    getWOYM();
    getHSTags();
    getAllRestaurents();
  }, []);

  const [WOYM, setWOYM] =  useState([]);
  const [HSTags, setHSTags] = useState([]);
  const [AllRestaurents, setAllRestaurents] = useState([]);
  const getWOYM = async () => {
    try {
      const res = await axios.get('http://192.168.1.3:8080/services/WOYM');
      setWOYM(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getHSTags = async () => {
    try {
      const res = await axios.get('http://192.168.1.3:8080/services/HSTAGS');
      setHSTags(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRestaurents = async () => {
    try {
      const res = await axios.get('http://192.168.1.3:8080/services/ALLRESTAURENTS');
      setAllRestaurents(res.data);
    } catch (error) {
      console.log(error);
    }
  };


    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
  
       <View style={{height: 110, width: "100%", backgroundColor: "white"}}>
        <View style={{height: 55, width: 55, backgroundColor: "white", left: "85%"}}>
         <TouchableOpacity style={{height: 40, width: 40, top: 6, left: 7}}>
          <Image source={require("./Images/male_user_50px.png")} style={{height: 40, width: 40}}/>
         </TouchableOpacity>
        </View>
        
        <Image source={require("./Images/logo.png")} style={{position: "absolute", height: 28, width: 28, left: 10, top: 10}}/>
          <Text style={{color: "rgb(214, 3, 3)", position: "absolute", fontWeight: "800", fontSize: 18, left: "11%", top: 13}}>CraveGo</Text>


        <View style={{height: 40, width: "92%", backgroundColor: "white", left: 15, top: 5, borderRadius: 10, elevation: 10}}>
          <Image source={require("./Images/search_50px.png")} style={{height: 26, width: 26, top: 6.5, left: 8, position: "absolute"}}/>
            <TouchableOpacity style={{top: "35%", left: "17%"}}
             onPress={()=>navigation.navigate("Search")}>
              <Text style={{color: "rgb(150, 150, 150)", fontSize: 16, fontWeight: "500", top: -6}}>Search "Biryani"</Text>
            </TouchableOpacity>
        </View>
      </View>





        <ScrollView showsVerticalScrollIndicator={false}>
         <View style={{height: 200, width: "100%", backgroundColor: "white"}}>
           <Text style={{fontSize: 14, fontWeight: "500", left: "29%", top: 15, color: "rgb(123, 123, 123)"}}>WHAT'S ON YOUR MIND?</Text>
            <View style={{height: 1.5, width: "22%", backgroundColor: "rgb(224, 222, 222)", position: "absolute", left: 10, top: 25}}></View>
             <View style={{height: 1.5, width: "20%", backgroundColor: "rgb(224, 222, 222)", position: "absolute", left: "77%", top: 25}}></View>


          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width: "100%", backgroundColor: "white", top: 30}}>
            {WOYM.map((item, index)=>(
              <View key={index}  style={{height: 120, width: 120, backgroundColor: "white", marginLeft: 10, borderRadius: 10,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'}}>
                <TouchableOpacity style={{height: 90, width: 90, borderRadius: 100}}>
                <Image source={{ uri: item.imgUrl }} style={{height: 90, width: 90, borderRadius: 100}}/>
                </TouchableOpacity>
                <Text style={{position: "absolute", top: "93%", color: "rgb(69, 68, 68)", fontWeight: "500"}}>{item.title}</Text>
              
              </View>
            ))}
            <View style={{height: 20, width: 30}}></View>
          </ScrollView>
          </View>



         <View style={{height: 90, width: "100%", backgroundColor: "white"}}>
         
           <Text style={{fontSize: 14, fontWeight: "500", left: "33%", top: 15, color: "rgb(123, 123, 123)"}}>ALL RESTAURENTS</Text>
            <View style={{height: 1.5, width: "25%", backgroundColor: "rgb(224, 222, 222)", position: "absolute", left: 10, top: 25}}></View>
             <View style={{height: 1.5, width: "26%", backgroundColor: "rgb(224, 222, 222)", position: "absolute", left: "71%", top: 25}}></View>


           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width: "100%", backgroundColor: "white", top: 40}}>
            {HSTags.map((item, index)=>(
             <View key={index} style={{paddingTop: 3,paddingLeft: 11,paddingRight: 10 ,height: 25, elevation: 5, backgroundColor: "white", marginLeft: 20,
             borderRadius: 5}}>
               <Text style={{color: "black", fontWeight: "500", fontSize: 13}}>{item.tag}</Text>
             </View>
            ))}
            <View style={{height: 20, width: 30}}></View>
          </ScrollView>
        </View>

        <View style={{width: "100%", paddingBottom: 50}}>
         <ScrollView style={{backgroundColor: "white", width: "100%"}}>
          {AllRestaurents.map((item, index)=>(
            <TouchableOpacity key={index} activeOpacity={0.8} style={{height: 360, width: "91.7%", backgroundColor: "white", left: 15.5, marginTop: 20, borderRadius: 15, elevation: 5}}
            onPress={()=> navigation.navigate("Menu", 
            menukey= item.title,
            type2= item.type2,
            avgprice= item.avgprice,
            rating= item.rating,
            location= item.location
            )}>
             <Image source={{ uri: item.url }} style={{height: 230, width: "100%", borderTopRightRadius: 15, borderTopLeftRadius: 15}}/>
              <Text style={{color: "black", fontSize: 22, fontWeight: "600", left: 13, top: 5}}>{item.title}</Text>
               <Text style={{top: 6, left: 15, fontSize: 12, fontWeight: "500", color: "gray"}}>{item.type2}  ~  {item.avgprice}</Text>
                <View style={{height: 25, width: 45, backgroundColor: "green", position: "absolute", top: "67%", left: "82.5%", borderRadius: 6}}>
                  <Image source={require("./Images/star_50px.png")} style={{height: 10, width:10, position: "absolute", left: "63%", top: 7}}/>
                   <Text style={{color: "white", fontWeight: "800", top: 2, left: 6}}>{item.rating}</Text>
                </View>
                 <Image source={require("./Images/Location_50px.png")} style={{height: 18, width: 18, top: 8, left: 13}}/>
                  <Text style={{fontWeight: "600", fontSize: 12, position: "absolute", top: "78.9%", left: 35}}>{item.location}</Text>

                 <View style={styles.dashedLineContainer}>
                  <View style={styles.dashedLine} />
                 </View>

                <Image source={require("./Images/discount.png")} style={{height: 28, width: 28, top: 24, left: 18}}/>
                 <Text style={{color: "green", fontSize: 13, fontWeight: "600", left: 55, position: "absolute", top: "90%"}}>{item.offer}</Text>

            </TouchableOpacity>
          ))}
          <View style={{height: 95, width: "100%"}}></View>
         </ScrollView>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  dashedLineContainer: {
    top: 17,
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

export default Home