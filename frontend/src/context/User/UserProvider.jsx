import React, { createContext, useEffect, useReducer } from 'react';
import UserReducer from './UserReducer';

const initialState = {
    username: null,
    email: null,
    error: null

}
export const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    // extract user data if any from localstorage so that the user can be kept logged in even after refresh
    useEffect(() => {
        if (localStorage.getItem('user')) {
            const { email, username } = JSON.parse(localStorage.getItem('user'));
            dispatch({ type: 'USER_DETAILS', payload: { email, username } });
        }
    }, []);
    // console.log(state)
    return (
        <UserContext.Provider value={{ ...state, dispatch }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;