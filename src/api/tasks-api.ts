import axios from 'axios';
import {RequestStatusType} from '../app/app-reducer';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
})


export const taskAPI = {
    getTasks(todoID:string) {
        return instance.get<getTaskType<TasksType[]>>(`${todoID}/tasks`)
    },
    createTasks(todoID:string,newTaskTitle:string){
        return instance.post<ResponseType<{ item:TasksType }>>(`${todoID}/tasks`,{title:newTaskTitle})
    },
    deleteTasks(todoID:string,taskID:string){
        return instance.delete<ResponseType>(`${todoID}/tasks/${taskID}`)
    },
    updateTasks(todoID:string,taskID:string,module:ModuleType){
        return instance.put<ResponseType<{item:TasksType}>>(`${todoID}/tasks/${taskID}`,{...module})
    },
}


export type ModuleType={
    title: string
    description:string|null
    completed: boolean
    status:TaskStatuses
    priority: TaskPriority
    startDate: string|null
    deadline: string|null
}

export enum TaskStatuses{
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriority{
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TasksType={
    id:string
    title:string
    description:string|null
    todoListId:string
    order:number
    status:TaskStatuses
    priority:TaskPriority
    startDate:string|null
    deadline:string|null
    addedDate:string
    completed:boolean
    entityStatus:RequestStatusType
}

type getTaskType<T={}> ={
    items:T,
    totalCount:number
    error:string
}

export type ResponseType<T={}> = {
	data: T;
	messages: Array<string>;
	fieldsErrors:Array<string>;
	resultCode: number;
}
