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

interface IProps {
    label?: string
    placeholder?: string
    type?: string
    value?: string
    onChange?: (text: string) => void
    password?: boolean
}

export default function Input({
    label,
    placeholder,
    type,
    value,
    onChange,
    password = false,
}: IProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={password && !showPassword}
                    keyboardType={type === "number" ? "numeric" : "default"}
                    placeholderTextColor={colors.gray[500]}
                />

                {password && (
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
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
        color: colors.black,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.gray[50],
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.gray[100],
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 15,
        lineHeight: 20,
        color: colors.black,
    },
    icon: {
        padding: 4,
    },
})
