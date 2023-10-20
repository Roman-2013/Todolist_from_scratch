import React, {Reducer, useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from '../Todolist';
import {AddItemForm} from '../AddItemForm';
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
    changeTodolistTitleAC, createTodolistTC, deleteTodolistTC, fetchTodolistsTC, FilterValueType,
    removeTodolistAC, SetTodolistTypeAC, TodolistDomainType, updateTodolistTitleTC,
} from '../state/todolists-reducer';
import {
    addTaskAC,
    createTasksTC,
    deleteTasksTC,
    removeTaskAC,
    TasksStateType, updateTasksTC
} from '../state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {useAppDispatch, AppRootStateType} from './store';
import {TaskStatuses} from '../api/tasks-api';
import {todolistAPI} from '../api/todolist-api';
import {ThunkDispatch} from 'redux-thunk';
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../Components/ErrorSnackbar';

function AppWithRedux() {

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, []);

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>((el) => el.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>((el) => el.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>((el) => el.app.status)
    const error=useSelector<AppRootStateType, string|null>(el=>el.app.error)

    const dispatch = useAppDispatch()

//Todolist
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [])
    const removeTodolist = useCallback((todoId: string) => {
        dispatch(deleteTodolistTC(todoId))

    }, [])
    const changeTodolistTitle = useCallback((todoId: string, newTitle: string) => {
        dispatch(updateTodolistTitleTC(todoId, newTitle))
    }, [])
    const changeFilter = useCallback((filter: FilterValueType, todoId: string) => {
        dispatch(changeTodolistFilterAC(todoId, filter))
    }, [])


//Tasks
    const removeTask = useCallback((id: string, todoId: string) => {
        dispatch(deleteTasksTC(id, todoId))
    }, [])
    const addTask = useCallback((title: string, todoId: string) => {
        dispatch(createTasksTC(title, todoId))
    }, [])
    const changeTaskStatus = useCallback((idTask: string, status: TaskStatuses, todoId: string) => {
        dispatch(updateTasksTC(todoId, idTask, {status}))
    }, [])
    const changeTaskTitle = useCallback((idTask: string, title: string, todoId: string) => {
        dispatch(updateTasksTC(todoId, idTask, {title}))
    }, [])


    return (
        <div className="App">
            {error && <ErrorSnackbar/>}
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
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        entityStatus={tl.entityStatus}
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
