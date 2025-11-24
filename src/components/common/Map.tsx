import { useEffect, useRef } from "react"

declare global {
    interface Window {
        kakao: any
    }
}

interface Device {
    device_id: string
    lat: number
    lng: number
    connected: boolean
}

interface IProps {
    devices: Device[]
    level?: number
    height?: string
}

export function Map({ devices, level = 3, height = "500px" }: IProps) {
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
            if (!mapRef.current) return
            const kakao = window.kakao

            // ⭐ coordinates가 없을 때 기본 중심
            const defaultCenter = new kakao.maps.LatLng(36.3916, 127.3632)

            const center =
                devices.length > 0
                    ? new kakao.maps.LatLng(devices[0].lat, devices[0].lng)
                    : defaultCenter

            const map = new kakao.maps.Map(mapRef.current, {
                center,
                level,
            })

            if (devices.length === 0) return // ⭐ 아무 기기도 없으면 마커 없이 지도만 띄움

            const bounds = new kakao.maps.LatLngBounds()

            devices.forEach((device) => {
                const { lat, lng, connected, device_id } = device

                const position = new kakao.maps.LatLng(lat, lng)

                const markerImageSrc = connected
                    ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"
                    : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"

                const markerImage = new kakao.maps.MarkerImage(
                    markerImageSrc,
                    new kakao.maps.Size(32, 32)
                )

                const marker = new kakao.maps.Marker({
                    map,
                    position,
                    image: markerImage,
                })

                const infoWindow = new kakao.maps.InfoWindow({
                    removable: true,
                    content: `
              <div style="padding:10px;font-size:14px;">
                <b>ID:</b> ${device_id}<br/>
                <b>Status:</b> ${connected ? "🟢 Online" : "🔴 Offline"}<br/>
              </div>
            `,
                })

                kakao.maps.event.addListener(marker, "click", () => {
                    infoWindow.open(map, marker)
                })

                bounds.extend(position)
            })

            map.setBounds(bounds)
        }
    }, [devices, level])

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
