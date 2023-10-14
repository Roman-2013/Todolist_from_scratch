import React, {Reducer, useCallback, useReducer, useState} from 'react';
import './App.css';
import { Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC, TodolistDomainType,
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatuses} from './api/tasks-api';





function AppWithRedux() {

    const todolists=useSelector<AppRootStateType,TodolistDomainType[]>((el)=>el.todolists)
    const tasks=useSelector<AppRootStateType,TasksStateType>((el)=>el.tasks)
    const dispatch=useDispatch()

//Todolist
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    },[])
    const removeTodolist = useCallback((todoId: string) => {
        dispatch(removeTodolistAC(todoId))

    },[])
    const changeTodolistTitle = useCallback((todoId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todoId, newTitle))
    },[])
    const changeFilter =useCallback ((filter: FilterValueType, todoId: string) => {
        dispatch(changeTodolistFilterAC(todoId, filter))},[])


//Tasks
    const removeTask =useCallback( (id: string, todoId: string) => {
        dispatch(removeTaskAC(id, todoId))
    },[])
    const addTask = useCallback((title: string, todoId: string) => {
        dispatch(addTaskAC(title, todoId))
    },[])
    const changeTaskStatus =useCallback( (idTask: string, status: TaskStatuses, todoId: string) => {
        dispatch(changeTaskStatusAC(idTask, status, todoId))
    },[])
    const changeTaskTitle =useCallback( (idTask: string, title: string, todoId: string) => {
        dispatch(changeTaskTitleAC(idTask, title, todoId))
    },[])


    return (
        <div className="App">
            <AppBar color={'secondary'} position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            //
                            // let taskForTodolist: TasksType[]
                            //
                            // if (tl.filter === 'active') {
                            //     taskForTodolist = tasks[tl.id].filter(el => el.isDone !== true)
                            // } else if (tl.filter === 'completed') {
                            //     taskForTodolist = tasks[tl.id].filter(el => el.isDone !== false)
                            // } else {
                            //     taskForTodolist = tasks[tl.id]
                            // }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todoId={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
