class TempCookie {
    private accessToken: string | null
    private refreshToken: string | null

    constructor() {
        this.accessToken = null
        this.refreshToken = null
        this.loadTokens()
    }

    setAccessToken(token: string) {
        this.accessToken = token.replace("Bearer ", "")
        localStorage.setItem("accessToken", this.accessToken)
    }

    getAccessToken() {
        if (!this.accessToken) this.loadTokens()
        return this.accessToken ? `Bearer ${this.accessToken}` : null
    }

    setRefreshToken(token: string) {
        this.refreshToken = token
        localStorage.setItem("refreshToken", token)
    }

    getRefreshToken() {
        if (!this.refreshToken) this.loadTokens()
        return this.refreshToken
    }

    clearTokens() {
        this.accessToken = null
        this.refreshToken = null
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
    }

    loadTokens() {
        this.accessToken = localStorage.getItem("accessToken")
        this.refreshToken = localStorage.getItem("refreshToken")
    }
}

export const tempCookie = new TempCookie()
