import "dotenv/config"
import { ConfigContext, ExpoConfig } from "expo/config"

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "mistfarm",
    slug: "mistfarm",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    scheme: "mistfarm",

    splash: {
        image: "./assets/icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.NoNamed.flp",
        config: {
            googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
    },
    android: {
        package: "com.NoNamed.mistfarm",
        adaptiveIcon: {
            foregroundImage: "./assets/icon.png",
            backgroundColor: "#ffffff",
        },
        permissions: ["INTERNET", "ACCESS_NETWORK_STATE"],
        config: {
            googleMaps: {
                apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            },
        },
    },
    web: {
        favicon: "./assets/icon.png",
    },
    notification: {
        icon: "./assets/icon.png",
        color: "#6fce5e",
        androidMode: "default",
        androidCollapsedTitle: "mistfarm",
    },
    plugins: [
        [
            "expo-build-properties",
            {
                android: {
                    enableProguardInReleaseBuilds: false,
                    enableShrinkResourcesInReleaseBuilds: false,
                    usesCleartextTraffic: true,
                },
            },
        ],
        [
            "expo-notifications",
            {
                icon: "./assets/icon.png",
                color: "#6fce5e",
                defaultChannel: "default",
            },
        ],
    ],
    extra: {
        eas: {
            projectId: "0504388d-5170-48b2-a22b-2a522c663abb",
        },
        EXPO_PUBLIC_GOOGLE_MAPS_API_KEY:
            process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        // EXPO_PUBLIC_BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,
    },
    owner: "jihoseo",
})
