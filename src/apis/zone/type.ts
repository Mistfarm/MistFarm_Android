export interface RegisterZoneRequest {
    zoneAuthId: string
    zonePw: string
}

export interface ZoneItem {
    id: string
    name: string
    plant: string
}

export interface ZonesResponse {
    zones: ZoneItem[]
}

export interface DeleteZoneRequest {
    zoneId: string
}

export interface ZoneDevicesRequest {
    zoneId: string
}

export interface DeviceItem {
    devicesId: string
    name: string
}

export interface ZoneDevicesResponse {
    devices: DeviceItem[]
}

export interface CreateZoneRequest {
    zoneName: string
    deviceIds: string[]
}

export interface DeleteDevicesRequest {
    zoneId: string
    deviceIds: string[]
}

export interface RegisterDeviceRequest {
    zoneId: string
    deviceIds: string[]
}

export interface DeviceItem {
    deviceId: string
    connected: boolean
    lat: number
    lon: number
}

export interface Device {
    devices: DeviceItem[]
}
