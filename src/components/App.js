import React,{ useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import Homepage from './Homepage';
import SignUp from './SignUp';
import PrivateRoute from './PrivateRoute';
import { isLoggedInUser } from '../actions';

const App = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (!auth.authenticated) {
            dispatch(isLoggedInUser());
        }
    }, []);

    return (
        <div className="container-fluid">
            <Router>
                <PrivateRoute path='/' exact component={Homepage}/>
                <Route path='/login' exact component={Login}/>
                <Route path='/register' exact component={SignUp}/>
            </Router>
        </div>
    );
};

export default App;