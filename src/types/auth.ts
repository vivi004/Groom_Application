export interface User {
  id: string;
  email: string;
  fullName?: string;
  token?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface SignupData extends LoginCredentials {
  fullName: string;
}
