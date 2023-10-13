import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';
import {taskAPI} from '../api/tasks-api';

export default {
  title: 'API/tasks'
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const todoID='1620d759-6e2e-4be3-848e-06c28f2cc65a'
  useEffect(() => {
    taskAPI.getTasks(todoID)
        .then(res=>{
          setState(res.data)
        })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
  const [state, setState] = useState<any>(null)
    const todoID='1620d759-6e2e-4be3-848e-06c28f2cc65a'
    const newTaskTitle='My New Task'
  useEffect(() => {
taskAPI.createTasks(todoID,newTaskTitle)
    .then(res=>{
        setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null)
    const todoID='1620d759-6e2e-4be3-848e-06c28f2cc65a'
    const taskID='13766f8b-2f74-48f7-b90a-d61fc7d4061f'
  useEffect(() => {
taskAPI.deleteTasks(todoID,taskID)
    .then(res=>{
        setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTasksTitle = () => {
  const [state, setState] = useState<any>(null)
    const todoID='1620d759-6e2e-4be3-848e-06c28f2cc65a'
    const taskID='d19bd55f-1272-40d9-83b9-5d77f415a7f6'
    const newTaskTitle='11111111111'
  useEffect(() => {
taskAPI.updateTasksTitle(todoID,taskID,newTaskTitle)
    .then(res=>{
        console.log(res.data.data.item.title)
        setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

