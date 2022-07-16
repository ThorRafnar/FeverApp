import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Pressable, SafeAreaView, TextInput} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import styles from './styles';
import Modal from 'react-native-modal';
import {BACKGROUND, HEIGHT, MARGINS, PRIMARY, SECONDARY, SECONDARY_LIGHT, WIDTH} from "../constants/Theme";
import {Calendar, CalendarList} from 'react-native-calendars';
import {Picker} from '@react-native-picker/picker';
import CookieManager from '@react-native-cookies/cookies';
import {AuthContext} from "../components/Context";
import {User, Child, Symptom, Diagnosis, SickDay} from '../interfaces';
import {GetSickDays, GetUser} from "../requests/Requests";
import Toast from "react-native-toast-message";
import {BORDER_RADIUS} from "react-native-toast-message/lib/src/components/BaseToast.styles";
import {Tag} from "../components/Tag";




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


  const fever_dot = {startingDay: true, endingDay: true, color: PRIMARY}
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
        setChild(u !== null ? u.child : null);
      });
    GetSickDays(new Date('2000-01-01'),  new Date('2100-01-01'))
      .then(d => {
        console.log('HII');
        setDateList(d);
        let m:any = {};
        d.map((day, index) => {
          let dayStyle;
          if (day.temperature < 37.9) {
            dayStyle = {periods: [fever_dot]}
            console.log(toShortString(day.date));
          } else {
            dayStyle = {periods: []}
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
  // @ts-ignore
  // @ts-ignore
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{flex: 1}}/>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => toggleModal()}
        onSwipeComplete={() => toggleModal()}
        swipeDirection={['left', 'right', 'up', 'down']}
        useNativeDriver={true}
      >
        <View style={{ alignSelf: 'center', backgroundColor: BACKGROUND, height: HEIGHT * 0.5, width: WIDTH * 0.7, borderRadius: BORDER_RADIUS, alignItems: 'center', justifyContent: 'center', padding: MARGINS }}>
          <Text>{date.toDateString()}</Text>
          <View style={{flex: 1}}/>
          {
            currentSickDay === null
            ?
            <Text>Normal day</Text>
            :
            (
              <>
                <Text style={styles.questionText}>{currentSickDay.temperature}°C</Text>
                {currentSickDay.symptoms.map((symptom, index) => {
                  return (
                    <Tag name={symptom.name}/>
                  )
                })}
                <Text style={styles.subText}>Diagnosis: {currentSickDay.diagnosis.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons name={currentSickDay.doctors_diagnosis_bool ? 'checkmark-circle' : 'checkmark-circle-outline'} size={22}/>
                  <Text style={styles.subText}>{currentSickDay.doctors_diagnosis_bool ? 'Diagnosed by a doctor' : 'Not diagnosed by a doctor'}</Text>
                </View>

              </>
            )
          }
          <View style={{flex: 1}}/>

          <Pressable onPress={() => toggleModal()} >
            <Text style={styles.subText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.calendarContainer}>
        <Calendar
          initialDate={toShortString(date)}
          maxDate={toShortString(new Date())}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            updateDate(new Date(day.dateString));
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={day => {
            updateDate(new Date(day.dateString));
            toggleModal();
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
          navigation.navigate('Log Day', {date: toShortString(date)})
          :
            Toast.show({
              type: 'info',
              text1: 'You are trying to edit a day'
            });
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
