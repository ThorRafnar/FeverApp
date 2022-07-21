import {Pressable, Text, View} from "react-native";
import styles from "./styles";
import {SickdayView} from "../components/sickdayView";
import {BACKGROUND, MARGINS, NEUTRAL, RED} from "../constants/Theme";
import {DeleteSickDay} from "../requests/Requests";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
import React, {useState} from "react";
import {Diagnosis, Symptom} from "../interfaces";


export const EditDay = ({navigation, route}) => {

  const {date, sickday, makeReload} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: BACKGROUND}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={[styles.questionText, {paddingTop: 20}]}>{date.toDateString()}</Text>
        <View style={{flex: 0.2}}/>
        {
          sickday === null
            ?
            <Text>Normal day</Text>
            :
            (
              <>
                <SickdayView sickday={sickday} editable={true} makeReload={() => makeReload()} goBack={() => navigation.goBack()}/>
                <View style={{flex: 0.5}}/>
                <Pressable
                  style={[styles.button, styles.buttonEmpty, {flexDirection: 'row', borderColor: RED, position: 'absolute', bottom: MARGINS}]}
                  onPress={() => {
                    DeleteSickDay(sickday?.public_identifier).then(r => {
                      Toast.show({
                        type: 'info',
                        text1: 'Sickday deleted'
                      })
                      makeReload();
                      navigation.goBack();
                    });
                  }}
                >
                  <Text style={[styles.buttonTextEmpty, {color: RED}]}>Delete</Text>
                </Pressable>
              </>
            )
        }
        <View style={{flex: 0.5}}/>
      </View>
    </View>
  )
}

