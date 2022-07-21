import React, {useContext, useState} from 'react';
import {View, Text, SafeAreaView, TextInput, Pressable} from 'react-native';
import styles from "./styles";
import {PRIMARY_DARK, PRIMARY_LIGHT} from "../constants/Theme";
import CookieManager from "@react-native-cookies/cookies";
import {AuthContext} from '../components/Context';



// @ts-ignore
function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // @ts-ignore
  const {signIn} = useContext(AuthContext);

  const loginHandler = (email:string, password:string):void => {
    signIn(email, password);
  }
  // @ts-ignore
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{flex: 1}}/>
      <Text style={[styles.welcomeText, {color: PRIMARY_DARK}]}>Welcome back!</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder={'Enter email address'}
        keyboardType={'email-address'}
        autoCapitalize={'none'}
        autoCorrect={false}
        placeholderTextColor={PRIMARY_LIGHT}
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder={'Enter password'}
        placeholderTextColor={PRIMARY_LIGHT}
        autoCorrect={false}
        secureTextEntry={true}
        value={password}
      />
      <Pressable
        onPress={() => {
          loginHandler(email, password);
        }}
        style={[styles.buttonFilled, styles.button]}
      >
        <Text style={styles.buttonTextFilled}>Log in</Text>
      </Pressable>
      <Text>or</Text>
      <Pressable
        onPress={() => navigation.navigate('Signup')}
        style={[styles.buttonEmpty, styles.button]}
      >
        <Text style={styles.buttonTextEmpty}>Sign up</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default LoginScreen;
