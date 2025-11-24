import { useEffect, useState } from "react"
import { getWebSocket } from "../socket/webSocket"

interface Device {
    device_id: string
    connected: boolean
    lat: number
    lon: number
}

export function useDevicesStatus(zoneId: string) {
    const [devices, setDevices] = useState<Device[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const ws = getWebSocket()
        if (!ws || ws.readyState !== WebSocket.OPEN) return

        ws.send(
            JSON.stringify({
                event: "get-devices-status",
                zone_id: zoneId,
            })
        )

        const handleMessage = (e: MessageEvent) => {
            const data = JSON.parse(e.data)

            if (data.event === "devices-status-update") {
                setDevices(data.devices)
                setLoading(false)
            }
        }

        ws.addEventListener("message", handleMessage)

        return () => {
            ws.removeEventListener("message", handleMessage)
        }
    }, [zoneId])

    return { devices, loading }
}
