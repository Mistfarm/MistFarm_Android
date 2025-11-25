import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { instance } from ".."
import {
    CreateZoneRequest,
    DeleteDevicesRequest,
    DeleteZoneRequest,
    RegisterDeviceRequest,
    RegisterZoneRequest,
    ZoneDevicesRequest,
    ZoneDevicesResponse,
    ZonesResponse,
} from "./type"

export const useRegisterZone = () => {
    return useMutation<number, AxiosError, RegisterZoneRequest>({
        mutationFn: async (data) => {
            const res = await instance.put("/zone", data)
            return res.status
        },
    })
}

export const useGetZoneList = (options = {}) => {
    return useQuery<ZonesResponse, AxiosError>({
        queryKey: ["zone-list"],
        queryFn: async () => {
            const res = await instance.get<ZonesResponse>("/zones")
            return res.data
        },
        staleTime: 0,
        gcTime: 0,
        retry: 0,
        ...options,
    })
}

export const useDeleteZone = () => {
    return useMutation<number, AxiosError, DeleteZoneRequest>({
        mutationFn: async (data) => {
            const res = await instance.delete("/zone", { data })
            return res.status
        },
    })
}

export const useGetZoneDevices = (
    { zoneId }: ZoneDevicesRequest,
    options = {}
) => {
    return useQuery<ZoneDevicesResponse, AxiosError>({
        queryKey: ["zone-devices", zoneId],
        queryFn: async () => {
            const res = await instance.get<ZoneDevicesResponse>(
                `/zone/devices`,
                { params: { zoneId } }
            )
            return res.data
        },
        staleTime: 0,
        gcTime: 0,
        retry: 0,
        enabled: !!zoneId,
        ...options,
    })
}

export const useCreateZone = () => {
    return useMutation<void, AxiosError, CreateZoneRequest>({
        mutationFn: async (data) => {
            await instance.post("/zone", data)
        },
    })
}

export const useDeleteDevice = () => {
    return useMutation<void, AxiosError, DeleteDevicesRequest>({
        mutationFn: async (data) => {
            await instance.post("/zone", data)
        },
    })
}

export const useRegisterDevice = () => {
    return useMutation<void, AxiosError, RegisterDeviceRequest>({
        mutationFn: async (data) => {
            await instance.post("/zone/devices", data)
        },
    })
}
