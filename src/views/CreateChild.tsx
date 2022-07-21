import React, {useState} from 'react';
import {FlatList, Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import styles from "./styles";
import {PRIMARY_LIGHT, TEXT} from "../constants/Theme";
import DatePicker from 'react-native-date-picker';
import CookieManager from "@react-native-cookies/cookies";

async function createChild(name, dob, color) {
  let child = {
    'name': name,
    'date_of_birth': dob,
    'color': color
  }
  const cookies = await CookieManager.getAll();
    let obj = {
      link: 'http://127.0.0.1:5196/child',
      object: {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cookies.jwt.value
        }),
        body: JSON.stringify(child)
      }
    }
    console.log(obj);
  return await fetch(obj.link, obj.object);
}

function CreateChildScreen({navigation}) {
  const [name, onChangeName] = useState('');
  const [date, setDate] = useState(new Date("2000-01-01"));
  const [open, setOpen] = useState(false);
  const maxDate = new Date("2022-06-26");
  const [dateOfBirthSet, setDateOfBirthSet] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [color, setColor] = useState('');
  const [colorHex, setColorHex] = useState('');

  const colors = [
    {name: 'Red', hex: '#D32F2F'},
    {name: 'Pink', hex: '#E91E63'},
    {name: 'Purple', hex: '#673AB7'},
    {name: 'Indigo', hex: '#3F51B5'},
    {name: 'Blue', hex: '#2196F3'},
    {name: 'Teal', hex: '#009688'},
    {name: 'Green', hex: '#4CAF50'},
    {name: 'Orange', hex: '#FF9800'}
  ]
  // @ts-ignore
  const renderItem = ({ item }) => (
    <View>
      <Pressable
        onPress={() => {
          setModalVisible(false);
          setColor(item.name);
          setColorHex(item.hex);
        }}
        style={[styles.button, {backgroundColor: item.hex}]}>
        <Text style={styles.buttonTextFilled}>{item.name}</Text>
      </Pressable>
    </View>
  );

  // @ts-ignore
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flex: 1}}/>
      <Text style={styles.welcomeText}>Add child</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        placeholder={'Enter full name'}
        placeholderTextColor={PRIMARY_LIGHT}
        autoCapitalize={'words'}
        value={name}
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
          style={[styles.input, {flexDirection: 'row'}]}>
          <View style={[styles.colorSample, {backgroundColor: color != '' ? colorHex : 'transparent', marginRight: color != '' ? 4 : -16}]}/>
          <Text style={[styles.DOBText, {color: color != '' ? colorHex : PRIMARY_LIGHT}]}>{color != '' ? color : "Select color"}</Text>
        </Pressable>
        <Modal
          animationType="slide"
          visible={modalVisible}
          style={styles.modal}
        >
          <View style={{flex: 1}}/>
          <FlatList
            data={colors}
            renderItem={renderItem}
            keyExtractor={(item: { name: string }) => item.name}
          />
          <Pressable
            onPress={() => setModalVisible(false)}
            style={[styles.button, styles.buttonFilled]}>
            <Text style={styles.buttonTextFilled}>Close</Text>
          </Pressable>
          <View style={{height: 20}}/>
        </Modal>
      </View>

      <Pressable
        onPress={() => {
            const res = createChild(name, date, color)
              .then(res => {
                if (res.status == 200) {
                  navigation.replace('Home');
                } else {
                  alert('You have been logged out');
                  navigation.navigate('WelcomeScreen');
                }
              })

          }
        }
        style={[styles.buttonFilled, styles.button]}
      >
        <Text style={styles.buttonTextFilled}>Add Child</Text>
      </Pressable>
      <View style={{flex: 1}}/>
    </SafeAreaView>
  );
}

export default CreateChildScreen;
