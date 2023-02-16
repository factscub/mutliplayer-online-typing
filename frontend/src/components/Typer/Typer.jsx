import { Button } from '@mantine/core';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Typer = ({ isPlayerFinished, inref, onChange }) => {
  const navigate = useNavigate();
  return (
    <TypingWrapper>
      <Input placeholder='Start typing...' disabled={isPlayerFinished} onChange={onChange} ref={inref} />
      <Button onClick={() => navigate('/home')}>Home</Button>
    </TypingWrapper>
  )
}

const TypingWrapper = styled.div`
display:flex;
justify-content:center;

`
const Input = styled.input`

    font-size: 20px;
    margin-right: 5px;
  
  &::placeholder {
    opacity: 0.4;
  }
  
  &:disabled {
    background-color: rgb(216, 212, 212);
  }
`
export default Typer;