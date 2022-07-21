import {Pressable, ScrollView, Text, View} from "react-native";
import styles from "../views/styles";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {Child, Diagnosis, SickDayInput, Symptom} from "../interfaces";
import {BACKGROUND, MARGINS, PADDING, PRIMARY_DARK, WIDTH} from "../constants/Theme";
import {Picker} from "@react-native-picker/picker";
import {EditSickDay, GetDiagnosis, GetSymptoms} from "../requests/Requests";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";


export function SickdayView(props) {
  const {sickday, editable, makeReload, goBack} = props;
  const [edited, setEdited] = useState<boolean>(false);
  const [editingTemperature, setEditingTemperature] = useState<boolean>(false);
  const [editingDiagnosis, setEditingDiagnosis] = useState<boolean>(false);
  const [editingSymptoms, setEditingSymptoms] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<number>(Math.floor(sickday.temperature));
  const [tempDecimal, setTempDecimal] = useState<number>(parseInt(sickday.temperature.toString().split('.')[1]) | 0);
  const [symptoms, setSymptoms] = useState<Symptom[]>(sickday.symptoms);
  const [diagnosis, setDiagnosis] = useState<Diagnosis|null>(sickday.diagnosis);
  const [otherDiagnosis, setOtherDiagnosis] = useState<string>(sickday.other_diagnosis_description);
  const [doctorDiagnosisBool, setDoctorDiagnosisBool] = useState<boolean>(sickday.doctors_diagnosis_bool);
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);
  const [symptomList, setSymptomList] = useState<Symptom[]>([]);

  useEffect(() => {
    const fetchData = async ():Promise<void> => {
      const s = GetSymptoms();
      const d = GetDiagnosis();
      Promise.all([s, d])
        .then(values => {
          if (values[0]) {
            setSymptomList(values[0]);
          }
          if (values[1]) {
            setDiagnosisList(values[1])
          }
        })
    }
    fetchData();
  }, [])

  const diagnosisPickerList = () => {

    return (
      <Picker
        style={{flex: 1, width: WIDTH - PADDING * 4,paddingBottom: PADDING}}
        selectedValue={diagnosis?.public_identifier}
        onValueChange={(itemValue, itemIndex) =>{
          setEdited(editable);
          let x = diagnosisList.find((d) => {return d.public_identifier === itemValue});
          if (x !== undefined) {
            setDiagnosis(x);
          }
        }}>
        {diagnosisList.map(d => {
          if (d.name !== 'Other') {
            return <Picker.Item label={d.name} value={d.public_identifier} key={d.public_identifier}/>
          }
        })}
      </Picker>
    )
  }

  const symptomsPickerList = () => {
    console.log(symptomList)
    return (
      <View
        style={{flex: 1}}
      >
        {
          symptomList.map(s => {
            if (!symptoms.includes(s)) {
              return (
                <Pressable
                  style={[styles.button, styles.buttonFilled]}
                  onPress={() => {
                    setEdited(true);
                    setSymptoms(symptoms.concat([s]))
                  }}
                >
                  <Text style={styles.buttonTextFilled}>{s.name}</Text>
                </Pressable>
              )
            }
          })
        }
      </View>
    )
  }


  return (
    <>
      <Modal
        isVisible={editingTemperature}
        onBackdropPress={() => setEditingTemperature(!editingTemperature)}
        style={styles.sickdayModal}
      >
        <View style={{width: WIDTH * 0.65, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Picker
            style={{flex: 1.5}}
            selectedValue={temperature}
            onValueChange={(itemValue, itemIndex) => {
              setEdited(editable);
              setTemperature(itemValue)
            }}>
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
        onValueChange={(itemValue, itemIndex) => {
        setEdited(editable);
        setTempDecimal(itemValue)
      }}>
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
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonEmpty]}
        onPress={() => setEditingTemperature(!editingTemperature && editable)}
      >
        <Text style={styles.buttonTextEmpty}>{temperature}.{tempDecimal}°C</Text>
      </Pressable>



      <View style={{flex: 0.1}}/>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: MARGINS}}>
        {symptoms.map((symptom: Symptom, index: number) => {
          return (
            <View style={styles.tag} key={symptom.public_identifier}>
              <Text style={styles.tagText}>{symptom.name}</Text>
              {
                editable
                  ?
                  <Pressable
                    onPress={() => {
                      let s = symptoms.filter((sym) => {
                        return sym.public_identifier !== symptom.public_identifier
                      });
                      setSymptoms(s);
                      setEdited(true);
                    }}
                  >
                    <Ionicons name={'close-circle'} size={24} color={PRIMARY_DARK}/>
                  </Pressable>
                  :
                  <View/>
              }

            </View>
          )
        })}
      </View>
      <View style={{flex: 0.1}}/>

      <Pressable
        style={[styles.button, styles.buttonEmpty]}
        onPress={() => setEditingSymptoms(!editingSymptoms && editable)}
      >
        <Text style={styles.buttonTextEmpty}>Symptoms</Text>
      </Pressable>
      <Modal
        isVisible={editingSymptoms}
        onBackdropPress={() => setEditingSymptoms(!editingSymptoms)}
        style={styles.sickdayModal}
      >
        {symptomsPickerList()}

      </Modal>


      <Pressable
        style={[styles.button, styles.buttonEmpty]}
        onPress={() => setEditingDiagnosis(!editingDiagnosis && editable)}
      >
        <Text style={styles.buttonTextEmpty}>{diagnosis.name === 'Other' ? otherDiagnosis : diagnosis.name}</Text>
      </Pressable>

      <Modal
        isVisible={editingDiagnosis}
        onBackdropPress={() => setEditingDiagnosis(!editingDiagnosis)}
        style={styles.sickdayModal}
      >
        {diagnosisPickerList()}

      </Modal>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Pressable
          onPress={() => {
            setDoctorDiagnosisBool(!doctorDiagnosisBool);
            setEdited(editable);
          }}
        >
          <Ionicons name={doctorDiagnosisBool ? 'checkmark-circle' : 'checkmark-circle-outline'} size={22}/>
        </Pressable>
        <Text style={styles.subText}>{doctorDiagnosisBool ? '       Diagnosed by a doctor' : 'Not diagnosed by a doctor'}</Text>
      </View>
      {
        (edited && editable)
        ?
          <Pressable
            onPress={() => {
              let symptomList = symptoms.map((s) => {
                return s.public_identifier;
              })
              let temp = temperature + '.' + tempDecimal;
              console.log(temp);
              EditSickDay(new SickDayInput(sickday.public_identifier, sickday.date, parseFloat(temp), doctorDiagnosisBool, otherDiagnosis === undefined, symptomList, diagnosis?.public_identifier, otherDiagnosis))
              .then(status => {
                console.log(status);
                if (status === 204) {
                  Toast.show({
                    type: 'success',
                    text1: 'Updated sickday!'
                  })
                  goBack();
                  setTimeout(makeReload, 1000);
                }
              })

            }}
            style={[styles.button, styles.buttonFilled, {position: 'absolute', bottom: 44 + MARGINS * 2}]}>

            <Text style={styles.buttonTextFilled}>Change sickday</Text>
          </Pressable>
          :
          <View />
      }

    </>
  )
}
