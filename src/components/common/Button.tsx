import React, { useRef } from "react"
import {
    Animated,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from "react-native"
import { colors } from "../../styles/colors"
import responsive from "../../utils/responsive"

interface IProps {
    onClick?: () => void
    children?: React.ReactNode
    type?: "main" | "gray" | "error"
}

const colorSetting = {
    main: {
        text: colors.white,
        press: colors.main[600],
        noPress: colors.main[500],
    },
    gray: {
        text: colors.black,
        press: colors.gray[200],
        noPress: colors.gray[100],
    },
    error: {
        text: colors.error.main,
        press: "#f1d4c3",
        noPress: colors.error.bg,
    },
}

export function Button({ onClick, children, type = "main" }: IProps) {
    const animatedValue = useRef(new Animated.Value(0)).current

    const handlePressIn = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 150,
            useNativeDriver: false,
        }).start()
    }

    const handlePressOut = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
        }).start()
    }

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [colorSetting[type].noPress, colorSetting[type].press],
    })

    return (
        <TouchableWithoutFeedback
            onPress={onClick}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={[styles.button, { backgroundColor }]}>
                <Text style={[styles.text, { color: colorSetting[type].text }]}>
                    {children}
                </Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: responsive(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: responsive(6),
        marginVertical: responsive(8),
    },
    text: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: responsive(15),
    },
})
