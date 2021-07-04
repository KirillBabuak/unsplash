import React, {useEffect} from 'react';
import './App.scss';
import {Route, Switch} from 'react-router-dom'
import Home from "./pages/Home";
import routes from "./constants/route.constants";
import {withSuspense} from './hoc/withSuspense';
import NotAuthorized from "./pages/Errors/403";
import PageNotFound from './pages/Errors/404';
import Auth from './pages/Auth';
import Photos from "./pages/Photos";
import {initialize} from "./reducers/main.reducer";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch();
    const SuspendedPageNotFound = withSuspense(PageNotFound)
    const SuspendedNotAuthorized = withSuspense(NotAuthorized)
    const SuspendedPhotos = withSuspense(Photos)
    const SuspendedAuth = withSuspense(Auth)
    const {basePath, auth: authRoute, photos: photosRoute, notAuthorized} = routes;

    useEffect(() => {
        dispatch(initialize())
    })

    return (
        <Switch>
            <Route exact path={`${basePath}`}
                   render={() => <Home/>}>
            </Route>
            <Route exact path={`${authRoute}`}
                   render={() => <SuspendedAuth/>}>
            </Route>
            <Route exact path={`${photosRoute}`}
                   render={() => <SuspendedPhotos/>}>
            </Route>
            <Route exact path={`${notAuthorized}`}
                   render={() => <SuspendedNotAuthorized/>}/>
            <Route path='*'
                   render={() => <SuspendedPageNotFound/>}/>
        </Switch>
    );
}

export default App;
