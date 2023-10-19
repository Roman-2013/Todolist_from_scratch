import React, {useEffect, useState} from 'react'
import {taskAPI, TaskPriority, TaskStatuses} from '../api/tasks-api';

export default {
  title: 'API/tasks'
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const todoID='7d44f48e-ec47-41b8-b1f0-598d623fe157'
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
    const todoID='7d44f48e-ec47-41b8-b1f0-598d623fe157'
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
    const todoID='7d44f48e-ec47-41b8-b1f0-598d623fe157'
    const taskID='36381e10-1d10-41fc-80bf-6ceb3b18fc8a'
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
    const todoID='7d44f48e-ec47-41b8-b1f0-598d623fe157'
    const taskID='068360a0-ecfa-476f-b5c4-29516ecac9f9'
    const newTaskTitle='11111111111'
  useEffect(() => {
taskAPI.updateTasks(todoID,taskID, {
    title: newTaskTitle,
    description:null,
    completed: false,
    status:0,
    priority: 0,
    startDate: null,
    deadline: null
})
    .then(res=>{
       // console.log(res.data.data.item.title)
        setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

