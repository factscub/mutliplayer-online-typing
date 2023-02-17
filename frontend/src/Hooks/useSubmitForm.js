import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/User/UserProvider";
const useSubmitForm = () => {

    const navigate = useNavigate();

    const { dispatch, error } = useContext(UserContext)
    
    useEffect(() => {
        if (!!error) {
            dispatch({ type: 'INVALID_USER', payload: { error: null } });
        }
    }, []);

    return async ({ values, path }) => {
        
        dispatch({ type: 'INVALID_USER', payload: { error: null } });

        try {
            const response = await fetch(`https://multiplayer-online-typing-backend.onrender.com/${path}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            const data = await response.json();
            // console.log(data)
            dispatch({ type: 'USER_DETAILS', payload: { email: data?.email, username: data?.username } });

            // store in localstorage to keep the user logged in after refresh
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/home')

        } catch (error) {
            dispatch({ type: 'INVALID_USER', payload: { error: true } });
            console.log(error);
        }

    }
}

export default useSubmitForm;