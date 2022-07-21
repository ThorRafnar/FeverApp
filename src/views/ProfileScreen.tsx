import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Pressable, SafeAreaView, TextInput, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import {User, Child, Symptom, Diagnosis, SickDay} from '../interfaces';
import {GetDiagnosis, GetSickDays, GetSymptoms, GetUser} from "../requests/Requests";
import SymptomComponent from "../components/SymtpomComponent";
import {BACKGROUND, PRIMARY, PRIMARY_DARK, TEXT} from "../constants/Theme";


// @ts-ignore
function ProfileScreen({navigation}) {

  const [user, setUser] = useState<User | null>(null);


  useEffect(() =>  {
    GetUser()
      .then(u => {
        setUser(u);
      });
  }, []);

  if (user === null) {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size='large' color={PRIMARY}/>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      {}
    </SafeAreaView>
  );
}

export default ProfileScreen;
