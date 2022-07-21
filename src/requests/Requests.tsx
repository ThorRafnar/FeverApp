import {BASE_URL} from "../constants/Theme";
import CookieManager from "@react-native-cookies/cookies";
import {LoginResponse, Child, User, SickDay, Symptom, Diagnosis, SickDayInput} from "../interfaces";
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
                  obj.other_diagnosis_description
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

export function AddSickDay(sickDay: SickDayInput):Promise<any> {
  let s = {
    'sick_date': sickDay.date.toISOString(),
    'temperature_celcius': sickDay.temperature,
    'doctors_diagnosis_bool': sickDay.doctors_diagnosis_bool,
    'other_diagnosis_bool': sickDay.other_diagnosis_bool,
    'other_diagnosis_description': sickDay.other_diagnosis_description,
    'symptoms': sickDay.symptoms,
    'diagnosis_public_identifier': sickDay.diagnosis_public_identifier
  }
  return SecureStore.getItemAsync('UserToken')
    .then((token) => {
      let obj = {
        link: BASE_URL + 'user/sickday',
        object: {
          method: 'POST',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }),
          body: JSON.stringify(s)
        }
      }

      return fetch(obj.link, obj.object)
        .then((response) => {
          return response;
        })
    })
}

export function EditSickDay(sickDay: SickDayInput):Promise<any> {
  let s = {
    'public_identifier': sickDay.public_identifier,
    'temperature_celcius': sickDay.temperature,
    'doctors_diagnosis_bool': sickDay.doctors_diagnosis_bool,
    'other_diagnosis_bool': sickDay.other_diagnosis_bool,
    'other_diagnosis_description': sickDay.other_diagnosis_description,
    'symptoms': sickDay.symptoms,
    'diagnosis_public_identifier': sickDay.diagnosis_public_identifier
  }
  return SecureStore.getItemAsync('UserToken')
    .then((token) => {
      let obj = {
        link: BASE_URL + 'user/sickday',
        object: {
          method: 'PUT',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }),
          body: JSON.stringify(s)
        }
      }
      return fetch(obj.link, obj.object)
        .then((response) => {
          return response.status;
        })
    })
}

export function DeleteSickDay(pid: string):Promise<number> {
  return SecureStore.getItemAsync('UserToken')
    .then((token) => {
      let obj = {
        link: BASE_URL + 'user/sickday/' + pid,
        object: {
          method: 'DELETE',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }),
        }
      }

      return fetch(obj.link, obj.object)
        .then((response) => {
          return response.status;
        })
    })

}

export function GetSymptoms():Promise<Symptom[]> {
  return SecureStore.getItemAsync('UserToken')
    .then((token) => {
      let obj = {
        link: BASE_URL + 'symptom',
        object: {
          method: 'GET',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          })
        }
      }
      return fetch(obj.link, obj.object)
        .then((response) => {
          return response.json()
            .then(json => {
              const j = JSON.parse(json);
              return j.map((item:any) => {
                return new Symptom(item.public_identifier, item.name, item.description, item.long_description, item.question);
              })
            })
            .catch(e => {
              console.log('FUCK YOU PIECE OF SHIT')
              return [];
            })
        })
        .catch(e => {
          console.log("err 1")
          return [];
        })
    })
}



export function GetDiagnosis():Promise<Diagnosis[]> {
  return SecureStore.getItemAsync('UserToken')
    .then((token) => {
      let obj = {
        link: BASE_URL + 'diagnosis',
        object: {
          method: 'GET',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          })
        }
      }
      return fetch(obj.link, obj.object)
        .then((response) => {
          return response.json()
            .then(json => {
              const j = JSON.parse(json);
              return j.map((x:any) => {
                return new Diagnosis(x.public_identifier, x.name, x.description, x.long_description ? x.long_description : null);
              });
            })
            .catch(e => {
              return [];
            })
        })
        .catch(e => {

          return [];
        })
    })
}
