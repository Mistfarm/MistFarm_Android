export interface RegisterZoneRequest {
    zone_auth_id: string
    zone_pw: string
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
    zone_ids: string[]
}

export interface ZoneDevicesRequest {
    zone_id: string
}

export interface DeviceItem {
    devices_id: string
    name: string
}

export interface ZoneDevicesResponse {
    devices: DeviceItem[]
}

export interface CreateZoneRequest {
    zone_name: string
    device_ids: string[]
}

export interface DeleteDevicesRequest {
    zone_id: string
    device_ids: string[]
}
