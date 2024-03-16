import { ReactNode } from "react";



export default interface IUser {
    id: number;
    username: string;
    email: string;
    is_superuser: boolean;
}
type Props = {
    children?: ReactNode;
};

interface ILogin {
    username: string;
    password: string;
}

type AuthContextType = {
    signed?: boolean,
    isAuthenticated?: () => boolean,
    authState?: IAuthState | undefined,
    signIn: ({ email, password }: ILogin) => Promise<void>;
    signOut: () => void;
};

interface IToken {
    access_token: string, 
    refresh_token:string
}

interface IResponse {
    access: string, 
    refresh:string,
    user: IUser
} 

interface IRefreshResponse {
    access: string, 
} 

type IAuthState={
    access: String | null,
    refresh: String | null
    error: String | null,
    user: IUser | null
  }