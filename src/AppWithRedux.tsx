import React, {Reducer, useCallback, useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';
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
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValueType = 'all' | 'active' | 'completed'
export type ToodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: TasksType[]
}



function AppWithRedux() {

    const todolists=useSelector<AppRootStateType,ToodolistType[]>((el)=>el.todolists)
    const tasks=useSelector<AppRootStateType,TasksStateType>((el)=>el.tasks)
    const dispatch=useDispatch()



    // let [todolists, dispatchTodolists] = useReducer(todolistsReducer,
    //     [
    //         {id: todolistID1, title: 'What to learn', filter: 'all'},
    //         {id: todolistID2, title: 'What to buy', filter: 'all'}
    //     ]);
    //
    // let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    //         [todolistID1]: [
    //             {id: v1(), title: 'HTML&CSS', isDone: true},
    //             {id: v1(), title: 'JS', isDone: true},
    //             {id: v1(), title: 'ReactJS', isDone: false}
    //         ],
    //         [todolistID2]: [
    //             {id: v1(), title: 'Rest API', isDone: true},
    //             {id: v1(), title: 'GraphQL', isDone: false},
    //             {id: v1(), title: 'ajax', isDone: false},
    //         ],
    //     }
    // )

//Todolist
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const removeTodolist = (todoId: string) => {
        dispatch(removeTodolistAC(todoId))

    }
    const changeTodolistTitle = (todoId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todoId, newTitle))
    }
    const changeFilter = (filter: FilterValueType, todoId: string) => {
        dispatch(changeTodolistFilterAC(todoId, filter))
    }

//Tasks
    const removeTask = (id: string, todoId: string) => {
        dispatch(removeTaskAC(id, todoId))
    }
    const addTask = (title: string, todoId: string) => {
        dispatch(addTaskAC(title, todoId))
    }
    const changeTaskStatus = (idTask: string, isDone: boolean, todoId: string) => {
        dispatch(changeTaskStatusAC(idTask, isDone, todoId))
    }
    const changeTaskTitle = (idTask: string, title: string, todoId: string) => {
        dispatch(changeTaskTitleAC(idTask, title, todoId))
    }


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

                            let taskForTodolist: TasksType[]

                            if (tl.filter === 'active') {
                                taskForTodolist = tasks[tl.id].filter(el => el.isDone !== true)
                            } else if (tl.filter === 'completed') {
                                taskForTodolist = tasks[tl.id].filter(el => el.isDone !== false)
                            } else {
                                taskForTodolist = tasks[tl.id]
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todoId={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodolist}
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
