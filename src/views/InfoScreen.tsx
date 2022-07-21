import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Pressable, SafeAreaView, TextInput, ScrollView, FlatList} from 'react-native';
import {User, Child, Symptom, Diagnosis, SickDay} from '../interfaces';
import {GetDiagnosis, GetSickDays, GetSymptoms, GetUser} from "../requests/Requests";
import SymptomComponent from "../components/SymtpomComponent";
import {BACKGROUND, PRIMARY_DARK, TEXT} from "../constants/Theme";


// @ts-ignore
function InfoScreen({navigation}) {

  const [symptomList, setSymptomList] = useState<Symptom[]>([]);
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);


  useEffect(() =>  {
    console.log('GETTING SYMPTOMS');
    GetSymptoms()
      .then(s => {
        console.log(typeof(s));
        console.log(s);
        setSymptomList(s);
      });
    GetDiagnosis()
      .then(d => {
        console.log(typeof(d));
        console.log(d);
        setDiagnosisList(d);
      });
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color: PRIMARY_DARK, fontSize: 26, fontWeight: '500'}} key={'symptoms'}>Common symptoms</Text>
        {symptomList.map((x: Symptom, index: number) => {
          return (
            <SymptomComponent name={x.name} description={x.long_description} key={'symptom' + index}/>
          )
        }
        )}
        <Text style={{color: PRIMARY_DARK, fontSize: 26, fontWeight: '500'}} key={'diagnoses'}>Common diagnoses</Text>
        {diagnosisList.map((x: Diagnosis, index: number) => {
          if (x.name !== 'Other') {
            return (
              <SymptomComponent name={x.name} description={x.description} key={'diagnosis' + index}/>
            )
          }}
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default InfoScreen;
