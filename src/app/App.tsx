import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './store';
import LinearProgress from '@mui/material/LinearProgress';
import {initializeAppTC, RequestStatusType} from './app-reducer';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from 'features/Login/Login';
import {Todolists} from 'Todolists';
import {ErrorSnackbar} from 'Components/ErrorSnackbar';
import {CircularProgress} from '@mui/material';
import {logoutTC} from 'features/Login/auth-reducer';


export function App() {


    const status = useSelector<AppRootStateType, RequestStatusType>((el) => el.app.status)
    const error = useSelector<AppRootStateType, string | null>(el => el.app.error)
    const isInitialized = useSelector<AppRootStateType, boolean>(el => el.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(el => el.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    const buttonHandler=()=>{
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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

                    {isLoggedIn && <Button onClick={buttonHandler}  color="inherit">Logout</Button>}

                </Toolbar>

                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>

            <Container fixed>
                <Routes>

                    <Route path={'/'} element={<Todolists/>}/>
                    <Route path={'/login'} element={<Login/>}/>


                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'/404'}/>}/>

                </Routes>


            </Container>
        </div>
    );
}


