import React, { useRef } from "react"
import {
    Animated,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from "react-native"
import { colors } from "../../styles/colors"

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

function Button({ onClick, children, type = "main" }: IProps) {
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

export default Button

const styles = StyleSheet.create({
    button: {
        width: "100%",
        padding: 10,
        borderRadius: 6,
    },
    text: {
        textAlign: "center",
        fontWeight: "600",
    },
})
