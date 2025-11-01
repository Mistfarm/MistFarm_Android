import React, { useState, useRef } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import AntDesign from "@expo/vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/navigation"
import responsive from "../../utils/responsive"
import { colors } from "../../styles/colors"

interface IProps {
    title?: string
}

interface MenuItem {
    name: string
    navigation: "Device" | "Area" | "Mypage"
}

const { height } = Dimensions.get("window")
type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

export function Header({ title }: IProps) {
    const [isOpen, setIsOpen] = useState(false)
    const slideAnim = useRef(new Animated.Value(responsive(300))).current
    const navigation = useNavigation<ScreenNavigationProp>()

    const menuItems: MenuItem[] = [
        { name: "기기관리", navigation: "Device" },
        { name: "구획관리", navigation: "Area" },
        { name: "마이페이지", navigation: "Mypage" },
    ]

    const toggleSidebar = () => {
        if (isOpen) {
            Animated.timing(slideAnim, {
                toValue: responsive(300),
                duration: 250,
                useNativeDriver: true,
            }).start(() => setIsOpen(false))
        } else {
            setIsOpen(true)
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start()
        }
    }

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>

                <TouchableOpacity
                    style={styles.menu}
                    activeOpacity={0.7}
                    onPress={toggleSidebar}
                >
                    <Ionicons name="menu" size={24} color={colors.gray[500]} />
                </TouchableOpacity>
            </View>

            {isOpen && (
                <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
                    <TouchableOpacity
                        style={styles.background}
                        onPress={toggleSidebar}
                        activeOpacity={1}
                    />

                    <Animated.View
                        style={[
                            styles.sidebar,
                            {
                                transform: [{ translateX: slideAnim }],
                                height,
                            },
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.bell}
                            activeOpacity={0.7}
                            onPress={() => {
                                toggleSidebar()
                                navigation.navigate("Alarm")
                            }}
                        >
                            <AntDesign
                                name="bell"
                                size={20}
                                color={colors.gray[600]}
                            />
                        </TouchableOpacity>

                        {menuItems.map((v) => (
                            <TouchableOpacity
                                key={v.name}
                                style={styles.menuItem}
                                onPress={() => {
                                    toggleSidebar()
                                    navigation.navigate(v.navigation)
                                }}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.menuText}>{v.name}</Text>
                            </TouchableOpacity>
                        ))}

                        <View style={styles.logout}>
                            <Ionicons
                                name="exit-outline"
                                size={24}
                                color={colors.gray[600]}
                            />
                        </View>
                    </Animated.View>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.white,
        zIndex: 10,
    },
    header: {
        width: "100%",
        height: responsive(50),
        borderBottomWidth: 1,
        borderColor: colors.gray[50],
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
    },
    title: {
        fontSize: responsive(14),
        fontWeight: "bold",
        lineHeight: responsive(20),
    },
    menu: {
        position: "absolute",
        right: responsive(25),
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 20,
    },
    sidebar: {
        position: "absolute",
        top: 0,
        right: 0,
        width: responsive(250),
        backgroundColor: "#fff",
        padding: responsive(20),
        paddingTop: responsive(50),
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: -2, height: 0 },
        shadowRadius: 4,
        zIndex: 30,
    },
    bell: {
        marginLeft: "auto",
        marginBottom: responsive(30),
    },
    menuItem: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: colors.gray[100],
    },
    menuText: {
        fontSize: responsive(15),
    },
    logout: {
        marginTop: "auto",
        marginLeft: "auto",
        marginBottom: responsive(20),
    },
})
