import {todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {appSetErrorAC, appSetStatusAC, RequestStatusType} from '../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

const initialState: TodolistDomainType[] = []

export type FilterValueType = 'all' | 'active' | 'completed'

export type  TodolistDomainType = TodolistType & { filter: FilterValueType } & { entityStatus: RequestStatusType }


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.todoID)
        }
        case 'ADD-TODOLIST': {

            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.todoID ? {...el, title: action.newTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.todoID ? {...el, filter: action.filter} : el)
        }
        case 'SET-TODOLIST': {
            return action.todolist.map(el => ({
                ...el, filter: 'all', entityStatus: 'idle'
            }))
        }
        case 'APP/SET-ENTITY-STATUS':{
            return state.map(el=>el.id===action.id?{...el,entityStatus:action.entityStatus}:el)
        }
        default:
            return state
    }
}

//Action Creator

export const removeTodolistAC = (todoID: string) => {
    return {
        type: 'REMOVE-TODOLIST', todoID
    } as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST', todolist
    } as const
}
export const changeTodolistTitleAC = (todoID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE', todoID, newTitle
    } as const
}
export const changeTodolistFilterAC = (todoID: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER', todoID, filter
    } as const
}
export const SetTodolistTypeAC = (todolist: TodolistType[]) => {
    return {
        type: 'SET-TODOLIST', todolist
    } as const
}
export const appSetEntityStatusAC = (id:string,entityStatus: RequestStatusType) => {
    return {
        type: 'APP/SET-ENTITY-STATUS', entityStatus,id
    } as const
}


//Thunk Creator
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(appSetStatusAC('loading'))
    todolistAPI.getTodolists()
        .then(res => {

            dispatch(appSetStatusAC('succeeded'))
            dispatch(SetTodolistTypeAC(res.data))
        })
        .catch(rej=>{
            handleServerNetworkError(rej,dispatch)
        })
}

export const deleteTodolistTC = (todoID: string) => (dispatch: Dispatch) => {
    dispatch(appSetStatusAC('loading'))
    dispatch(appSetEntityStatusAC(todoID,'loading'))
    todolistAPI.deleteTodolist(todoID)
        .then(res => {
            if(res.data.resultCode===0){
                dispatch(removeTodolistAC(todoID))
                dispatch(appSetStatusAC('succeeded'))
                dispatch(appSetEntityStatusAC(todoID,'idle'))
            }else{
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch(rej=>{
            handleServerNetworkError(rej,dispatch)
        })
}
export const createTodolistTC = (newTitle: string) => (dispatch: Dispatch) => {
    dispatch(appSetStatusAC('loading'))
    todolistAPI.createTodolist(newTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(appSetStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch(rej=>{
            handleServerNetworkError(rej,dispatch)
        })
}

export const updateTodolistTitleTC = (todoID: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(appSetStatusAC('loading'))
    todolistAPI.updateTodolistTitle(todoID, newTitle)
        .then(res => {
            if(res.data.resultCode===0){
                dispatch(changeTodolistTitleAC(todoID, newTitle))
                dispatch(appSetStatusAC('succeeded'))
            }else{
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch(rej=>{
            handleServerNetworkError(rej,dispatch)
        })
}


//Type AC
export type ActionType =
    | RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolistType
    | AppSetEntityStatusType

export type SetTodolistType = ReturnType<typeof SetTodolistTypeAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
type AppSetEntityStatusType = ReturnType<typeof appSetEntityStatusAC>