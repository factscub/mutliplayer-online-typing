import React from 'react'
import styled from 'styled-components'

const Words = ({ words, wordIndex, letterIndex, error }) => {
    return (
        <WordsWrapper >
            {
                words.map((word, i) => (
                    <Word style={{ background: i === wordIndex ? 'lightgreen' : '' }} key={i} >
                        {
                            word.split('').map((letter, j) => (<Letter key={j} style={{ background: i === wordIndex && j === letterIndex && error ? 'red' : '' }} >{letter}</Letter>))
                        }
                    </Word>
                ))
            }
        </WordsWrapper>
    )
}

const WordsWrapper = styled.div`
display: flex;
padding: 20px;
flex-wrap: wrap;
border:3px dotted gray;
margin:10px;
border-radius:5px;
`

const Word = styled.div`
padding: 0 3px;
letter-spacing: 3px;
font-size: 20px;
`

const Letter = styled.span`
white-space: pre;
color: black;
`
export default Words