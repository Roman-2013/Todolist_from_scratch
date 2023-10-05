import {FilterValueType, ToodolistType} from '../App';
import {v1} from 'uuid';


export const todolistsReducer = (state: ToodolistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.todoID)
        }
        case 'ADD-TODOLIST': {
            let newTodolist = {id: action.todolistId, title: action.newTitle, filter: 'all'}
            return [...state, newTodolist]
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
type ActionType =
    | RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>