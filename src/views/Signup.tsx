import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Modal, Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import styles from "./styles";
import {PRIMARY_DARK, PRIMARY_LIGHT, TEXT} from "../constants/Theme";
import DatePicker from 'react-native-date-picker';
import CookieManager from '@react-native-cookies/cookies';
import {AuthContext} from "../components/Context";


function SignupScreen({navigation}) {
  const [email, onChangeEmail] = useState('');
  const [name, onChangeName] = useState('');
  const [date, setDate] = useState(new Date("2000-01-01"));
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [password, onChangePassword] = useState('');
  const [password2, onChangePassword2] = useState('');
  const [doctor, setDoctor] = useState('');
  const [doctorIdentifier, setDoctorIdentifier] = useState('');
  const [doctorSelected, setDoctorSelected] = useState(false);
  const maxDate = new Date("2022-06-26");
  const [dateOfBirthSet, setDateOfBirthSet] = useState(false);
  const [doctors, setDoctors] = useState([]);


  useEffect(() => {
    // declare the async data fetching function
    (
      async () => {
        // get the data from the api
        const response = await fetch('http://127.0.0.1:5196/doctor', {
          headers: {'Content-Type': 'application/json'}
        });
        // convert the data to json
        const json = await response.json();

        setDoctors(json);
      }
    )()
  },([]));

  // @ts-ignore
  const {signUp} = useContext(AuthContext);

  const signupHandler = (name:string, email:string, date:string, doctorIdentifier:string, password:string, password2:string):void => {
    signUp(name, email, date, doctorIdentifier, password, password2);
  }

  const renderItem = ({item}) => (
    <View>
      <Pressable
        onPress={() => {
          setModalVisible(false);
          setDoctor(item.name);
          setDoctorIdentifier(item.public_identifier);
          setDoctorSelected(true);
        }}
        style={[styles.button, styles.buttonEmpty]}>
        <Text style={styles.buttonTextEmpty}>{item.name}</Text>
      </Pressable>
    </View>
  );
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flex: 1}}/>
      <Text style={[styles.welcomeText, {color: PRIMARY_DARK}]}>Create an Account</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        placeholder={'Enter full name'}
        placeholderTextColor={PRIMARY_LIGHT}
        autoCapitalize={'words'}
        value={name}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder={'Enter email address'}
        keyboardType={'email-address'}
        autoCapitalize={'none'}
        autoCorrect={false}
        placeholderTextColor={PRIMARY_LIGHT}
        value={email}
      />
      <View>
        <Pressable
          onPress={() => setOpen(true)}
          style={[styles.input]}
        >
          <Text
            style={[styles.DOBText, {color: dateOfBirthSet ? TEXT : PRIMARY_LIGHT}]}>{dateOfBirthSet ? date.toDateString().substring(4) : 'Date of Birth'}</Text>
        </Pressable>
        <DatePicker
          modal
          open={open}
          mode='date'
          date={date}
          onConfirm={(date) => {
            setDate(date);
            setDateOfBirthSet(true);
            setOpen(false);
          }}
          maximumDate={maxDate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      <View>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={[styles.input]}>
          <Text style={[styles.DOBText, {color: doctorSelected ? TEXT : PRIMARY_LIGHT}]}>{doctorSelected ? doctor : "Select Doctor"}</Text>
        </Pressable>
        <Modal
          animationType="slide"
          visible={modalVisible}
          style={styles.modal}
        >
          <View style={{flex: 1}}/>
          <FlatList
            data={doctors}
            renderItem={renderItem}
            keyExtractor={(item: { public_identifier: any; }) => item.public_identifier}
          />
          <Pressable
            onPress={() => setModalVisible(false)}
            style={[styles.button, styles.buttonFilled]}>
            <Text style={styles.buttonTextFilled}>Close</Text>
          </Pressable>
        </Modal>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        placeholder={'Enter password'}
        placeholderTextColor={PRIMARY_LIGHT}
        secureTextEntry={true}
        value={password}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword2}
        placeholder={'Confirm password'}
        placeholderTextColor={PRIMARY_LIGHT}
        secureTextEntry={true}
        value={password2}
      />
      <Pressable
        onPress={() => {
            signupHandler(name, email, dateOfBirthSet? date.toISOString() : '', doctorIdentifier, password, password2);
          }
        }
      style={[styles.buttonFilled, styles.button]}
      >
        <Text style={styles.buttonTextFilled}>Sign up</Text>
      </Pressable>
      <Text>or</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('Login');
        }}
        style={[styles.buttonEmpty, styles.button]}
      >
        <Text style={styles.buttonTextEmpty}>Log in</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default SignupScreen;
