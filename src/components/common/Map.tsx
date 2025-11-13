import { useEffect, useRef } from "react"
import { colors } from "../../styles/colors"

declare global {
    interface Window {
        kakao?: any
    }
}

interface IProps {
    lat: number
    lng: number
    level?: number
    height?: string
}

export function Map({ lat, lng, level = 3, height = "500px" }: IProps) {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mapScriptId = "kakao-map-script"

        if (window.kakao && window.kakao.maps) {
            initMap()
            return
        }

        if (document.getElementById(mapScriptId)) return

        const script = document.createElement("script")
        script.id = mapScriptId
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`
        script.async = true
        document.head.appendChild(script)

        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(initMap)
            }
        }

        function initMap() {
            if (!mapRef.current || !window.kakao?.maps) return

            const options = {
                center: new window.kakao.maps.LatLng(lat, lng),
                level,
            }

            const map = new window.kakao.maps.Map(mapRef.current, options)

            new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(lat, lng),
                map,
            })
        }
    }, [lat, lng, level])

    return (
        <div
            ref={mapRef}
            style={{
                width: "100%",
                height,
                borderRadius: "12px",
                border: `1px solid ${colors.Gray400}`,
            }}
        />
    )
}
