// user  types 

export type UserResponseValue = {
  message: string;
  code: string;
};
export type UserErrorResponseKey = "userAreadyExist" | "invalidCredentials"

export type UserSuccessResponseKey = "userRegisteredSuccessfully" | "userLoggedinSuccessfully"

export type UserRegister ={
  email:string, 
  userName:string , 
  password:string
}

export type UserLogin ={
  email:string,
  password:string
}