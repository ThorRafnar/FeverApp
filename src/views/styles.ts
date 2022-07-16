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
  subText: {
    fontSize: 16,
    fontWeight: '500',
    color: TEXT
  },
  calendarContainer: {
    position: 'absolute',
    top: CALENDAR_TOP_POSITION,
    paddingVertical: MARGINS,
    width: WIDTH - MARGINS * 4,
    backgroundColor: PRIMARY_LIGHT,
    justifyContent: 'center',
    borderRadius: MARGINS
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
    color: BACKGROUND,
    top: -30,
    zIndex: 100
  },
  DOBText: {
    fontSize: 14,
    fontWeight: '400',
    color: PRIMARY_LIGHT,
    marginBottom: -12,
  },
  circleBig: {
    position: "absolute",
    top: -MARGINS * 13,
    right: -MARGINS * 9,
    backgroundColor: PRIMARY_LIGHT,
    zIndex: 100,
    opacity: 0.5,
    height: MARGINS * 28,
    width: MARGINS * 28,
    borderRadius: MARGINS * 14
  },
  circleVeryBig: {
    position: "absolute",
    top: -HEIGHT * 0.25,
    left: -HEIGHT * 0.75,
    backgroundColor: PRIMARY_DARK,
    zIndex: 100,
    opacity: 0.4,
    height: HEIGHT,
    width: HEIGHT,
    borderRadius: HEIGHT / 2
  },
  circleSmall: {
    position: "absolute",
    top: MARGINS * 1,
    right: MARGINS * 4,
    backgroundColor: PRIMARY_VERY_LIGHT,
    opacity: 0.25,
    zIndex: 100,
    height: MARGINS * 16,
    width: MARGINS * 16,
    borderRadius: MARGINS * 8
  }
});
