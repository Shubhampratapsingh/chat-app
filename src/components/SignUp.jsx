import React,{ useState } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { signUp } from '../actions';

const SignUp = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [summary, setSummary] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);

    const registerUser = (e) => {
        e.preventDefault();
        const user = {
            firstName, lastName, summary, email, password
        }
        dispatch(signUp(user));
    };

    if (auth.authenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='registerContainer'>
            <form onSubmit={registerUser}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Enter first name"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Enter last name"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="summary">Profile Summary:</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Enter summary"
                        id="summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)} />
                </div>
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
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            <p> Click here to <Link to='/login'>Log In</Link></p>
        </div>
    );
};

export default SignUp;
