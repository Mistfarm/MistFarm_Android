import { useEffect, useRef } from "react"

declare global {
    interface Window {
        kakao: any
    }
}

interface IProps {
    coordinates: { lat: number; lng: number }[]
    level?: number
    height?: string
}

export function Map({ coordinates, level = 3, height = "500px" }: IProps) {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mapScriptId = "kakao-map-sdk"

        if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => initMap())
            return
        }

        const existingScript = document.getElementById(mapScriptId)
        if (existingScript) {
            existingScript.addEventListener("load", () => {
                window.kakao.maps.load(() => initMap())
            })
            return
        }

        const script = document.createElement("script")
        script.id = mapScriptId
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`
        script.async = false
        script.onload = () => {
            window.kakao.maps.load(() => initMap())
        }

        document.head.appendChild(script)

        function initMap() {
            if (!mapRef.current || coordinates.length === 0) return
            const kakao = window.kakao

            const center = new kakao.maps.LatLng(
                coordinates[0].lat,
                coordinates[0].lng
            )

            const map = new kakao.maps.Map(mapRef.current, {
                center,
                level,
            })

            coordinates.forEach(({ lat, lng }) => {
                new kakao.maps.Marker({
                    map,
                    position: new kakao.maps.LatLng(lat, lng),
                })
            })

            const bounds = new kakao.maps.LatLngBounds()
            coordinates.forEach(({ lat, lng }) => {
                bounds.extend(new kakao.maps.LatLng(lat, lng))
            })
            map.setBounds(bounds)
        }
    }, [coordinates, level])

    return (
        <div
            ref={mapRef}
            style={{
                width: "100%",
                height,
                borderRadius: "12px",
            }}
        ></div>
    )
}
