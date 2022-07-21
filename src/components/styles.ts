import { StyleSheet, Dimensions} from "react-native";
import {
  BACKGROUND,
  MARGINS,
  PRIMARY,
  PRIMARY_LIGHT,
  PRIMARY_DARK,
  SECONDARY,
  TEXT,
  WIDTH, HEIGHT, PRIMARY_VERY_LIGHT, CALENDAR_TOP_POSITION, TAG_WIDTH
} from "../constants/Theme";


export default StyleSheet.create({

  tagCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    right: -10,
    borderWidth: 1,
    borderColor: PRIMARY_DARK,
    backgroundColor: BACKGROUND
  }
});
