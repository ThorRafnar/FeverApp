import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, SafeAreaView, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import Modal from 'react-native-modal';
import {BACKGROUND, SECONDARY, SECONDARY_LIGHT, WIDTH} from "../constants/Theme";
import {Calendar, CalendarList} from 'react-native-calendars';
import {Picker} from '@react-native-picker/picker';
import CookieManager from "@react-native-cookies/cookies";

function addSickDay(temperature, decimal, symptoms, doctors_diagnosis_bool, other_diagnosis_bool, other_diagnosis_description, diagnosis_public_identifier) {
  let sickday = {
    'sick_date': new Date().toISOString(),
    'temperature_celcius': Number(temperature + '.' + decimal),
    'doctors_diagnosis_bool': doctors_diagnosis_bool,
    'other_diagnosis_bool': other_diagnosis_bool,
    'other_diagnosis_description': other_diagnosis_description,
    'symptoms': symptoms,
    'diagnosis_public_identifier': diagnosis_public_identifier
  }
  CookieManager.getAll()
    .then((cookies) => {
      let obj = {
        link: 'http://127.0.0.1:5196/user/sickday',
        object: {
          method: 'POST',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookies.jwt.value
          }),
          body: JSON.stringify(sickday)
        }
      }
      console.log(obj);
      fetch(obj.link, obj.object)
        .then((response) => {
          alert(response.status);
          response.json()
            .then(r => {
              console.log(r);
            })
        })
    })
}

function isOther(diagnosis: { name: string; }) {
  return diagnosis.name === 'Other';
}

function LogDay({navigation}) {
  const [temperature, setTemperature] = useState(37);
  const [tempDecimal, setTempDecimal] = useState(0);
  const [currentSymptom, setCurrentSymptom] = useState(0);
  const [selectedSymptomIds, setSelectedSymptomIds] = useState([]);
  const [diagnosis, setDiagnosis] = useState(0);
  const [otherDiagnosis, setOtherDiagnosis] = useState('');
  return (
    <View>
     <Picker
        style={{flex: 1.5}}
        selectedValue={temperature}
        onValueChange={(itemValue, itemIndex) =>
          setTemperature(itemValue)
        }>
        <Picker.Item label='30' value={30} />
        <Picker.Item label='31' value={31} />
        <Picker.Item label='32' value={32} />
        <Picker.Item label='33' value={33} />
        <Picker.Item label='34' value={34} />
        <Picker.Item label='35' value={35} />
        <Picker.Item label='36' value={36} />
        <Picker.Item label='37' value={37} />
        <Picker.Item label='38' value={38} />
        <Picker.Item label='39' value={39} />
        <Picker.Item label='40' value={40} />
        <Picker.Item label='41' value={41} />
        <Picker.Item label='42' value={42} />
        <Picker.Item label='43' value={43} />
        <Picker.Item label='44' value={44} />
        <Picker.Item label='45' value={45} />
      </Picker>
      <Text style={styles.questionText}>,</Text>
      <Picker
        style={{flex: 1}}
        selectedValue={tempDecimal}
        onValueChange={(itemValue, itemIndex) =>
          setTempDecimal(itemValue)
        }>
        <Picker.Item label='0' value={0} />
        <Picker.Item label='1' value={1} />
        <Picker.Item label='2' value={2} />
        <Picker.Item label='3' value={3} />
        <Picker.Item label='4' value={4} />
        <Picker.Item label='5' value={5} />
        <Picker.Item label='6' value={6} />
        <Picker.Item label='7' value={7} />
        <Picker.Item label='8' value={8} />
        <Picker.Item label='9' value={9} />
      </Picker>
      <Text style={styles.questionText}>°C</Text>
    </View>
}
