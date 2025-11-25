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

        socket.io.opts.extraHeaders = {
            Authorization: `Bearer ${token}`,
        }

        socket.on("connect", () => {
            console.log("[socket] connected:", socket.id)

            socket.emit("get-devices-status", { zoneId: zone_id })
        })

        socket.on("connect_error", (err) => {
            console.log("[socket] connection error:", err.message)
        })

        socket.on("devices-status-update", (data: Device) => {
            queryClient.setQueryData(["devices-status", zone_id], data.devices)
        })

        socket.connect()

        return () => {
            socket.off("connect")
            socket.off("connect_error")
            socket.off("devices-status-update")
            socket.disconnect()
        }
    }, [zone_id, token, queryClient])

    return {
        devices:
            queryClient.getQueryData<DeviceItem[]>([
                "devices-status",
                zone_id,
            ]) ?? [],
    }
}
