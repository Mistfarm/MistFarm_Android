import React from "react"
import { View, StyleSheet, ScrollView, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Header } from "../components/common"
import responsive from "../utils/responsive"
import { colors } from "../styles/colors"
import { AlarmItem } from "../components/alarm/AlarmItem"

interface Alarm {
    state: "success" | "error" | "disconnect"
    message: string
}

export function Alarm() {
    // const dummy = new Array(0)

    const dummy: Alarm[] = [
        {
            state: "success",
            message: "{기기id}: 연결을 성공했습니다",
        },
        {
            state: "error",
            message:
                "{기기id}: 예상치 못한 연결 끊김이 발견되었습니다. 기기를 확인해 주세요",
        },
        {
            state: "disconnect",
            message: "{기기id}: 연결을 성공적으로 해제하였습니다.",
        },
    ]

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "#fff" }}
            edges={["top", "left", "right", "bottom"]}
        >
            <Header title="알림" />

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    {dummy.length ? (
                        <View style={styles.items}>
                            {dummy.map((v, i) => (
                                <AlarmItem
                                    state={v.state}
                                    message={v.message}
                                    key={i}
                                />
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.text}>아직 알람이 없어요.</Text>
                    )}
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
    text: {
        margin: "auto",
        color: colors.gray[600],
    },
})
