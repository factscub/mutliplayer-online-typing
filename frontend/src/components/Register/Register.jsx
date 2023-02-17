
import { Button, TextInput, PasswordInput } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import React, { useContext } from 'react';
import { UserContext } from '../../context/User/UserProvider';
import { useSubmitForm } from '../../Hooks';

const Register = () => {

    const register = useForm({
        initialValues: { username: '', email: '', password: '', repeat_password: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            username: isNotEmpty(),
            email: isEmail(),
            password: isNotEmpty(),
            repeat_password: (value, values) => {
                return value !== values.password ? isNotEmpty() : null
            }
        },
    });

    const submitForm = useSubmitForm();
    const { error } = useContext(UserContext);

    return (
        <form onSubmit={register.onSubmit(values => submitForm({ values, path: 'register' }))}>
            <TextInput style={{ color: 'red' }} label="Username" placeholder="Username" {...register.getInputProps('username')} />
            <TextInput mt="sm" label="Email" placeholder="Email" {...register.getInputProps('email')} />
            <PasswordInput
                mt="sm"
                label="Password"
                placeholder="Password"
                {...register.getInputProps('password')}
            />
            <PasswordInput
                mt="sm"
                label="Confirm Password"
                placeholder="Confirm Password"
                {...register.getInputProps('repeat_password')}
                style={{ color: 'white' }}
            />

            <Button type="submit" mt="sm">Register</Button>
            {
                error && <p className='error' >Enter different CustomerId/Email</p>
            }
        </form>
    )
}

export default Register;