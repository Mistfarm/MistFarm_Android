import "dotenv/config"
import { ExpoConfig } from "@expo/config"

const config: ExpoConfig = {
    name: "mistfarm",
    slug: "mistfarm",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "mistfarm",
    userInterfaceStyle: "light",
    splash: {
        image: "./assets/icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.NoNamed.mistfarm",
    },
    android: {
        package: "com.NoNamed.mistfarm",
        versionCode: 1,
        adaptiveIcon: {
            foregroundImage: "./assets/icon.png",
            backgroundColor: "#ffffff",
        },
    },
    owner: "jihoseo",
    extra: {
        eas: {
            projectId: "0504388d-5170-48b2-a22b-2a522c663abb",
        },
        EXPO_PUBLIC_GOOGLE_MAPS_API_KEY:
            process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
    plugins: [
        "expo-build-properties",
        [
            "expo-build-properties",
            {
                android: {
                    compileSdkVersion: 34,
                    targetSdkVersion: 34,
                    minSdkVersion: 23,
                },
            },
        ],
    ],
}

export default config
