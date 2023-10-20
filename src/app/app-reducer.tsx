export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
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


//Type
type ActionsType =
    | AppSetStatusType
    | AppSetErrorType

export type AppSetStatusType = ReturnType<typeof appSetStatusAC>
export type AppSetErrorType = ReturnType<typeof appSetErrorAC>


