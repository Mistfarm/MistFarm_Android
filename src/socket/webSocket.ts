let ws: WebSocket | null = null

export function connectWebSocket(accessToken: string) {
    ws = new WebSocket(`wss://your-server-url/ws?token=${accessToken}`)

    ws.onopen = () => {
        console.log("WebSocket Connected")
    }

    ws.onclose = () => {
        console.log("WebSocket Disconnected")
    }

    ws.onerror = (err) => {
        console.error("WebSocket Error:", err)
    }

    return ws
}

export function getWebSocket() {
    return ws
}
