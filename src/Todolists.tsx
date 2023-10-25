import React, {useCallback, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useSelector} from 'react-redux';
import {
    changeTodolistFilterAC,
    createTodolistTC,
    deleteTodolistTC,
    fetchTodolistsTC, FilterValueType,
    TodolistDomainType,
    updateTodolistTitleTC
} from 'state/todolists-reducer';
import {AppRootStateType, useAppDispatch} from 'app/store';
import {createTasksTC, deleteTasksTC, TasksStateType, updateTasksTC} from 'state/tasks-reducer';
import {TaskStatuses} from 'api/tasks-api';
import {AddItemForm} from 'AddItemForm';
import {Todolist} from 'Todolist';
import {Navigate} from 'react-router-dom';


export const Todolists = () => {
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>((el) => el.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>((el) => el.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(el => el.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn){
            return
        }
            dispatch(fetchTodolistsTC())
    }, []);

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


    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }


    return (
        <>
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
        </>
    );
};

