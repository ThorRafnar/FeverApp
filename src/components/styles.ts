import { StyleSheet, Dimensions} from "react-native";
import {
  BACKGROUND,
  MARGINS,
  PRIMARY,
  PRIMARY_LIGHT,
  PRIMARY_DARK,
  SECONDARY,
  TEXT,
  WIDTH, HEIGHT, PRIMARY_VERY_LIGHT, CALENDAR_TOP_POSITION
} from "../constants/Theme";


export default StyleSheet.create({
  tag: {
    borderWidth: 1,
    backgroundColor: PRIMARY_VERY_LIGHT,
    borderColor: PRIMARY_DARK,
    padding: 6,
    paddingRight: 20,
    margin: MARGINS / 2,
    borderBottomRightRadius: MARGINS * 2,
    borderTopRightRadius: MARGINS * 2,
    borderBottomLeftRadius: MARGINS,
    borderTopLeftRadius: MARGINS,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  tagText: {
    color: PRIMARY_DARK,
    fontSize: 16,
    fontWeight: '300'
  },
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
