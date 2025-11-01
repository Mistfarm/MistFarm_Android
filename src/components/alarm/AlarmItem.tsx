import { View, Text, StyleSheet } from "react-native"
import responsive from "../../utils/responsive"
import { colors } from "../../styles/colors"

interface IProps {
    state?: "success" | "error" | "disconnect"
    message?: string
}

export function AlarmItem({ state, message }: IProps) {
    const stateColor = state == "success" ? colors.main[500] : colors.error.main

    return (
        <>
            <View style={styles.container}>
                <Text style={[styles.state, { color: stateColor }]}>
                    {state}
                </Text>
                <Text>{message}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingBlock: responsive(8),
        paddingHorizontal: responsive(12),
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray[300],
        borderRadius: responsive(6),
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: responsive(4),
    },
    state: {
        fontSize: responsive(20),
        fontWeight: "bold",
    },
})
