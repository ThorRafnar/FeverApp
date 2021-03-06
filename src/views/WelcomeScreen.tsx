import React from 'react';
import {View, Text, Pressable, SafeAreaView} from 'react-native';
import styles from './styles';
import Svg, { Path } from "react-native-svg";
import {StatusBar} from "expo-status-bar";
import {PRIMARY, WIDTH, PRIMARY_LIGHT, PRIMARY_VERY_LIGHT, HEIGHT, BACKGROUND} from "../constants/Theme";


// @ts-ignore
function WelcomeScreen({ navigation }) {
  return (
    <View style={{flex: 1, backgroundColor: BACKGROUND}}>
      <View style={{backgroundColor: PRIMARY, height: 70, width: WIDTH}}/>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{flex: 0.5, width: WIDTH, backgroundColor: PRIMARY, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.circleBig}/>
          <View style={styles.circleSmall}/>
          {//<View style={styles.circleVeryBig}/>//
          }
        </View>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Svg height='320' width={WIDTH + 300} style={{transform: [{ rotate: '-13deg' }], position: 'absolute', zIndex: -1, left: -160, top: HEIGHT / 4}}
             >
          <Path fill={PRIMARY} fill-opacity="1" d="M0,0L11.4,42.7C22.9,85,46,171,69,186.7C91.4,203,114,149,137,154.7C160,160,183,224,206,224C228.6,224,251,160,274,154.7C297.1,149,320,203,343,208C365.7,213,389,171,411,165.3C434.3,160,457,192,480,186.7C502.9,181,526,139,549,133.3C571.4,128,594,160,617,144C640,128,663,64,686,64C708.6,64,731,128,754,138.7C777.1,149,800,107,823,80C845.7,53,869,43,891,42.7C914.3,43,937,53,960,58.7C982.9,64,1006,64,1029,53.3C1051.4,43,1074,21,1097,21.3C1120,21,1143,43,1166,74.7C1188.6,107,1211,149,1234,149.3C1257.1,149,1280,107,1303,90.7C1325.7,75,1349,85,1371,117.3C1394.3,149,1417,203,1429,229.3L1440,256L1440,0L1428.6,0C1417.1,0,1394,0,1371,0C1348.6,0,1326,0,1303,0C1280,0,1257,0,1234,0C1211.4,0,1189,0,1166,0C1142.9,0,1120,0,1097,0C1074.3,0,1051,0,1029,0C1005.7,0,983,0,960,0C937.1,0,914,0,891,0C868.6,0,846,0,823,0C800,0,777,0,754,0C731.4,0,709,0,686,0C662.9,0,640,0,617,0C594.3,0,571,0,549,0C525.7,0,503,0,480,0C457.1,0,434,0,411,0C388.6,0,366,0,343,0C320,0,297,0,274,0C251.4,0,229,0,206,0C182.9,0,160,0,137,0C114.3,0,91,0,69,0C45.7,0,23,0,11,0L0,0Z"></Path>
        </Svg>
        {//<Svg height='320' width={WIDTH +640} style={{position: 'absolute', zIndex: -2, top: HEIGHT / 3.1, left: -100}}>
          //<Path fill={PRIMARY_LIGHT} fill-opacity="1" d="M0,224L8.3,197.3C16.6,171,33,117,50,101.3C66.2,85,83,107,99,122.7C115.9,139,132,149,149,165.3C165.5,181,182,203,199,213.3C215.2,224,232,224,248,208C264.8,192,281,160,298,122.7C314.5,85,331,43,348,69.3C364.1,96,381,192,397,240C413.8,288,430,288,447,261.3C463.4,235,480,181,497,170.7C513.1,160,530,192,546,192C562.8,192,579,160,596,160C612.4,160,629,192,646,176C662.1,160,679,96,695,106.7C711.7,117,728,203,745,224C761.4,245,778,203,794,192C811,181,828,203,844,186.7C860.7,171,877,117,894,101.3C910.3,85,927,107,943,144C960,181,977,235,993,229.3C1009.7,224,1026,160,1043,117.3C1059.3,75,1076,53,1092,69.3C1109,85,1126,139,1142,138.7C1158.6,139,1175,85,1192,69.3C1208.3,53,1225,75,1241,112C1257.9,149,1274,203,1291,218.7C1307.6,235,1324,213,1341,181.3C1357.2,149,1374,107,1390,122.7C1406.9,139,1423,213,1432,250.7L1440,288L1440,0L1431.7,0C1423.4,0,1407,0,1390,0C1373.8,0,1357,0,1341,0C1324.1,0,1308,0,1291,0C1274.5,0,1258,0,1241,0C1224.8,0,1208,0,1192,0C1175.2,0,1159,0,1142,0C1125.5,0,1109,0,1092,0C1075.9,0,1059,0,1043,0C1026.2,0,1010,0,993,0C976.6,0,960,0,943,0C926.9,0,910,0,894,0C877.2,0,861,0,844,0C827.6,0,811,0,794,0C777.9,0,761,0,745,0C728.3,0,712,0,695,0C678.6,0,662,0,646,0C629,0,612,0,596,0C579.3,0,563,0,546,0C529.7,0,513,0,497,0C480,0,463,0,447,0C430.3,0,414,0,397,0C380.7,0,364,0,348,0C331,0,314,0,298,0C281.4,0,265,0,248,0C231.7,0,215,0,199,0C182.1,0,166,0,149,0C132.4,0,116,0,99,0C82.8,0,66,0,50,0C33.1,0,17,0,8,0L0,0Z"></Path>
          //</Svg>
        }
        <Svg height='320' width={WIDTH  + 640} style={{transform: [{ rotate: '2deg' }], position: 'absolute', zIndex: -3, top: HEIGHT / 3, left: -400}}>
          <Path fill={PRIMARY_VERY_LIGHT} fill-opacity="1" d="M0,224L8.3,197.3C16.6,171,33,117,50,101.3C66.2,85,83,107,99,122.7C115.9,139,132,149,149,165.3C165.5,181,182,203,199,213.3C215.2,224,232,224,248,208C264.8,192,281,160,298,122.7C314.5,85,331,43,348,69.3C364.1,96,381,192,397,240C413.8,288,430,288,447,261.3C463.4,235,480,181,497,170.7C513.1,160,530,192,546,192C562.8,192,579,160,596,160C612.4,160,629,192,646,176C662.1,160,679,96,695,106.7C711.7,117,728,203,745,224C761.4,245,778,203,794,192C811,181,828,203,844,186.7C860.7,171,877,117,894,101.3C910.3,85,927,107,943,144C960,181,977,235,993,229.3C1009.7,224,1026,160,1043,117.3C1059.3,75,1076,53,1092,69.3C1109,85,1126,139,1142,138.7C1158.6,139,1175,85,1192,69.3C1208.3,53,1225,75,1241,112C1257.9,149,1274,203,1291,218.7C1307.6,235,1324,213,1341,181.3C1357.2,149,1374,107,1390,122.7C1406.9,139,1423,213,1432,250.7L1440,288L1440,0L1431.7,0C1423.4,0,1407,0,1390,0C1373.8,0,1357,0,1341,0C1324.1,0,1308,0,1291,0C1274.5,0,1258,0,1241,0C1224.8,0,1208,0,1192,0C1175.2,0,1159,0,1142,0C1125.5,0,1109,0,1092,0C1075.9,0,1059,0,1043,0C1026.2,0,1010,0,993,0C976.6,0,960,0,943,0C926.9,0,910,0,894,0C877.2,0,861,0,844,0C827.6,0,811,0,794,0C777.9,0,761,0,745,0C728.3,0,712,0,695,0C678.6,0,662,0,646,0C629,0,612,0,596,0C579.3,0,563,0,546,0C529.7,0,513,0,497,0C480,0,463,0,447,0C430.3,0,414,0,397,0C380.7,0,364,0,348,0C331,0,314,0,298,0C281.4,0,265,0,248,0C231.7,0,215,0,199,0C182.1,0,166,0,149,0C132.4,0,116,0,99,0C82.8,0,66,0,50,0C33.1,0,17,0,8,0L0,0Z"></Path>
        </Svg>
        <View style={{flex: 0.5}}/>

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
      <StatusBar style="light" />
    </View>

  );
}

export default WelcomeScreen;
