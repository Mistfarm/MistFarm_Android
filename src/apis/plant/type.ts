export interface AutoModeResponse {
    growthLevel: number
    humidity: number
    temperature: number
    plant: string
    mode: true
    onInterval: string
    offInterval: string
    nutrientsRate: number
}

export interface ManualModeResponse {
    growthLevel: number
    humidity: number
    temperature: number
    plant: string
    mode: false
    power: boolean
    nutrientsRate: number
}

export type ZoneSettingResponse = AutoModeResponse | ManualModeResponse

export interface SelectPlantRequest {
    zoneId: string
    plant: string
}

export interface NutrientSettingRequest {
    zoneId: string
    nutrientsRate: number
}

export interface SetFogCycleRequest {
    zoneId: string
    onInterval: string
    offInterval: string
}

export interface SetModeRequest {
    zoneId: string
    mode: boolean
}

export interface SetPowerRequest {
    zoneId: string
    power: boolean
}
