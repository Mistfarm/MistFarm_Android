import React, { useState } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../styles/colors"
import responsive from "../../utils/responsive"

interface IProps {
    label?: string
    placeholder?: string
    type?: "text" | "number" | "password"
    value?: string
    onChange?: (text: string) => void
}

export function Input({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
}: IProps) {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === "password"

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={isPassword && !showPassword}
                    keyboardType={type === "number" ? "numeric" : "default"}
                    placeholderTextColor={colors.gray[500]}
                />

                {isPassword && (
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setShowPassword((prev) => !prev)}
                        activeOpacity={0.6}
                    >
                        <Ionicons
                            name={
                                showPassword ? "eye-outline" : "eye-off-outline"
                            }
                            size={20}
                            color={colors.gray[600]}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: responsive(8),
    },
    label: {
        fontSize: responsive(14),
        fontWeight: "600",
        marginBottom: responsive(6),
        color: colors.black,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.gray[50],
        borderRadius: responsive(6),
        borderWidth: responsive(1),
        borderColor: colors.gray[100],
        paddingHorizontal: responsive(12),
    },
    input: {
        flex: 1,
        height: responsive(48),
        fontSize: responsive(15),
        lineHeight: responsive(20),
        color: colors.black,
    },
    icon: {
        padding: responsive(4),
    },
})
