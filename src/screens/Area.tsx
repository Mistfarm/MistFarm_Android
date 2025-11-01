import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"
import { Header } from "../components/common"
import Constants from "expo-constants"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

export function Area() {
    const apiKey = Constants.expoConfig?.extra?.googleMapsApiKey

    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                }}
                edges={["top", "left", "right", "bottom"]}
            >
                <Header title="구획관리" />

                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.5665, // 서울 기본 좌표
                        longitude: 126.978,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: 37.5665,
                            longitude: 126.978,
                        }}
                        title="현재 위치"
                        description="서울특별시청 근처"
                    />
                </MapView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    map: {
        flex: 1,
    },
})
