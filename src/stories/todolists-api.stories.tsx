import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';

export default {
  title: 'API/todolist'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodolists()
        .then(res=>{
          setState(res.data)
        })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const newTitle='romkkromkkromkkromkkromkkromkkromkk'
  useEffect(() => {
    todolistAPI.createTodolist(newTitle)
        .then(res=>{
          console.log(res.data.data.item.title)
          setState(res.data)
        })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const todoID='8b88ca9d-a026-4e8f-af14-1c280da0afb7'
  useEffect(() => {
    todolistAPI.deleteTodolist(todoID)
        .then(res=>{
          setState(res.data)
        })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const todoID='1620d759-6e2e-4be3-848e-06c28f2cc65a'
  const newTitle='wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  useEffect(() => {
    todolistAPI.updateTodolistTitle(todoID,newTitle)
        .then(res=>{
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

