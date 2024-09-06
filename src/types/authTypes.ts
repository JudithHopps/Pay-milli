export interface SignupFormData {
  userId: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
  gender: string;
  phone: string;
  paymentPassword: string;
}

export interface LoginFormData {
  userId: string;
  password: string;
}

export interface UserInfoData {
  userId: string;
  name: string;
  email: string;
  birthday: string;
  gender: string;
  phone: string;
}
