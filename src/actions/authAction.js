// import { auth, firestore } from 'firebase';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import { authConstants } from './type';

export const signUp = (user) => {
    return async (dispatch) => {
        const db = firebase.firestore();

        dispatch({
            type: authConstants.USER_LOGIN_REQUEST
        })

        firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                const currentUser = firebase.auth().currentUser;
                const name = `${user.firstName} ${user.lastName}`;
                currentUser.updateProfile({
                    displayName: name
                })
                    .then(() => {
                        db.collection('users')
                            .doc(data.user.uid)
                            .set({
                                firstName: user.firstName,
                                lastName: user.lastName,
                                summary: user.summary,
                                uid: data.user.uid,
                                createdAt: new Date(),
                                isOnline: true
                            })
                            .then(() => {
                                const loggedInUser = {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    summary: user.summary,
                                    uid: data.user.uid,
                                    email: user.email
                                }
                                localStorage.setItem('user', JSON.stringify(loggedInUser));
                                dispatch({
                                    type: authConstants.USER_LOGIN_SUCCESS,
                                    payload: { user: loggedInUser }
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: authConstants.USER_LOGIN_FAILURE,
                    payload: { error: error }
                })
            })
    }
}

export const signIn = (user) => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.USER_LOGIN_REQUEST
        });

        firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {

                const db = firebase.firestore();
                db.collection('users')
                    .doc(data.user.uid)
                    .update({
                        isOnline: true
                    })
                    .then(() => {
                        const name = data.user.displayName.split(" ");
                        const firstName = name[0];
                        const lastName = name[1];

                        const loggedInUser = {
                            firstName,
                            lastName,
                            summary: data.user.summary,
                            uid: data.user.uid,
                            email: data.user.email
                        }
                        localStorage.setItem('user', JSON.stringify(loggedInUser));

                        dispatch({
                            type: authConstants.USER_LOGIN_SUCCESS,
                            payload: { user: loggedInUser }
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: authConstants.USER_LOGIN_FAILURE,
                    payload: { error: error }
                })
            })
    }
}

export const isLoggedInUser = () => {
    return async (dispatch) => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if (user) {
            dispatch({
                type: authConstants.USER_LOGIN_SUCCESS,
                payload: { user }
            });
        }
        else {
            dispatch({
                type: authConstants.USER_LOGIN_FAILURE,
                payload: { error: 'Login again please' }
            });
        }
    }
}

export const logout = (uid) => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.USER_LOGOUT_REQUEST
        });

        const db = firebase.firestore();
        db.collection('users')
            .doc(uid)
            .update({
                isOnline: false
            })
            .then(() => {
                firebase.auth()
                    .signOut()
                    .then(() => {
                        localStorage.clear();
                        dispatch({
                            type: authConstants.USER_LOGOUT_SUCCESS
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                        dispatch({
                            type: authConstants.USER_LOGOUT_FAILURE,
                            payload: { error }
                        })
                    })
            })
            .catch((error) => {
                console.log(error);
            })

    }
}