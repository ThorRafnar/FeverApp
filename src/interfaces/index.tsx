export interface Child {
  public_identifier: string,
  Name: string,
  date_of_birth: Date,
  Color: string
}

export interface User {
  public_identifier: string,
  name: string,
  email: string,
  date_of_birth: Date,
  profile_image_url: string,
  Child: Child
}


export interface Symptom {
  public_identifier: string,
  name: string,
  description: string,
  long_description: string | null,
  question: string
}


export interface Diagnosis {
  public_identifier: string,
  name: string,
  description: string,
  long_description: string | null
}

// Success tells if the login was successful
// Value will hold the jwt token, or an error message in case of failure
export interface LoginResponse {
  success: boolean,
  value: string
}
