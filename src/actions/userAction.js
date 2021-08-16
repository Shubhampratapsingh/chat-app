import { userConstants } from './type';
import firebase from "firebase/app";
import 'firebase/firestore';

export const getUsers = (uid) => {
    return async (dispatch) => {
        dispatch({
            type: userConstants.GET_USERS_REQUEST
        })

        const db = firebase.firestore();
        db.collection("users")
            .onSnapshot((querySnapshot) => {
                const users = [];
                querySnapshot.forEach(function (doc) {
                    if (doc.data().uid != uid) {
                        users.push(doc.data());
                    }

                });
                dispatch({
                    type: userConstants.GET_USERS_SUCCESS,
                    payload: { users }
                })
            });
    }
}

export const sendMessage = (message) => {
    return async dispatch => {
        const db = firebase.firestore();
        db.collection('conversations')
            .add({
                ...message,
                isView: false,
                createdAt: new Date()
            })
            
    }
}

export const getMessage = (user) => {
    return async dispatch => {
        const db = firebase.firestore();
        db.collection('conversations')
            .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
            .orderBy('createdAt', 'asc')
            .onSnapshot((querySnapshot) => {
                const conversations = [];
                querySnapshot.forEach((doc) => {
                    if (
                        (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
                        ||
                        (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
                    ) {
                        conversations.push(doc.data());
                    }

                    if(conversations.length > 0) {
                        dispatch({
                            type : userConstants.GET_MESSAGES,
                            payload : { conversations }
                        });
                    }
                    else{
                        dispatch({
                            type : userConstants.GET_MESSAGES_FAILURE,
                            payload : {conversations}
                        })
                    }
                })
                
            })

    }
}