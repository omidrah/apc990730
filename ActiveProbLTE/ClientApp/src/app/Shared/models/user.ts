export class User {  
  username: string;
  password: string;  
  rememberMe: boolean;
}
export interface AuthUser {
  userId: string;
  userName: string;
  displayName: string;
  roles: string[] | null;
  access: string[] | null;
}
