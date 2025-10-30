import React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import { Button, Header } from "../components/common"
import { DeviceItem } from "../components/Device/DeviceItem"
import responsive from "../utils/responsive"

type DeviceScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Device"
>

export function Device() {
    const dummy = [
        { name: "test1" },
        { name: "test2" },
        { name: "test3" },
        { name: "test4" },
        { name: "test5" },
        { name: "test6" },
        { name: "test7" },
    ]

    const navigation = useNavigation<DeviceScreenNavigationProp>()

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "#fff" }}
            edges={["top", "left", "right", "bottom"]}
        >
            <Header title="기기관리" />

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <Button type="gray">기기 등록하기</Button>

                    <View style={styles.items}>
                        {dummy.map((v, i) => (
                            <DeviceItem name={v.name} key={i} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingTop: responsive(10),
        paddingBottom: responsive(40),
    },
    container: {
        width: "90%",
        alignSelf: "center",
        marginTop: responsive(10),
        marginBottom: responsive(30),
        gap: responsive(10),
    },
    items: {
        gap: responsive(8),
    },
})
