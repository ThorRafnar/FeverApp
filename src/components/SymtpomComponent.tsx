import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {BACKGROUND, MARGINS, PRIMARY, WIDTH} from "../constants/Theme";
import {Ionicons} from "@expo/vector-icons";


// @ts-ignore
const SymptomComponent = (props) => {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  return (
    <Pressable
      style={{backgroundColor: PRIMARY, margin: MARGINS, borderRadius: MARGINS, flex: 1, padding: MARGINS, width: WIDTH - MARGINS * 2}}
      onPress={() => {
        setDetailsVisible(!detailsVisible);
      }}
    >
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: BACKGROUND, fontSize: 26, fontWeight: '300', flex: 1}}>{props.name}</Text>
        <Ionicons name={detailsVisible ? 'close-circle-outline' : 'information-circle-outline'} color={BACKGROUND} size={32}/>
      </View>
      {
        detailsVisible
        ?
          <Text style={{color: BACKGROUND, fontSize: 16, fontStyle: 'italic'}}>{props.description}</Text>
          :
          <View/>
      }

    </Pressable>
  );
}

export default SymptomComponent;
