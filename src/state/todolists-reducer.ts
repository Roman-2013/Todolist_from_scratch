import {todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';

const initialState: TodolistDomainType[] = []

export type FilterValueType = 'all' | 'active' | 'completed'

export type  TodolistDomainType = TodolistType & { filter: FilterValueType }


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.todoID)
        }
        case 'ADD-TODOLIST': {

            return [{...action.todolist,filter:'all'},...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.todoID ? {...el, title: action.newTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.todoID ? {...el, filter: action.filter} : el)
        }
        case 'SET-TODOLIST':{
            return action.todolist.map(el=>({
                ...el,filter:'all'
            }))
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



//Thunk Creator
export const fetchTodolistsTC=()=>(dispatch:Dispatch)=>{
    todolistAPI.getTodolists()
        .then(res=>{
            dispatch(SetTodolistTypeAC(res.data))
        })
}

export const deleteTodolistTC=(todoID: string)=>(dispatch:Dispatch)=>{
    todolistAPI.deleteTodolist(todoID)
        .then(res=>{
            dispatch(removeTodolistAC(todoID))
        })
}
export const createTodolistTC=(newTitle: string)=>(dispatch:Dispatch)=>{
    todolistAPI.createTodolist(newTitle)
        .then(res=>{
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const updateTodolistTitleTC=(todoID: string, newTitle: string)=>(dispatch:Dispatch)=>{
    todolistAPI.updateTodolistTitle(todoID,newTitle)
        .then(res=>{
            dispatch(changeTodolistTitleAC(todoID,newTitle))
        })
}


//Type AC
export type ActionType =
    | RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolistType

export type SetTodolistType = ReturnType<typeof SetTodolistTypeAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>