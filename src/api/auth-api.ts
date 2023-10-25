import axios from 'axios';
import {ResponseType} from 'api/tasks-api';
import {logoutTC} from 'features/Login/auth-reducer';

const instance=axios.create({
baseURL:'https://social-network.samuraijs.com/api/1.1/auth/',
    withCredentials:true
})



export const authAPI = {
    login(arg:LoginParamsType) {
        return instance.post<ResponseType<{ userId:number }>>('login',{email:arg.email, password:arg.password})
    },
    me(){
        return instance.get<ResponseType<LoginParamsType>>('me')
    },
    logout(){
        return instance.delete<ResponseType>('login')
    }
}

export type LoginParamsType={
        email: string
        password: string
        rememberMe?: boolean

}
