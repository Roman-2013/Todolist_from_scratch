import {
    appSetErrorAC,
    AppSetErrorType, appSetStatusAC,
    AppSetStatusType,
} from '../app/app-reducer'
import { Dispatch } from 'redux'
import {ResponseType} from '../api/tasks-api';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(appSetErrorAC(data.messages[0]))
    } else {
        dispatch(appSetErrorAC('Some error occurred'))
    }
    dispatch(appSetStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(appSetErrorAC(error.message))
    dispatch(appSetStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<AppSetStatusType | AppSetErrorType>
