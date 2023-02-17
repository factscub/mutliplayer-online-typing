import React, { createContext } from "react";
import io from "socket.io-client";

const socket = io.connect('https://multiplayer-online-typing-backend.onrender.com');

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    return (
        <SocketContext.Provider value={socket} >
            {children}
        </SocketContext.Provider>
    )
}