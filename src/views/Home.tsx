import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Pressable, SafeAreaView, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import Modal from 'react-native-modal';
import {BACKGROUND, PRIMARY, SECONDARY, SECONDARY_LIGHT, WIDTH} from "../constants/Theme";
import {Calendar, CalendarList} from 'react-native-calendars';
import {Picker} from '@react-native-picker/picker';
import CookieManager from '@react-native-cookies/cookies';
import {AuthContext} from "../components/Context";
import {User, Child, Symptom, Diagnosis, SickDay} from '../interfaces';
import {GetSickDays, GetUser} from "../requests/Requests";




// @ts-ignore
function HomeScreen({navigation}) {
  const [child, setChild] = useState<Child|null>(null);
  const [user, setUser] = useState<User|null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [dateList, setDateList] = useState<SickDay[]>([]);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [symptomList, setSymptomList] = useState<Symptom[]>([]);
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);

  const symptom_dot = {startingDay: true, endingDay: true, color: SECONDARY}
  const fever_dot = {startingDay: true, endingDay: true, color: PRIMARY}
  const selected = {selected: true, selectedColor: SECONDARY_LIGHT};
  const notSelected = {selected: false, selectedColor: null};


  // @ts-ignore
  const {signOut} = useContext(AuthContext);

  const toShortString = (d: Date): string => {
    return d.toISOString().split('T')[0];
  }

  useEffect(() =>  {
    GetUser()
      .then(u => {
        setUser(u);
        setChild(u !== null ? u.child : null);
      });
    GetSickDays(new Date('2000-01-01'),  new Date('2100-01-01'))
      .then(d => {
        console.log('HII');
        setDateList(d);
        let m:any = {};
        d.map(day => {
          let dayStyle = {}
          if (day.temperature < 37.9) {
            if (day.symptoms.length > 0) {
              dayStyle = {periods: [fever_dot, symptom_dot]}
            } else {
              dayStyle = {periods: [fever_dot]}
            }
          } else {
            if (day.symptoms.length > 0) {
              dayStyle = {periods: [symptom_dot]}
            } else {
              dayStyle = {periods: []}
            }
          }
          console.log(dayStyle)
          m[toShortString(day.date)] = dayStyle;
        })
        m[toShortString(date)] = {...m[toShortString(date)], ...selected}
        setMarkedDates(m);
      })
  },[]);

  useEffect(() => {
    let m = markedDates;
    console.log(child);
    m[toShortString(date)] = {...m[toShortString(date)], ...selected}
    setMarkedDates(m);
  }, [date])

  // @ts-ignore
  // @ts-ignore
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{ user ? 'Hello ' + user.name : 'Hello there'}</Text>
      <View style={{flex: 1}}/>
      <View style={styles.calendarContainer}>
        <Calendar
          initialDate={toShortString(date)}
          maxDate={toShortString(new Date())}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            let m = markedDates;
            m[toShortString(date)] = {...m[toShortString(date)], ...notSelected}
            setMarkedDates(m);
            setDate(new Date(day.dateString));
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={day => {
            let m = markedDates;
            m[toShortString(date)] = {...m[toShortString(date)], ...notSelected}
            setMarkedDates(m);
            setDate(new Date(day.dateString));
            console.log(date);
          }}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
          markingType={'multi-period'}
          markedDates={markedDates}
        />
      </View>
      <View style={{flex: 1}}/>
      <Pressable
        onPress={() => {
        }}
        style={[styles.buttonFilled, styles.circleButton]}
      >
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons name="add" size={48} color={BACKGROUND} />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          signOut();
        }}
        style={[styles.buttonFilled, styles.circleButton]}
      >
        <View style={{flexDirection: 'row'}}>
          <Text>Log out</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

export default HomeScreen;
