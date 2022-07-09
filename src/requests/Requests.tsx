import {BASE_URL} from "../constants/Theme";
import CookieManager from "@react-native-cookies/cookies";
import {LoginResponse, Child, User, SickDay, Symptom, Diagnosis} from "../interfaces";
import * as SecureStore from "expo-secure-store";

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

export function GetUser():Promise<User|null> {
  return SecureStore.getItemAsync('UserToken')
    .then(token => {
      return fetch(BASE_URL + 'user', {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'bearer '+ token,
          'Content-Type': 'application/json'
        }),
      })
        .then((res) => {
          return res.json()
            .then((json) => {
              let child: Child|null = null;
              if (json.Child !== null) {
                child = new Child(
                  String(json.Child.public_identifier),
                  String(json.Child.Name),
                  new Date(json.Child.date_of_birth),
                  String(json.Child.Color));
              }
              return new User(
                String(json.public_identifier),
                String(json.name),
                String(json.email),
                new Date(json.date_of_birth),
                String(json.profile_image_url),
                child);
            })
            .catch(err => {
              return null;
            })
        })
        .catch(err => {
          return null;
        })
    })
}

export function GetSickDays(start:Date, end:Date):Promise<SickDay[]> {
  return SecureStore.getItemAsync('UserToken')
    .then(token => {
      return fetch(BASE_URL + 'user/sickday?from=' + start.toISOString() + '&to=' + end.toISOString(), {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'bearer '+ token,
          'Content-Type': 'application/json'
        }),
      })
        .then((res) => {
          return res.json()
            .then((json) => {
              return json.map((obj: any) => {

                let symptoms = obj.symptoms.map((s: any) => {
                  return new Symptom(
                    String(s.public_identifier),
                    String(s.name),
                    String(s.description),
                    s.long_description ? String(s.long_description) : null,
                    String(s.question)
                  );
                })
                let diagnosis = new Diagnosis(
                  String(obj.diagnosis.public_identifier),
                  String(obj.diagnosis.name),
                  String(obj.diagnosis.description),
                  String(obj.diagnosis.long_description)
                )
                return new SickDay(
                  obj.public_identifier,
                  new Date(obj.sick_date),
                  // BIG BRAIN VARIABLE NAMES... :/
                  (obj.tempature),
                  obj.doctors_diagnosis_bool,
                  obj.other_diagnosis_bool,
                  symptoms,
                  diagnosis,
                  obj.other_diagnosis_description ? obj.other_diagnosis_description : null
                );
              });
            })
            .catch(err => {
              return [];
            })
        })
        .catch(err => {
          return [];
        })
    })
}

export function GetSymptoms():Promise<Symptom[]> {

}

export function GetDiagnosis():Promise<Diagnosis[]> {

}
