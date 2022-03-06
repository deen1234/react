interface GenObj {
  [key: string]: any;
}
export type onSuccessFunc = (resp: GenObj) => void;

export interface isRefreshProps {
  onSuccess?: onSuccessFunc;
}
export interface isProfileEditProps {
  name: string;
  phone: string;
  onSuccess?: onSuccessFunc;
}
export interface isLoginProps {
  onSuccess?: onSuccessFunc;
  body: loginreq;
}
export interface loginreq {
  email: string;
  password: string;
  device_type: string;
}

export interface profileProps {
  Authorization: string;
}

export interface forgetPasswordProps {
  email: string;
  onSuccess?: onSuccessFunc;
}
export interface isRegisterProps {
  email: string;
  phone: string;
  name: string;
  device_type: string;
  onSuccess?: onSuccessFunc;
}

export interface AuthState {
  data: any;
  loginErrorMessage: string;
  profileErrorMessage: string;
  isLoading: boolean;
  isFailure: boolean;
  user: any;
  profileData: any;
  isLogged: boolean;
  myReservationData: any;
  // refreshData: RefreshData | null;
}

// export interface RefreshData {
//   data: RefreshUser;
// }
// export interface RefreshUser {
//   user: RefreshDataDetail;
// }
// export interface RefreshDataDetail {
//   access_token: string;
//   first_name: string;
// }
export interface Login {
  data: LoginData | null;
  loginErrorMessage: string;
  isLoading: boolean;
  isFailure: boolean;
  user: any; // LoginData | null;
}
interface LoginData {
  email: string;
  password: string;
  device_type: string;
}

export interface Register {
  data: RegisterData[];
  registerErrorMessage: string;
  isLoading: boolean;
  isFailure: boolean;
}
interface RegisterData {
  email: string;
  password: string;
  name: string;
  device_type: string;
}

export interface ForgetPassword {
  data: ForgetPasswordData[];
  forgetPasswordErrorMessage: string;
  isLoading: boolean;
  isFailure: boolean;
}
interface ForgetPasswordData {
  email: string;
}

export interface UserData {
  data: User;
  message: string;
  success: boolean;
}
export interface User {
  access_token: string;
  expires_in: number;
}
