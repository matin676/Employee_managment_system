export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}
