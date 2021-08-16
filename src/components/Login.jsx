import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../actions';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);


    const userLogIn = (e) => {
        e.preventDefault();

        if (email === '') {
            alert('Email Required');
            return;
        }
        if (password === '') {
            alert('Password Required');
            return;
        }

        const user = {
            email, password
        }
        dispatch(signIn(user));
    };

    if (auth.authenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='loginContainer'>
            <form onSubmit={userLogIn}>
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email"
                        className="form-control"
                        placeholder="Enter email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password"
                        className="form-control"
                        placeholder="Enter password"
                        id="pwd"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p> Click here to <Link to='/register'>Sign Up</Link></p>
        </div>
    );
};

export default Login;
