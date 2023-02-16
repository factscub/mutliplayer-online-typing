
import { Button, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../Context/SocketContext/SocketContext';
import { createCombinedId } from '../../Helpers';

const Invitation = () => {
  const navigate = useNavigate();
  const [socketerror, setSocketerror] = useState();
  const socket = useContext(SocketContext);

  const invitation = useForm({
    initialValues: { email: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      email: isNotEmpty(),
    }
  });

  function invitationHandler(values) {

    // get player data from localstorage
    const { email, username } = JSON.parse(localStorage.getItem('user'))

    // create and store combined emails of both the user and opponent in localstorage
    const combinedId = createCombinedId(email, values.email)

    // create new game if both users have no previous games pending.
    socket.emit('createGame', { combinedId, username, opponentEmail: values.email }, callback)

    // callback is called on the serverside and sends err or roomId as arguments
    function callback({ error, result }) {
      const { roomId, opponent } = result || {};

      if (!!error) {
        setSocketerror(error)
      }
      else if (!!roomId) {

        navigate('/game', {
          state: {
            roomId,
            username,
            opponent
          }
        })

      }
    }
  }
  
  return (
    <form onSubmit={invitation.onSubmit(invitationHandler)}>
      <TextInput label="Email" placeholder="Email" {...invitation.getInputProps('email')} />

      <Button type="submit" mt="sm">Enter Game</Button>
      {
        socketerror && <p className='error' >{socketerror}</p>
      }
    </form>
  )
}


export default Invitation;