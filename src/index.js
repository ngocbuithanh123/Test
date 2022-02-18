import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const defaultState = {
    isLoading: false,
    isLogin: false,
    isRedeem: false,
    isAddEntry: false,
    message: '',
    userInfo: {},
    
}

const userInfo = sessionStorage.getItem('userInfo')
if(userInfo && JSON.parse(userInfo)){
    let pasreInfo = JSON.parse(userInfo)
    defaultState.isLogin = true
    defaultState.userInfo = pasreInfo
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            sessionStorage.setItem('userInfo', JSON.stringify(action.userInfo))
            return {
                ...state,
                isLogin: true,
                userInfo: action.userInfo
            }
        case 'LOGOUT':
            sessionStorage.removeItem('userInfo')
            return {
                ...state,
                isLogin: false,
                userInfo: {}
            }
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
            }
        case 'UN-LOADING':
            return {
                ...state,
                isLoading: false,
            }
        case 'REDEEM':
            return {
                ...state,
                isRedeem: true,
            }
        case 'UN-REDEEM':
            return {
                ...state,
                isRedeem: false,
            }
        case 'ADDENTRY':
            return {
                ...state,
                isAddEntry: true,
            }
        case 'UN-ADDENTRY':
            return {
                ...state,
                isAddEntry: false,
            }
        case 'SHOW-MESSAGE':
            let message = action.message
            return {
                ...state,
                message: message,
            }
        case 'HIDE-MESSAGE':
            return {
                ...state,
                message: '',
            }
        default:
            return state
    }
}
const store = createStore(reducer)
ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
