import { StatusBar } from 'expo-status-bar';
import {useEffect, useState, useMemo, useReducer} from "react";
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "./src/views/WelcomeScreen";
import LoginScreen from "./src/views/LoginScreen";
import SignupScreen from './src/views/Signup';
import CreateChildScreen from './src/views/CreateChild';
import HomeScreen from './src/views/Home';
import CookieManager from "@react-native-cookies/cookies";
import {BASE_URL, PRIMARY, TOAST_OFFSET} from "./src/constants/Theme";
import {AuthContext} from './src/components/Context';
import * as SecureStore from 'expo-secure-store';
import {LogInRequest, SignUpRequest} from "./src/requests/Requests";
import Toast from 'react-native-toast-message'

const Stack = createNativeStackNavigator();


function App() {
  const initialLoginState = {
    isLoading: true,
    userToken: ''
  };

  const loginReducer = (prevState: any, action: any) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: '',
          isLoading: false
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
    }
  };
  const asList = (arr:string[]):string => {
    let ret:string = arr.join(', ');
    let lastComma:number = ret.lastIndexOf(',');
    if (arr.length > 1) {
      let firstPart = ret.slice(0, lastComma);
      let lastPart = ret.slice(lastComma + 1);
      return firstPart + ' and' + lastPart;
    }
    return ret
  }

  const validateEmail = (email:string):any => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (email:string, password:string):Promise<void> => {
      LogInRequest(email, password)
        .then(response => {
          if (response.success) {
            SecureStore.setItemAsync('UserToken', response.value);
            dispatch({type: 'LOGIN', token: response.value});
          } else {
            Toast.show({
              type: 'error',
              text1: 'Failed to log in',
              text2: response.value
            });
          }
        })
          .catch(err => {
            Toast.show({
              type: 'error',
              text1: 'Failed to log in',
              text2: err
            });
          })
    },
    signOut: async ():Promise<void>  => {
      await SecureStore.deleteItemAsync('UserToken');
      dispatch({type: 'LOGOUT'});
    },
    signUp: async (name:string, email:string, date:string, doctorIdentifier:string, password:string, password2:string):Promise<void>   => {
      SignUpRequest(name, email, date, doctorIdentifier, password, password2)
        .then(response => {
          if (response.success) {
            SecureStore.setItemAsync('UserToken', response.value);
            dispatch({type: 'REGISTER', token: response.value});
          } else {
            let errorMessage;
            console.log(date);
            let missing = [];
            if (name == '') {
              missing.push('name');
            }
            if (email == '') {
              missing.push('email');
            }
            if (date == '') {
              missing.push('date of birth');
            }
            if (doctorIdentifier == '') {
              missing.push('doctor');
            }
            if (password == '') {
              missing.push('password');
            }
            if (password2 == '') {
              missing.push('password confirmation');
            }
            if (missing.length > 0) {
              errorMessage = 'Missing: ';
              errorMessage = errorMessage.concat(asList(missing));
            } else if (!validateEmail(email)) {
              errorMessage = 'Invalid email address';
            } else if (password != password2) {
              errorMessage = 'Passwords do not match';
            } else {
              errorMessage = 'User with email ' + email + ' already exists';
            }
            console.log(errorMessage);
            Toast.show({
              type: 'error',
              text1: 'Failed to sign up',
              text2: errorMessage
            });
          }
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Failed to sign up',
            text2: err
          });
        })
    },
  }), []);

  useEffect(() => {
    try {
      SecureStore.getItemAsync('UserToken')
        .then(token => {
          // If token is null we need empty string
          dispatch({type: 'RETRIEVE_TOKEN', token: token === null ? '' : token})
        })
        .catch(err => {
          dispatch({type: 'RETRIEVE_TOKEN', token: ''})
        })
    } catch(err) {
      console.log(err);
      dispatch({type: 'RETRIEVE_TOKEN', token: ''})
    }

  }, []);

  if (loginState.isLoading) {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size='large' color={PRIMARY}/>
      </SafeAreaView>
    )
  }

  // @ts-ignore
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          { loginState.userToken !== ''
            ?
            (
              <>
                <Stack.Screen name='Home' component={HomeScreen}/>
                <Stack.Screen name="CreateChild" component={CreateChildScreen}/>
              </>
            )
            :
            (
              <>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        position='top'
        topOffset={TOAST_OFFSET}
      />
    </AuthContext.Provider>
  );
}

export default App;
