import React, {useCallback, useState} from 'react';
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

export type FilterValueType = 'all' | 'active' | 'completed'
export type ToodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: TasksType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<ToodolistType>>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ])

    let [tasks, setTasks] = useState<TasksStateType>({
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false}
            ],
            [todolistID2]: [
                {id: v1(), title: 'Rest API', isDone: true},
                {id: v1(), title: 'GraphQL', isDone: false},
                {id: v1(), title: 'ajax', isDone: false},
            ],
        }
    )

    const addTodolist = (title: string) => {
        const todolistID = v1()
        const newTodolist: ToodolistType = {id: todolistID, title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistID]: []})
    }
    const removeTodolist = (todoId: string) => {
        setTodolists(todolists.filter(el => el.id !== todoId))
        delete tasks[todoId]
        setTasks({...tasks})
    }
    const changeTodolistTitle = (todoId: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todoId ? {...el, title: newTitle} : el))
    }
    const changeFilter = (filter: FilterValueType, todoId: string) => {
        setTodolists(todolists.map(el => el.id === todoId ? {...el, filter} : el))
    }


    const removeTask = (id: string, todoId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.id !== id)})
    }
    const addTask = (title: string, todoId: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
    }
    const changeTaskStatus = (idTask: string, isDone: boolean, todoId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === idTask ? {...el, isDone} : el)})
    }
    const changeTaskTitle = (idTask: string, title: string, todoId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === idTask ? {...el, title} : el)})
        console.log(tasks)
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
                <Grid container style={{padding:'20px'}}>
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
                                <Paper style={{padding:'10px'}}>
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

export default App;
