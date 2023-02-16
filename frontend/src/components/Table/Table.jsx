import React from 'react'
import styled from 'styled-components'

const Table = ({ username, opponent, gameData }) => {
    return (
        <TableWrapper>
            <TB>
                <thead>
                    <tr>
                        <Th>Players</Th>
                        <Th>Errors</Th>
                        <Th>Elapsed Time</Th>
                        <Th>winner</Th>
                    </tr>
                </thead>

                <tbody>
                    {
                        [username, opponent].map((name, i) => {
                            const usersData = gameData?.playersGameStatus?.[name]
                            return <tr key={i}>
                                <Td>{name === username ? 'You' : name}</Td>
                                <Td>{usersData?.errors ? usersData?.errors : 0}</Td>
                                <Td>{usersData?.elapsedTime ? usersData?.elapsedTime : '00:00'}</Td>
                                <Td>{!gameData?.winner ? '-' : (gameData?.winner === name ? 'Won' : 'Lost')}</Td>
                            </tr>
                        })
                    }
                </tbody>
            </TB>
        </TableWrapper>
    )
}

const TableWrapper = styled.div``

const TB = styled.table`
border-collapse: collapse;
text-align: center;
margin:auto;

`
const Th = styled.th`
padding: 5px;
border: solid 1px #777;
background-color: lightblue;

`

const Td = styled.td`
padding: 5px;
border: solid 1px #777;
`

export default Table;