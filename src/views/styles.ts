import { StyleSheet, Dimensions} from "react-native";
import {
  BACKGROUND,
  MARGINS,
  PRIMARY,
  PRIMARY_LIGHT,
  PRIMARY_DARK,
  SECONDARY,
  TEXT,
  WIDTH, HEIGHT
} from "../constants/Theme";


export default StyleSheet.create({
  input: {
    height: 32,
    margin: MARGINS,
    width: WIDTH - MARGINS * 4,
    borderBottomWidth: 1,
    borderColor: PRIMARY,
    padding: 10,
  },
  colorSample: {
    height: 16,
    width: 16,
    borderRadius: 5,
  },
  modal: {
    height: 200,
    width: WIDTH - MARGINS * 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  questionText: {
    fontSize: 26,
    fontWeight: '300',
    color: TEXT
  },
  calendarContainer: {
    width: WIDTH - MARGINS * 4,
    height: WIDTH - MARGINS * 4,
    backgroundColor: PRIMARY_LIGHT,
    justifyContent: 'center',
    borderRadius: 8
  },
  calendar: {

  },
  halfButton: {
    margin: MARGINS,
    height: 44,
    width: (WIDTH / 2) - MARGINS * 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleButton: {
    margin: MARGINS,
    height: 64,
    width: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: MARGINS,
    height: 44,
    width: WIDTH - MARGINS * 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonFilled: {
    backgroundColor: PRIMARY
  },
  buttonEmpty: {
    marginBottom: MARGINS,
    backgroundColor: BACKGROUND,
    borderColor: PRIMARY,
    borderWidth: 2,
  },
  buttonTextFilled: {
    fontSize: 28,
    fontWeight: '700',
    color: BACKGROUND
  },
  buttonTextEmpty: {
    fontSize: 28,
    fontWeight: '700',
    color: PRIMARY
  },
  welcomeText: {
    fontSize: 44,
    fontWeight: '300',
    color: PRIMARY_DARK
  },
  DOBText: {
    fontSize: 14,
    fontWeight: '400',
    color: PRIMARY_LIGHT,
    marginBottom: -12,
  }
});
