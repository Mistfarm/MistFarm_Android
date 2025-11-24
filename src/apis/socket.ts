import { io } from "socket.io-client"

export const socket = io(
    `${process.env.REACT_APP_SOCKET_BASE_URL}/zone/devices`,
    {
        transports: ["websocket"],
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
    }
)
