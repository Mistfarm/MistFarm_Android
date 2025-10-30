import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../../styles/colors"
import responsive from "../../utils/responsive"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import Ionicons from "@expo/vector-icons/Ionicons"

interface IProp {
    name?: string
}

export function DeviceItem({ name }: IProp) {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.name}>{name}</Text>

                <View style={styles.icons}>
                    <TouchableOpacity activeOpacity={0.7}>
                        <MaterialIcons
                            name="mode-edit"
                            size={18}
                            color={colors.gray[600]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Ionicons
                            name="trash-sharp"
                            size={18}
                            color={colors.gray[600]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: responsive(50),
        paddingBlock: responsive(8),
        paddingHorizontal: responsive(12),
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray[300],
        borderRadius: responsive(6),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    name: {
        fontSize: responsive(18),
    },
    icons: {
        marginLeft: "auto",
        display: "flex",
        flexDirection: "row",
        gap: responsive(10),
    },
})
