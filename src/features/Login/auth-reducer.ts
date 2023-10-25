import {Dispatch} from 'redux'
import {AppSetErrorType, appSetStatusAC, AppSetStatusType,} from 'app/app-reducer'
import {authAPI, LoginParamsType} from 'api/auth-api';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC('loading'))
    authAPI.login(data)
        .then(res=>{
            if(res.data.resultCode===0){
                dispatch(setIsLoggedInAC(true))
                dispatch(appSetStatusAC('succeeded'))
            }else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch(rej=>{
            handleServerNetworkError(rej,dispatch)
        })
}

export const logoutTC=()=>(dispatch:Dispatch)=>{
    dispatch(appSetStatusAC('loading'))
    authAPI.logout()
        .then(res=>{
         if(res.data.resultCode===0){
             dispatch(setIsLoggedInAC(false))
             dispatch(appSetStatusAC('succeeded'))
         }   else{
             handleServerAppError(res.data,dispatch)
         }
        })
        .catch(rej=>{
            handleServerNetworkError(rej,dispatch)
        })
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppSetStatusType | AppSetErrorType
