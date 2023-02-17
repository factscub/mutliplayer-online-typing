
import { Button, TextInput, PasswordInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React, { useContext } from 'react';
import { UserContext } from '../../context/User/UserProvider';
import { useSubmitForm } from '../../Hooks';

const Login = () => {

    const { error } = useContext(UserContext);
    const login = useForm({
        initialValues: { username: '', password: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            username: isNotEmpty(),
            password: isNotEmpty()
        }
    });

    const submitForm = useSubmitForm();
    
    return (
        <form onSubmit={login.onSubmit(values => submitForm({ values, path: 'login' }))}>
            <TextInput label="Username" placeholder="Username" {...login.getInputProps('username')} />
            <PasswordInput
                mt="sm"
                label="Password"
                placeholder="Password"
                {...login.getInputProps('password')}
            />

            <Button type="submit" mt="sm">Login</Button>
            {
                error && <p className='error' >Invalid CustomerId/Password</p>
            }
        </form>
    )
}

export default Login;