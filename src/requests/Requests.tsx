import {BASE_URL} from "../constants/Theme";
import CookieManager from "@react-native-cookies/cookies";
import {LoginResponse} from "../interfaces";

export function LogInRequest(email:string, password:string):Promise<LoginResponse> {
  // FETCH
  return fetch(BASE_URL + 'auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      'email': email,
      'password': password
    })
  })
    //THENNNNN
    .then((res) => {
      // STATUS GOOD
      if (res.status == 200) {
        return CookieManager.getAll()
          .then((cookies) => {
            return {success: true, value: cookies.jwt.value};
          })
          .catch(err => {
            return {success: false, value: "BAD 1"};
          })
        // STATUS BAD
      } else {
        return {success: false, value: "Invalid email or password"};
      }
    })
    .catch(err => {
      return {success: false, value: "BAD 4"};
    })
}

export function SignUpRequest(name:string, email:string, date:string, doctorIdentifier:string, password:string, password2:string):Promise<LoginResponse> {
  return fetch(BASE_URL + 'user/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': name,
      'email': email,
      'password': password,
      'password2': password2,
      'dob': date,
      'profile_image_url': 'www.me.org',
      'doctor_public_identifier': doctorIdentifier
    })
  })
    .then((res) => {
      if (res.status === 200) {
        return LogInRequest(email, password);
      } else {
        return res.json()
          .then(msg => {
            console.log(msg);
            return {success: false, value: msg};
          })
          .catch(err => {
            console.log(err)
            return {success: false, value: err};
          })
      }
    })
    .catch(err => {
      return {success: false, value: err};
    })
}

export function GetUser():Promise<User> {

}

export function GetChild():Promise<Child> {

}

export function GetSickDays(start:Date, end:Date):Promise<SickDay[]> {

}

export function GetSymptoms():Promise<Symptom[]> {

}

export function GetDiagnosis():Promise<Diagnosis[]> {

}
