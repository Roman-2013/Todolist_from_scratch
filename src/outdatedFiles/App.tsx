export default {}
// import React, {useCallback, useState} from 'react';
// import './App.css';
// import {v1} from 'uuid';
// import {AddItemForm} from './AddItemForm';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import {FilterValueType, TodolistDomainType} from './state/todolists-reducer';
// import {TasksStateType} from './state/tasks-reducer';
// import {TaskStatuses, TasksType} from './api/tasks-api';
//
//
// function App() {
//
//     let todolistID1 = v1()
//     let todolistID2 = v1()
//
//     let [todolists, SetTodolistTypes] = useState<Array<TodolistDomainType>>(
//         [
//             {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
//             {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
//         ])
//
//     let [tasks, setTasks] = useState<TasksStateType>({
//         [todolistID1]: [
//             {
//                 id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, description: '', todoListId: todolistID1,
//                 deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''
//             },
//             {
//                 id: v1(), title: 'JS', status: TaskStatuses.Completed, description: '', todoListId: todolistID1,
//                 deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''
//             },
//             {
//                 id: v1(), title: 'ReactJS', status: TaskStatuses.New, description: '', todoListId: todolistID1,
//                 deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''
//             }
//         ],
//         [todolistID2]: [
//             {
//                 id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, description: '', todoListId: todolistID1,
//                 deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''
//             },
//             {
//                 id: v1(), title: 'JS', status: TaskStatuses.Completed, description: '', todoListId: todolistID1,
//                 deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''
//             },
//             {
//                 id: v1(), title: 'ReactJS', status: TaskStatuses.New, description: '', todoListId: todolistID1,
//                 deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''
//             }
//         ],
//     })
// //Todolist
//     const addTodolist = useCallback((title: string) => {
//         const todolistID = v1()
//         const newTodolist: TodolistDomainType = {id: todolistID, title, filter: 'all', addedDate: '', order: 0}
//         SetTodolistTypes([...todolists, newTodolist])
//         setTasks({...tasks, [todolistID]: []})
//     }, [])
//
//     const removeTodolist = (todoId: string) => {
//         SetTodolistTypes(todolists.filter(el => el.id !== todoId))
//         delete tasks[todoId]
//         setTasks({...tasks})
//     }
//     const changeTodolistTitle = (todoId: string, newTitle: string) => {
//         SetTodolistTypes(todolists.map(el => el.id === todoId ? {...el, title: newTitle} : el))
//     }
//     const changeFilter = (filter: FilterValueType, todoId: string) => {
//         SetTodolistTypes(todolists.map(el => el.id === todoId ? {...el, filter} : el))
//     }
//
// //Task
//     const removeTask = (id: string, todoId: string) => {
//         setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.id !== id)})
//     }
//     const addTask = (title: string, todoId: string) => {
//         let newTask =  {
//             id: v1(), title, status: TaskStatuses.Completed, description: '', todoListId: todolistID1,
//             deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''
//         }
//         setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
//     }
//     const changeTaskStatus = (idTask: string, isDone: boolean, todoId: string) => {
//         setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === idTask ? {...el, isDone} : el)})
//     }
//     const changeTaskTitle = (idTask: string, title: string, todoId: string) => {
//         setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === idTask ? {...el, title} : el)})
//         console.log(tasks)
//     }
//
//
//     return (
//         <div className="App">
//             <AppBar color={'secondary'} position="static">
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{mr: 2}}
//                     >
//                         <MenuIcon/>
//                     </IconButton>
//                     <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
//                         Todolist
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//
//             <Container fixed>
//                 <Grid container style={{padding: '20px'}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {
//                         todolists.map(tl => {
//
//                             let taskForTodolist: TasksType[]
//
//                             if (tl.filter === 'active') {
//                                 taskForTodolist = tasks[tl.id].filter(el => el.status !== TaskStatuses.Completed )
//                             } else if (tl.filter === 'completed') {
//                                 taskForTodolist = tasks[tl.id].filter(el => el.status !== TaskStatuses.New)
//                             } else {
//                                 taskForTodolist = tasks[tl.id]
//                             }
//
//                             return <Grid key={tl.id} item>
//                                 <Paper style={{padding: '10px'}}>
//                                     {/*<Todolist*/}
//                                     {/*    key={tl.id}*/}
//                                     {/*    todoId={tl.id}*/}
//                                     {/*    title={tl.title}*/}
//                                     {/*    tasks={taskForTodolist}*/}
//                                     {/*    removeTask={removeTask}*/}
//                                     {/*    changeFilter={changeFilter}*/}
//                                     {/*    addTask={addTask}*/}
//                                     {/*    changeTaskStatus={changeTaskStatus}*/}
//                                     {/*    filter={tl.filter}*/}
//                                     {/*    removeTodolist={removeTodolist}*/}
//                                     {/*    changeTaskTitle={changeTaskTitle}*/}
//                                     {/*    changeTodolistTitle={changeTodolistTitle}*/}
//                                     {/*/>*/}
//                                 </Paper>
//                             </Grid>
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default App;
