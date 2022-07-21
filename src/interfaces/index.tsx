export class Child {
  public_identifier: string;
  name: string;
  date_of_birth: Date;
  color: string;

  constructor(public_identifier: string, name: string, date_of_birth: Date, color: string) {
    this.public_identifier = public_identifier;
    this.name = name;
    this.date_of_birth = date_of_birth;
    this.color = color;
  }
}

export class User {
  public_identifier: string;
  name: string;
  email: string;
  date_of_birth: Date;
  profile_image_url: string;
  child: Child|null;

  constructor(public_identifier: string, name: string, email: string, date_of_birth: Date, profile_image_url: string, child: Child|null) {
    this.public_identifier = public_identifier;
    this.name = name;
    this.email = email;
    this.date_of_birth = date_of_birth;
    this.profile_image_url = profile_image_url;
    this.child = child;
  }
}

export class SickDay {
  public_identifier: string;
  date: Date;
  temperature: number;
  doctors_diagnosis_bool: boolean;
  other_diagnosis_bool: boolean;
  symptoms: Symptom[];
  diagnosis: Diagnosis;
  other_diagnosis_description: string|null;

  constructor(pid: string, date: Date, temp: number, ddb: boolean, odb: boolean, symptoms: Symptom[], diagnosis: Diagnosis, other_desc: string|null) {
    this.public_identifier = pid;
    this.date = date;
    this.temperature = temp;
    this.doctors_diagnosis_bool = ddb;
    this.other_diagnosis_bool = ddb;
    this.symptoms = symptoms;
    this.diagnosis = diagnosis;
    this.other_diagnosis_description = other_desc;
  }
}

export class SickDayInput {
  public_identifier: string|null;
  date: Date;
  temperature: number;
  doctors_diagnosis_bool: boolean;
  other_diagnosis_bool: boolean;
  symptoms: string[];
  diagnosis_public_identifier: string;
  other_diagnosis_description: string|null;

  constructor(pid: string|null, date: Date, temp: number, ddb: boolean, odb: boolean, symptoms: string[], diagnosis: string, other_desc: string|null) {
    this.public_identifier = pid;
    this.date = date;
    this.temperature = temp;
    this.doctors_diagnosis_bool = ddb;
    this.other_diagnosis_bool = odb;
    this.symptoms = symptoms;
    this.diagnosis_public_identifier = diagnosis;
    this.other_diagnosis_description = other_desc;
  }
}


export class Symptom {
  public_identifier: string;
  name: string;
  description: string;
  long_description: string | null;
  question: string;

  constructor(pid: string, name: string, description: string, long_description: string|null, question: string) {
    this.public_identifier = pid;
    this.name = name;
    this.description = description;
    this.long_description = long_description;
    this.question = question;
  }
}


export class Diagnosis {
  public_identifier: string;
  name: string;
  description: string;
  long_description: string | null;

  constructor(pid: string, name: string, description: string, long_description: string|null) {
    this.public_identifier = pid;
    this.name = name;
    this.description = description;
    this.long_description = long_description;
  }
}

// Success tells if the login was successful
// Value will hold the jwt token, or an error message in case of failure
export interface LoginResponse {
  success: boolean,
  value: string
}
