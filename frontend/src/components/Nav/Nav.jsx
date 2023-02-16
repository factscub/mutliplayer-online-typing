import { Container } from '@mantine/core';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../Context/User/UserProvider';

const Nav = () => {
    const navigate = useNavigate();

    const { email, username, dispatch } = useContext(UserContext);

    return (
        <Header height={60} >
            {
                email && username ? <> <span> USERNAME: {username}   EMAIL: {email}
                </span>
                    <Link href={'/'} onClick={(e) => {
                        e.preventDefault();

                        localStorage.removeItem('user');
                        dispatch({ type: 'EMPTY' });
                        navigate('/');

                    }} >Logout</Link>
                </>
                    : <span>Hello there!</span>
            }
        </Header>

    )
}

const Header = styled.div`
padding:10px;
background:lightgreen;
margin-bottom:5px;
position:sticky;
top:0;
display:flex;
align-items:center;
justify-content:space-between;
flex-wrap:wrap;

span{
    border:3px dotted gray;
    padding:5px 10px;
    border-radius:5px;
}
`
export default Nav;