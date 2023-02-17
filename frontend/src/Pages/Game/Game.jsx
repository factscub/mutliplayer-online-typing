import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext/SocketContext';
import { useSpellChecker, useSetInterval } from '../../Hooks';
import { Words, Table, Typer } from '../../components'

const Game = () => {

    const socket = useContext(SocketContext);
    const { state: { roomId, username, opponent } } = useLocation();
    const { words, wordIndex, letterIndex, error, errors, finished, spellChecker } = useSpellChecker()
    const { elapsedTime, timeCount, intrId } = useSetInterval();
    const [gameData, setGameData] = useState();
    const [isPlayerFinished, setIsPlayerFinished] = useState(false);
    const inref = useRef();

    useEffect(() => {
        if (timeCount) {
            const playerFinished = gameData?.playersGameStatus?.[username]?.finished ? true : (!gameData?.playersGameStatus?.[username]?.finished && finished ? true : false)
            socket.emit('gameData', {
                roomId, username,
                playerData: {
                    playersGameStatus: {
                        [username]: {
                            errors,
                            timeCount,
                            finished: playerFinished,
                            elapsedTime

                        }
                    }
                }
            });
        }

        if (finished) {
            setIsPlayerFinished(true);
        }


    }, [roomId, errors, timeCount, username, gameData, finished, elapsedTime]);

    useEffect(() => {
        inref.current.focus();
        socket.emit('joinGame', { roomId });
    }, [roomId]);

    socket.on('joinGame', (data) => {
        setGameData(data);
        if (data.playersGameStatus[username].finished) {
            setIsPlayerFinished(true);

        }
    });

    socket.on('gameData', (data) => {
        setGameData(data);

    });

    return (
        <>
            <Table {...{ username, opponent, gameData }} />
            <Words {...{ error, wordIndex, letterIndex, words }} />
            <Typer {...{ isPlayerFinished, inref, onChange: (e) => spellChecker({ e, intrId }) }} />

            <p >Errors:{errors}</p>
            <p>Elapsed time: {elapsedTime}</p>
            <p className='error'>NOTE:If you leave without completing , the timer restarts and you will have to type from the begining again .</p>

        </>
    )
}

export default Game;