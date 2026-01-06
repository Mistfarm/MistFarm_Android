import { io } from "socket.io-client"

export const socket = io(
    `${process.env.REACT_APP_SOCKET_BASE_URL}/zone/devices`,
    {
        transports: ["websocket"],
        autoConnect: false,
        auth: {
            token: "",
        },
    }
)
