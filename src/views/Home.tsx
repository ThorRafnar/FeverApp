import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Pressable, SafeAreaView, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import Modal from 'react-native-modal';
import {BACKGROUND, PRIMARY, SECONDARY_LIGHT, WIDTH} from "../constants/Theme";
import {Calendar, CalendarList} from 'react-native-calendars';
import {Picker} from '@react-native-picker/picker';
import CookieManager from '@react-native-cookies/cookies';
import {AuthContext} from "../components/Context";
import {User, Child} from '../interfaces/index';




// @ts-ignore
function HomeScreen({ navigation }) {
  const [child, setChild] = useState<Child|null>(null);
  const [user, setUser] = useState<User|null>(null);
  let today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [dates, setDates] = useState([]);
  const [symptomList, setSymptomList] = useState([{}]);
  const [diagnosisList, setDiagnosisList] = useState([{}]);
  const sick = {color: PRIMARY, textColor: 'white'};
  const selected = {color: SECONDARY_LIGHT, textColor: 'white'};

  // @ts-ignore
  const {signOut} = useContext(AuthContext);

  useEffect(() =>  {

  },[]);

  console.log(dates);
  // @ts-ignore
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{flex: 1}}/>
      <View style={styles.calendarContainer}>
        <Calendar
          initialDate={date}
          maxDate={today}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            setDate(day.dateString);
            console.log(date);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={day => {
            setDate(day.dateString);
            console.log(date);
          }}
          disableAllTouchEventsForDisabledDays={true}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
          markingType={'period'}
          markedDates={dates}
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
