import { Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getDateFormat } from '../../Helpers/GetDateFormat';
const GameDetailsCard = ({ username, game }) => {
    const [opponent, setOpponent] = useState();
    const [description, setDescription] = useState();
    const navigate = useNavigate();

    useEffect(() => {

        // set appropriate description for the gamedetails card
        if (!game.winner) {
            setDescription('Game in PROGRESS');
        }
        else {
            if (username === game.winner) {
                setDescription('You won!');
            }
            else {
                setDescription('You lost!');
            }
        }

        // sets the opponent player name

        if (username === game.usernames[0]) {
            setOpponent(game.usernames[1]);
        }
        else {
            setOpponent(game.usernames[0]);
        }


    }, [game, username]);

    // this method is called when we press game details card button
    // and navigates to the game page
    function gotoPage() {
        navigate('/game', {
            state: {
                roomId: game._id,
                username,
                opponent
            }
        });

    }

    return (
        <Card>
            <p>Game with: {opponent}</p>
            <p>{description}</p>
            <p>{getDateFormat(game.updatedAt)}</p>
            <Button onClick={gotoPage} >View Game</Button>

        </Card>
    )
}

const Card = styled.div`
width:35%;
padding:10px;
border:3px dotted gray;
margin:20px auto;
border-radius:5px;
background:lightgreen;

p{
    margin:5px 0;
}
`

export default GameDetailsCard