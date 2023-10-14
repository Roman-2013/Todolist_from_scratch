import {v1} from 'uuid';
import {AddTodolistType, RemoveTodolistType} from './todolists-reducer';
import {TaskStatuses, TasksType} from '../api/tasks-api';


export type TasksStateType = {
    [key: string]: TasksType[]
}

const initialState={} as TasksStateType

export const tasksReducer = (state: TasksStateType=initialState, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST':{
          const{[action.todoID]:{},...resProps}=state
            return resProps
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todoID]: state[action.todoID].filter(el => el.id !== action.taskID)}
        }
        case 'ADD-TASK': {
            let newTask = {
                id: v1(),
                title: action.newTitle,
                status: TaskStatuses.New,
                description:'',
                todoListId: action.todoID,
                deadline:'',
                addedDate:'',
                order:0,
                priority:0,
                startDate:'',
            }
            return {...state, [action.todoID]: [newTask,...state[action.todoID]]}
        }
        case 'CHANGE-TASK-STATUS': {

            return {
                ...state,
                [action.todoID]: state[action.todoID]
                    .map(el => el.id === action.taskID ? {...el, status: action.newIsDone} : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todoID]: state[action.todoID]
                    .map(el => el.id === action.taskID ? {...el, title: action.newTitle} : el)
            }
        }
        default:
            return state
    }
}

//Action Creator
export const removeTaskAC = (taskID: string, todoID: string) => {
    return {
        type: 'REMOVE-TASK', taskID, todoID
    } as const
}
export const addTaskAC = (newTitle: string, todoID: string) => {
    return {
        type: 'ADD-TASK', newTitle, todoID
    } as const
}
export const changeTaskStatusAC = (taskID: string, newIsDone: TaskStatuses, todoID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS', taskID, newIsDone, todoID
    } as const
}
export const changeTaskTitleAC = (taskID: string, newTitle: string, todoID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE', taskID, newTitle, todoID
    } as const
}

//Type AC
type ActionType =
    | RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistType
    | RemoveTodolistType


type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>