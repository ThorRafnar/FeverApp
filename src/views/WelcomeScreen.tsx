import React from 'react';
import {View, Text, Pressable, SafeAreaView} from 'react-native';
import styles from './styles';


// @ts-ignore
function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{flex: 2}}/>
      <Text style={styles.welcomeText}>Welcome</Text>
      <View style={{flex: 1}}/>
      <Pressable
        onPress={() => navigation.navigate('Login')}
        style={[styles.buttonFilled, styles.button]}
      >
        <Text style={styles.buttonTextFilled}>Log in</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Signup')}
        style={[styles.buttonEmpty, styles.button]}
      >
        <Text style={styles.buttonTextEmpty}>Sign up</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default WelcomeScreen;
