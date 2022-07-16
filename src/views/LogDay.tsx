import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, SafeAreaView, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import Modal from 'react-native-modal';
import {BACKGROUND, SECONDARY, SECONDARY_LIGHT, WIDTH} from "../constants/Theme";
import {Calendar, CalendarList} from 'react-native-calendars';
import {Picker} from '@react-native-picker/picker';
import CookieManager from "@react-native-cookies/cookies";
import {Child, Diagnosis, Symptom} from "../interfaces";
import {GetDiagnosis, GetSymptoms, GetUser} from "../requests/Requests";


function isOther(diagnosis: { name: string; }) {
  return diagnosis.name === 'Other';
}

export function LogDay({route, navigation}) {
  const [temperature, setTemperature] = useState<number>(37);
  const [tempDecimal, setTempDecimal] = useState<number>(0);
  const [symptomList, setSymptomList] = useState<Symptom[]>([]);
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([])
  const [currentSymptom, setCurrentSymptom] = useState<number>(0);
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<string|null>(null);
  const [otherDiagnosis, setOtherDiagnosis] = useState<string>('');
  const [child, setChild] = useState<Child|null>(null);

  useEffect(() => {
    GetUser()
      .then(u => {
        setChild(u !== null ? u.child : null);
      })
    GetSymptoms()
      .then((s:Symptom[]) => {
        setSymptomList(s);
      });
    GetDiagnosis()
      .then((d:Diagnosis[]) => {
        setDiagnosisList(d);
      });
  }, []);
  const {date} = route.params;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.questionText}>What was {child ? child.name + '\'' : 'the' } temperature {date === new Date().toISOString().split('T')[0] ? 'today' : 'on ' + date}?</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: WIDTH * 0.6}}>
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
    </View>
  )
}
