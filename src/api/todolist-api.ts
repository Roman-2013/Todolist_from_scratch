import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})


export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists/')
    },
    createTodolist(newTitle: string) {
        return instance.post<ResponseType<{ item:TodolistType}>>('todo-lists/', {title: newTitle})
    },
    deleteTodolist(todoID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoID}`)
    },
    updateTodolistTitle(todoID: string, newTitle: string) {
        return instance.put<ResponseType>(`todo-lists/${todoID}`, {title: newTitle})
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T={}> ={
    resultCode: number
    fieldsErrors:Array<string>
    messages: Array<string>,
    data:T
}


