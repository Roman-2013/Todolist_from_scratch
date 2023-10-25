import {Dispatch} from 'redux'
import {authAPI} from 'api/auth-api';
import {setIsLoggedInAC} from 'features/Login/auth-reducer';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        case 'SET-IS-INITIALIZED':{
            return {...state,isInitialized: action.isInitialized}
        }

        default:
            return state
    }
}

//AC
export const appSetStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS', status
    } as const
}
export const appSetErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR', error
    } as const
}
export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'SET-IS-INITIALIZED', isInitialized
    } as const
}


//TC
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        dispatch(setIsInitializedAC(true))
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));

        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(err=>{
        handleServerNetworkError(err, dispatch)
    })
}


//Type
type ActionsType =
    | AppSetStatusType
    | AppSetErrorType
    | SetIsInitializedType

export type AppSetStatusType = ReturnType<typeof appSetStatusAC>
export type AppSetErrorType = ReturnType<typeof appSetErrorAC>
export type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>


