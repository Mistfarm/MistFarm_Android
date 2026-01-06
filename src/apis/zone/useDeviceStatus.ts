import { useEffect } from "react"
import { socket } from "../socket"
import { useQueryClient } from "@tanstack/react-query"
import type { Device, DeviceItem } from "./type"
import { tempCookie } from "../../utils/tempCookie"

export function useDeviceStatus(zone_id: string) {
    const queryClient = useQueryClient()
    const token = tempCookie.getAccessToken()

    useEffect(() => {
        if (!zone_id || !token) return

        socket.auth = { token }

        const onConnect = () => {
            socket.emit("get-devices-status", { zoneId: zone_id })
        }

        const onUpdate = (data: Device) => {
            queryClient.setQueryData(["devices-status", zone_id], data.devices)
        }

        const onConnectError = (err: Error) => {
            console.error("[socket] connect error:", err.message)
        }

        socket.on("connect", onConnect)
        socket.on("devices-status-update", onUpdate)
        socket.on("connect_error", onConnectError)

        if (!socket.connected) {
            socket.connect()
        } else {
            onConnect()
        }

        return () => {
            socket.off("connect", onConnect)
            socket.off("devices-status-update", onUpdate)
            socket.off("connect_error", onConnectError)
        }
    }, [zone_id, token])

    return {
        devices:
            queryClient.getQueryData<DeviceItem[]>([
                "devices-status",
                zone_id,
            ]) ?? [],
    }
}
