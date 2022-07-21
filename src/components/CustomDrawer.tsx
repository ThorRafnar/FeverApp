import React, {useContext} from 'react';
import {View, Text, ImageBackground, Image, Pressable} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {BACKGROUND, MARGINS, PRIMARY, PRIMARY_LIGHT, PRIMARY_VERY_LIGHT} from "../constants/Theme";
import {Ionicons} from "@expo/vector-icons";
import styles from "../views/styles";
import {AuthContext} from "./Context";

export const CustomDrawer = (props:any, username: string) => {
  // @ts-ignore
  const {signOut} = useContext(AuthContext);

  return (
    <View style={{flex: 1, backgroundColor: BACKGROUND}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: PRIMARY_VERY_LIGHT}}>
        <Pressable
         onPress={() => {
           props.navigation.navigate('Profile')
         }}
        >
          <View style={{height: MARGINS * 6, width: MARGINS * 6, borderRadius: MARGINS * 3, margin: MARGINS, backgroundColor: PRIMARY_LIGHT, alignItems: 'center', justifyContent: 'center'}}>
            <Ionicons name={'person'} size={42}/>
          </View>
        </Pressable>

        <View style={{flex: 1, backgroundColor: BACKGROUND, paddingVertical: MARGINS}}>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: PRIMARY}}>
        <Pressable style={{paddingVertical: 20, flexDirection: 'row', alignItems: 'center'}} onPress={() => signOut()}>
          <Ionicons name='log-out-outline' size={22} color={PRIMARY}/>
          <Text style={{fontSize: 16, color: PRIMARY, paddingLeft: 15}}>Log out</Text>
        </Pressable>
      </View>
    </View>
  )
};

