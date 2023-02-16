import { useState } from 'react';
import { Button } from '@mantine/core';
import styled from 'styled-components';
import { Register ,Login} from '../../components';

export default function Forms() {
    const [formType, setFormType] = useState('register');

    const swtichForm = () => {
        if (formType === 'register') {
            setFormType('login');
        }
        else {
            setFormType('register');
        }
    }
    return (

        <FormsWrapper >
            {
                (formType === 'register') ? <Register /> : <Login />
            }
            <Button onClick={swtichForm} type="submit" mt="sm">
                Goto {formType === 'register' ? 'Login' : 'Register'}
            </Button>
        </FormsWrapper>

    )
}

const FormsWrapper = styled.div`
padding: 20px;
display: flex;
width: 400px;
margin: auto;
align-content: center;
margin-top: 30px;
flex-direction: column;
border: 3px dotted grey;
border-radius: 5px;

`
