import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, SafeAreaView, TextInput} from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import styles from './styles';
import Modal from 'react-native-modal';
import {
  BACKGROUND,
  HEIGHT,
  MARGINS,
  PADDING,
  PRIMARY,
  PRIMARY_LIGHT, PRIMARY_VERY_LIGHT,
  SECONDARY,
  SECONDARY_LIGHT,
  WIDTH
} from "../constants/Theme";
import {Calendar, CalendarList} from 'react-native-calendars';
import {Picker} from '@react-native-picker/picker';
import CookieManager from "@react-native-cookies/cookies";
import {Child, Diagnosis, SickDay, SickDayInput, Symptom} from "../interfaces";
import {GetDiagnosis, GetSymptoms, GetUser, AddSickDay} from "../requests/Requests";
import Toast from "react-native-toast-message";
import {SickdayView} from "../components/sickdayView";


function isOther(d: Diagnosis | null):boolean {
  if (d === null) {
    return false;
  }
  return d.name === 'Other'
}

function removeItemAll(arr: any[], value:any):any[] {
  let i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

export function LogDay({route, navigation}) {
  const [diagnosisSelected, setDiagnosisSelected] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<number>(37);
  const [tempDecimal, setTempDecimal] = useState<number>(0);
  const [symptomList, setSymptomList] = useState<Symptom[]>([]);
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([])
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis|null>(null);
  const [otherDiagnosis, setOtherDiagnosis] = useState<string>('');
  const [child, setChild] = useState<Child|null>(null);
  const [doctorDiagnosisBool, setDoctorDiagnosisBool] = useState<boolean>(false);

  // Start with 3 screens, the temp picker, the diagnosis picker, and the confirm screen
  const [screenCount, setScreenCount] = useState<number>(3);
  const [currentScreen, setCurrentScreen] = useState<number>(0);

  useEffect(() => {
    GetUser()
      .then(u => {
        setChild(u !== null ? u.child : null);
      })
    GetSymptoms()
      .then((s:Symptom[]) => {
        setSymptomList(s);
        // Increase screen count by number of symptoms
        setScreenCount(3 + s.length);
      });
    GetDiagnosis()
      .then((d:Diagnosis[]) => {
        setDiagnosisList(d);
        if (d.length > 0) {
          setDiagnosis(d[0]);
        }
      });
  }, []);
  const {date, sickdayID, makeReload} = route.params;

  const activityDots = () => {
    let arr = [];
    for (let i = 0; i<screenCount; i++) {
      arr.push(i);
    }
    return (
      <View style={styles.dotContainer}>
        {arr.map((i) => {
          if (i === currentScreen) {
            return <View key={i} style={styles.activeDot}/>
          } else {
            return (
              <Pressable
                onPress={() => {
                  if (diagnosisSelected || i < screenCount - 1) {
                    setCurrentScreen(i);
                  } else {
                    Toast.show({
                      type: 'error',
                      text1: 'Select Diagnosis before logging please'
                    });
                    setCurrentScreen(screenCount - 2);
                  }
                }}
              >
                <View key={i} style={styles.inactiveDot}/>
              </Pressable>

            )
          }
        })}
      </View>
    )
  }

  const diagnosisPickerList = () => {

    return (
      <Picker
        style={{flex: 1, width: WIDTH - PADDING * 4,paddingBottom: PADDING}}
        selectedValue={diagnosis?.public_identifier}
        onValueChange={(itemValue, itemIndex) =>{
          setDiagnosisSelected(true);
          let x = diagnosisList.find((d) => {return d.public_identifier === itemValue});
          if (x !== undefined) {
            setDiagnosis(x);
          }
        }}>
        {diagnosisList.map(d => {
          return <Picker.Item label={d.name} value={d.public_identifier} key={d.public_identifier}/>
        })}
      </Picker>
    )
  }

  // If we are selecting temperature
  if (currentScreen === 0) {
    return (
      <View style={[{ alignSelf: 'center', height: HEIGHT * 0.6}, styles.calendarContainer]}>
        <View style={[styles.calendar, {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: BACKGROUND, paddingTop: PADDING}]}>
          <Text style={styles.questionText}>What was {child ? child.name + '\'s' : 'the' } temperature {date === new Date().toISOString().split('T')[0] ? 'today' : 'on ' + new Date(date).toDateString()}?</Text>
          <View style={{flex: 1}}/>
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

          <View style={{flexDirection: 'row'}}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={[styles.buttonEmpty, styles.halfButton]}
            >
              <Text style={styles.buttonTextEmpty}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => setCurrentScreen(currentScreen + 1)}
              style={[styles.buttonFilled, styles.halfButton]}
            >
              <Text style={styles.buttonTextFilled}>Confirm</Text>
            </Pressable>
          </View>

          {activityDots()}

        </View>
      </View>
    )
  // If we are selecting symptom
  } else if (currentScreen <= symptomList.length) {
    return (
      <View style={[{ alignSelf: 'center', height: HEIGHT * 0.6}, styles.calendarContainer]}>
        <View style={[styles.calendar, {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: BACKGROUND, paddingTop: PADDING}]}>
          <Text style={styles.questionText}>{symptomList[currentScreen - 1].question}</Text>
          <View style={{flex: 1}}/>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              onPress={() => {
                let newSymptoms = selectedSymptoms;
                newSymptoms = removeItemAll(newSymptoms, symptomList[currentScreen - 1]);
                setSelectedSymptoms(newSymptoms);
                setCurrentScreen(currentScreen + 1);
              }}
              style={[styles.buttonEmpty, styles.halfButton]}
            >
              <Text style={styles.buttonTextEmpty}>No</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                let newSymptoms = selectedSymptoms;
                newSymptoms.push(symptomList[currentScreen - 1]);
                setSelectedSymptoms(newSymptoms);
                setCurrentScreen(currentScreen + 1);

              }}
              style={[styles.buttonFilled, styles.halfButton]}
            >
              <Text style={styles.buttonTextFilled}>Yes</Text>
            </Pressable>
          </View>

          {activityDots()}

        </View>
      </View>
    )
  // set diagnosis
  } else if (currentScreen === screenCount - 2){
    console.log(isOther(diagnosis));
    return (
      <View style={[{ alignSelf: 'center', height: HEIGHT * 0.6}, styles.calendarContainer]}>
        <View style={[styles.calendar, {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: BACKGROUND, paddingTop: PADDING}]}>
          <Text style={styles.questionText}>Select a diagnosis</Text>

          {diagnosisPickerList()}

          <TextInput
            style={[styles.input, {width: WIDTH - PADDING * 4}]}
            onChangeText={setOtherDiagnosis}
            editable={isOther(diagnosis)}
            placeholder={isOther(diagnosis) ? 'Describe the diagnosis' : ''}
            placeholderTextColor={isOther(diagnosis) ? PRIMARY_LIGHT : PRIMARY_VERY_LIGHT}
            autoCapitalize={'sentences'}
            value={otherDiagnosis}
          />
          <View style={{flex: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Pressable
              onPress={() => setDoctorDiagnosisBool(!doctorDiagnosisBool)}
            >
              {
                doctorDiagnosisBool
                  ?
                  <Ionicons name='checkmark-circle' size={24} color={PRIMARY}/>
                  :
                  <View style={styles.emptyCircle}/>
              }
            </Pressable>
            <Text style={[styles.subText, {marginLeft: doctorDiagnosisBool ? 12 : 11}]}>Diagnosed by a doctor?</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={[styles.buttonEmpty, styles.halfButton]}
            >
              <Text style={styles.buttonTextEmpty}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => setCurrentScreen(currentScreen + 1)}
              style={[styles.buttonFilled, styles.halfButton]}
            >
              <Text style={styles.buttonTextFilled}>Review</Text>
            </Pressable>
          </View>

          {activityDots()}

        </View>
      </View>
    )
    // Finally confirm and add day
  } else {
    return (
      <View style={{flex: 1}}>
        <View style={[styles.calendar, {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: BACKGROUND, paddingTop: PADDING}]}>
          <Text style={[styles.questionText, {paddingTop: 20}]}>{new Date(date).toDateString()}</Text>
          <SickdayView editable={false} sickday={new SickDay(null, date, parseFloat(temperature + '.' + tempDecimal) , doctorDiagnosisBool, isOther(diagnosis), selectedSymptoms, diagnosis, otherDiagnosis)}/>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={[styles.buttonEmpty, styles.halfButton]}
            >
              <Text style={styles.buttonTextEmpty}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                // LOG DAY

                try {
                  let symptomIds = selectedSymptoms.map(s => {
                    return s.public_identifier;
                  });
                  let temp = parseFloat(temperature + '.' + tempDecimal);
                  let odb = isOther(diagnosis);
                  console.log('IS OTHER: ' + odb);
                  console.log('SYMPTOMS: ' + selectedSymptoms);
                  let sickdayInput = new SickDayInput(null, new Date(date), temp, doctorDiagnosisBool, odb, symptomIds, diagnosis.public_identifier, otherDiagnosis);
                  console.log(sickdayInput);
                  AddSickDay(sickdayInput)
                    .then((res:any) => {
                      console.log(res.status);
                      if (res.status === 201 || res.status === 200) {
                        Toast.show({
                          type: 'success',
                          text1: 'Successfully logged day!',
                        });
                        makeReload();
                      } else {
                        res.json()
                          .then(json => {
                            console.log(json);
                            Toast.show({
                              type: 'error',
                              text1: 'Error logging day!',
                              text2: json
                            });
                          })

                      }
                    })
                    .catch((e: any) => {
                      Toast.show({
                        type: 'error',
                        text1: 'Something happened',
                      });
                    })
                  navigation.goBack();
                } catch (e) {
                  Toast.show({
                    type: 'error',
                    text1: 'something bad happened',
                  });
                  navigation.goBack();
                }

              }}
              style={[styles.buttonFilled, styles.halfButton]}
            >
              <Text style={styles.buttonTextFilled}>Confirm</Text>
            </Pressable>
          </View>
          {activityDots()}

        </View>
      </View>
    )
  }
}
