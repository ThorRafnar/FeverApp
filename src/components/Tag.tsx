import React from 'react';
import {View, Text} from 'react-native';
import styles from "./styles";

// @ts-ignore
export function Tag(props) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{props.name}</Text>
      <View style={styles.tagCircle}/>
    </View>
  )
}
