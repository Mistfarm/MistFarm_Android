import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { instance } from ".."
import {
    NutrientSettingRequest,
    SelectPlantRequest,
    SetFogCycleRequest,
    SetModeRequest,
    SetPowerRequest,
    ZoneSettingResponse,
} from "./type"

export const useGetZoneSetting = (zoneId: string, options = {}) => {
    return useQuery<ZoneSettingResponse, AxiosError>({
        queryKey: ["zone-setting", zoneId],
        queryFn: async () => {
            const res = await instance.get<ZoneSettingResponse>(
                "/zone/setting",
                {
                    params: { zoneId: zoneId },
                }
            )
            return res.data
        },
        enabled: !!zoneId,
        staleTime: 0,
        gcTime: 0,
        retry: 0,
        ...options,
    })
}

export const useSelectPlant = () => {
    return useMutation<number, AxiosError, SelectPlantRequest>({
        mutationFn: async (data) => {
            const res = await instance.post("/zone/plant", data)

            return res.status
        },
    })
}

export const useSetNutrient = () => {
    return useMutation<number, AxiosError, NutrientSettingRequest>({
        mutationFn: async (data) => {
            const res = await instance.put("/zone/setting/nutrient", data)
            return res.status
        },
    })
}

export const useSetFogCycle = () => {
    return useMutation<number, AxiosError, SetFogCycleRequest>({
        mutationFn: async (data) => {
            const res = await instance.put("/zone/setting/fog-cycle", data)
            return res.status
        },
    })
}

export const useSetMode = () => {
    return useMutation<number, AxiosError, SetModeRequest>({
        mutationFn: async (data) => {
            const res = await instance.put("/zone/setting/mode", data)
            return res.status
        },
    })
}

export const useSetPower = () => {
    return useMutation<number, AxiosError, SetPowerRequest>({
        mutationFn: async (data) => {
            const res = await instance.put("/zone/setting/fog-power", data)
            return res.status
        },
    })
}
