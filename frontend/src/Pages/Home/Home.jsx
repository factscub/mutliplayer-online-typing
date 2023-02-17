import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SocketContext } from '../../Context/SocketContext/SocketContext';
import { sortedGameList } from '../../Helpers';
import { GameDetailsCard } from '../../components';

const Home = () => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [games, setGames] = useState([]);
  const username = useMemo(() => JSON.parse(localStorage.getItem('user'))['username'], []);

  useEffect(() => {
    /*
    gets all games that matches the username
    and stores in games variable
    */
    function callback({ error, result }) {
      setGames(sortedGameList(result));
    }
    socket.emit('getAllGames', { username }, callback);

  }, [username, socket]);

  socket.on('notifyUser', (data) => {
    const tempArray = games.filter((game, i) => {
      return (game._id !== data._id);
    })
    setGames(sortedGameList([...tempArray, data]));
  });

  /*
      this socket event helps to create a unique room for this user only.
      */
  useEffect(() => {
    socket.emit('homePageRoom', { username });
  }, [socket]);


  return (
    <HomeWrapper >
      <ButtonWrapper>
        <Button className='newGame' onClick={() => navigate('/invitation')}>NewGame</Button>
      </ButtonWrapper>
      {
        !!games.length && games.map((game, i) => (
          <GameDetailsCard key={i} username={username} game={game} />
        ))
      }
    </HomeWrapper>
  )
}

const HomeWrapper = styled.div``
const ButtonWrapper = styled.div`
background:white;
padding:10px 0;
position:sticky;
z-index:1;
top:0;
text-align:center;
 
`
export default Home;