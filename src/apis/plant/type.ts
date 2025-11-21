export interface AutoModeResponse {
    growth_level: number
    humidity: number
    temperature: number
    plant: string
    mode: true
    on_interval: string
    off_interval: string
    nutrients_rate: number
}

export interface ManualModeResponse {
    growth_level: number
    humidity: number
    temperature: number
    plant: string
    mode: false
    power: boolean
    nutrients_rate: number
}

export type ZoneSettingResponse = AutoModeResponse | ManualModeResponse

export interface SelectPlantRequest {
    zone_id: string
    plant: string
}

export interface NutrientSettingRequest {
    zone_id: string
    nutrients_rate: number
}

export interface SetFogCycleRequest {
    zone_id: string
    on_interval: string
    off_interval: string
}

export interface SetModeRequest {
    zone_id: string
    mode: boolean
}

export interface SetPowerRequest {
    zone_id: string
    power: boolean
}
