import {v1} from 'uuid';
import {TodolistType} from '../api/todolist-api';

const initialState:TodolistDomainType[]=[]

export type FilterValueType = 'all' | 'active' | 'completed'

export type  TodolistDomainType=TodolistType & { filter: FilterValueType }



export const todolistsReducer = (state:TodolistDomainType[]=initialState, action: ActionType):TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.todoID)
        }
        case 'ADD-TODOLIST': {
            let newTodolist = {
                id: action.todolistId,
                title: action.newTitle,
                filter: 'all' as FilterValueType ,
                addedDate:'',
                order: 0
            }
            return [newTodolist,...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.todoID ? {...el, title: action.newTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.todoID ? {...el, filter: action.filter} : el)
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
export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST', newTitle,todolistId:v1()
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

//Type AC
export type ActionType =
    | RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>