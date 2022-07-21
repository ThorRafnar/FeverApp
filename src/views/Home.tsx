import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Pressable, SafeAreaView, TextInput, ScrollView} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import styles from './styles';
import Modal from 'react-native-modal';
import {
  BACKGROUND, BACKGROUND_LIGHT, FEVER, HEIGHT, MARGINS, NEUTRAL, PRIMARY, PRIMARY_DARK,
  PRIMARY_LIGHT, PRIMARY_VERY_LIGHT, RED, SECONDARY, SECONDARY_LIGHT, SYMPTOM, TEXT, WIDTH
} from "../constants/Theme";
import {Calendar, CalendarList} from 'react-native-calendars';
import {Picker} from '@react-native-picker/picker';
import CookieManager from '@react-native-cookies/cookies';
import {AuthContext} from "../components/Context";
import {User, Child, Symptom, Diagnosis, SickDay} from '../interfaces';
import {DeleteSickDay, GetSickDays, GetUser} from "../requests/Requests";
import {SickdayView} from "../components/sickdayView";
import Toast from "react-native-toast-message";
import {BORDER_RADIUS} from "react-native-toast-message/lib/src/components/BaseToast.styles";
import {Tag} from "../components/Tag";
import {useFocusEffect} from "@react-navigation/native";




// @ts-ignore
function HomeScreen({navigation}) {
  const [child, setChild] = useState<Child|null>(null);
  const [user, setUser] = useState<User|null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [dateList, setDateList] = useState<SickDay[]>([]);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [symptomList, setSymptomList] = useState<Symptom[]>([]);
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentSickDay, setCurrentSickDay] = useState<SickDay | null>(null);
  const [reloads, setReloads] = useState<number>(0);


  const fever_dot = {startingDay: false, endingDay: false, color: FEVER}
  const symptom_dot = {startingDay: false, endingDay: false, color: SYMPTOM}
  const selected = {selected: true, selectedColor: SECONDARY_LIGHT};
  const notSelected = {selected: false, selectedColor: null};


  // @ts-ignore
  const {signOut} = useContext(AuthContext);

  const toShortString = (d: Date): string => {
    return d.toISOString().split('T')[0];
  }

  const dateLogged = (date: Date): boolean => {
    return (dateList.filter(d => toShortString(d.date) === toShortString(date)).length == 0);
  }

  useEffect(() =>  {
    GetUser()
      .then(u => {
        setUser(u);
        if (u?.child == null) {
          navigation.replace('Create Child');
        }
        setChild(u !== null ? u.child : null);
      });
    GetSickDays(new Date('2000-01-01'),  new Date('2100-01-01'))
      .then(d => {
        setDateList(d);
        let m:any = {};
        d.map((day, index) => {
          let dayStyle:any = {periods: []};
          let nextDate = new Date(day.date.toISOString());
          nextDate.setDate(day.date.getDate() + 1);
          let nextSickDay: SickDay|undefined = d.find(x => {
            return toShortString(x.date) === toShortString(nextDate);
          })

          if (day.temperature > 37.9) {
            dayStyle.periods.push(fever_dot);

          } else {
            dayStyle.periods.push({color: BACKGROUND});
          }
          if (day.symptoms.length > 0) {
            dayStyle.periods.push(symptom_dot);
          }
          m[toShortString(day.date)] = dayStyle;
        })
        m[toShortString(date)] = {...m[toShortString(date)], ...selected}
        setMarkedDates(m);
        let x = d.find((x) => {
          return toShortString(x.date) === toShortString(date);
        });
        if (x !== undefined) {
          setCurrentSickDay(x);
        }
      })
  },[reloads]);

  useEffect(() => {
    let m = markedDates;
    m[toShortString(date)] = {...m[toShortString(date)], ...selected}
    setMarkedDates(m);
    let x = dateList.find((d) => {
      return toShortString(d.date) === toShortString(date);
    });
    setCurrentSickDay(x ? x : null);

  }, [date])

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const updateDate = (day: Date) => {
    let m = markedDates;
    if (toShortString(new Date(day)) !== toShortString(date)) {
      m[toShortString(date)] = {...m[toShortString(date)], ...notSelected}
    }
    setMarkedDates(m);
    setDate(new Date(day));
  }

  const makeReload = () => {
    setReloads(reloads + 1);
  }
  // @ts-ignore
  // @ts-ignore
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: BACKGROUND_LIGHT }}>
      <View style={{flex: 1, backgroundColor: BACKGROUND}}/>
      <View style={styles.calendarContainer}>
        <Calendar
          theme={{
            backgroundColor: BACKGROUND,
            calendarBackground: BACKGROUND,
            textSectionTitleColor: PRIMARY_DARK,
            textSectionTitleDisabledColor: PRIMARY,
            selectedDayBackgroundColor: SECONDARY,
            selectedDayTextColor: TEXT,
            todayTextColor: PRIMARY_DARK,
            dayTextColor: TEXT,
            textDisabledColor: 'grey',
            dotColor: PRIMARY,
            selectedDotColor: BACKGROUND,
            arrowColor: PRIMARY_LIGHT,
            disabledArrowColor: PRIMARY_VERY_LIGHT,
            monthTextColor: PRIMARY,
            indicatorColor: PRIMARY,
            textDayFontWeight: '300',
            textMonthFontWeight: '500',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 22,
            textDayHeaderFontSize: 16
          }}
          initialDate={toShortString(date)}
          maxDate={toShortString(new Date())}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            updateDate(new Date(day.dateString));
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={day => {
            updateDate(new Date(day.dateString));
            navigation.navigate('Edit Day', {sickday: currentSickDay, date: new Date(day.dateString), makeReload: makeReload})
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
          dateLogged(date)
          ?
          navigation.navigate('Log Day', {date: toShortString(date), makeReload: makeReload})
          :
          navigation.navigate('Edit Day', {sickday: currentSickDay, date: date, makeReload: makeReload})
        }}
        style={[styles.buttonFilled, styles.circleButton]}
      >
        <View style={{flexDirection: 'row'}}>
          {
            dateLogged(date)
            ?
              <MaterialIcons name="add" size={48} color={BACKGROUND} />
            :
              <MaterialIcons name="edit" size={36} color={BACKGROUND} />
          }

        </View>
      </Pressable>

    </SafeAreaView>
  );
}

export default HomeScreen;
