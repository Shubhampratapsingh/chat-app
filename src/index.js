import React from 'react';
import ReactDom from 'react-dom';
import firebase from "firebase/app";
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import store from './store';

const firebaseConfig = {
    apiKey: "AIzaSyDN4J6Mokf-rpFw3VsibRGleRQ37FRm2Es",
    authDomain: "chat-app-43c65.firebaseapp.com",
    projectId: "chat-app-43c65",
    storageBucket: "chat-app-43c65.appspot.com",
    messagingSenderId: "14679441201",
    appId: "1:14679441201:web:bccc9ab80f7f59dcb7ba10"
};

firebase.initializeApp(firebaseConfig);


ReactDom.render(<Provider store={store}>
    <App />
</Provider>,
    document.querySelector('#root'));