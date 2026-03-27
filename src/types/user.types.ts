// user  types 

export type ApiResponse = {
  message: string;
  code: string;
};
export type UserErrorResponseKey = "userAreadyExist" | "invalidCredentials" | "emailAlreadyVerified"

export type UserSuccessResponseKey = "userRegisteredSuccessfully" | "userLoggedinSuccessfully"


export type UserRegister ={
  email:string, 
  userName:string , 
  password:string
}

export type UserLogin ={
  email:string,
  password:string,
  requestFor:string
}