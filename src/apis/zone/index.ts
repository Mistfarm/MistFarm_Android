import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { instance } from ".."
import {
    CreateZoneRequest,
    DeleteDevicesRequest,
    DeleteZoneRequest,
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
    { zone_id }: ZoneDevicesRequest,
    options = {}
) => {
    return useQuery<ZoneDevicesResponse, AxiosError>({
        queryKey: ["zone-devices", zone_id],
        queryFn: async () => {
            const res = await instance.get<ZoneDevicesResponse>(
                `/zone/devices`,
                { params: { zone_id } }
            )
            return res.data
        },
        staleTime: 0,
        gcTime: 0,
        retry: 0,
        enabled: !!zone_id,
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
