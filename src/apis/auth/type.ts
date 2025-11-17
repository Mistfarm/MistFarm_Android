export interface RegisterRequest {
    name: string
    id: string
    password: string
}

export interface LoginRequest {
    id: string
    password: string
}

export interface LoginResponse {
    accessToken: string
    refreshToken: string
}

export interface EditRequest {
    name?: string
    password?: string
}

export interface InfoResponse {
    id: string
    name: string
}
