import {AddTodolistType, RemoveTodolistType, SetTodolistType} from './todolists-reducer';
import {taskAPI, TaskStatuses, TasksType} from '../api/tasks-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';


export type TasksStateType = {
    [key: string]: TasksType[]
}

const initialState = {} as TasksStateType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {

        case 'SET-TASK': {
            return {...state, [action.todoID]: action.task}
        }

        case 'SET-TODOLIST': {
            const stateCopy = {...state}
            action.todolist.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }


        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const {[action.todoID]: {}, ...resProps} = state
            return resProps
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todoID]: state[action.todoID].filter(el => el.id !== action.taskID)}
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE-TASK': {
            return {
                ...state, [action.todoID]: state[action.todoID]
                    .map(el => el.id === action.taskID ? {...el, ...action.model} : el)
            }
        }
        default:
            return state
    }
}

//Action Creator
export const setTaskAC = (task: TasksType[], todoID: string) => {
    return {
        type: 'SET-TASK', task, todoID
    } as const
}
export const removeTaskAC = (taskID: string, todoID: string) => {
    return {
        type: 'REMOVE-TASK', taskID, todoID
    } as const
}
export const addTaskAC = (task: TasksType) => {
    return {
        type: 'ADD-TASK', task
    } as const
}
export const updateTaskAC = (taskID: string, model: modelType, todoID: string) => {
    return {
        type: 'UPDATE-TASK', taskID, todoID, model
    } as const
}
//Thunk Creator
type modelType = {
    title?: string
    status?: TaskStatuses
}
export const fetchTaskTC = (todoID: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todoID)
        .then(res => {
            dispatch(setTaskAC(res.data.items, todoID))
        })
}
export const deleteTasksTC = (id: string, todoId: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTasks(todoId, id)
        .then(res => {
            dispatch(removeTaskAC(id, todoId))
        })
}
export const createTasksTC = (title: string, todoId: string) => (dispatch: Dispatch) => {
    taskAPI.createTasks(todoId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTasksTC = (todoID: string, taskID: string, model: modelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoID].find(el => el.id === taskID)
        if (task) {
            taskAPI.updateTasks(todoID, taskID, {
                title: task.title,
                description: task.description,
                completed: task.completed,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...model
            })
                .then(res => {
                    dispatch(updateTaskAC(taskID, model, todoID))
                })
        }
    }
}


//Type AC
type ActionType =
    | RemoveTaskType
    | AddTaskType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistType
    | SetTaskType
    | UpdateTaskType


type RemoveTaskType = ReturnType<typeof removeTaskAC>
type UpdateTaskType = ReturnType<typeof updateTaskAC>
type SetTaskType = ReturnType<typeof setTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
