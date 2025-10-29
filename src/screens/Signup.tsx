import React, { useState } from "react"
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Button, Input } from "../components/common"
import { Ionicons } from "@expo/vector-icons"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import { useNavigation } from "@react-navigation/native"
import { colors } from "../styles/colors"
import responsive from "../utils/responsive"

type SignupScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Signup"
>

export function Signup() {
    const navigation = useNavigation<SignupScreenNavigationProp>()

    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [termsChecked, setTermsChecked] = useState<boolean>(false)

    const SignupHandler = () => {
        // 회원가입 로직
        navigation.navigate("Login")
    }

    const toLoginHandler = () => {
        navigation.navigate("Login")
    }

    const requestEmailVerify = () => {
        // 이메일 인증 요청 로직
    }

    const openTerms = () => {
        // 이용약관 페이지
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../../assets/icon.png")}
                resizeMode="contain"
            />

            <View style={styles.inputContainer}>
                <View style={styles.emailRow}>
                    <View style={styles.emailInput}>
                        <Input
                            label="이메일"
                            placeholder="이메일을 입력해주세요"
                            value={email}
                            onChange={setEmail}
                        />
                    </View>
                    <View style={styles.emailButton}>
                        <Button onClick={requestEmailVerify}>인증요청</Button>
                    </View>
                </View>
                <Input
                    label="이름"
                    placeholder="이름을 입력해주세요"
                    value={name}
                    onChange={setName}
                />
                <Input
                    label="비밀번호"
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={setPassword}
                    type="password"
                />
                <View style={styles.termsRow}>
                    <TouchableOpacity
                        style={styles.termsLeft}
                        onPress={openTerms}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="help-circle-outline"
                            size={18}
                            color={colors.gray[500]}
                        />
                        <Text style={styles.termsText}>이용약관(필수)</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            color={colors.gray[500]}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.checkboxWrapper}
                        onPress={() => setTermsChecked((prev) => !prev)}
                        activeOpacity={0.7}
                    >
                        <View
                            style={[
                                styles.checkbox,
                                termsChecked && styles.checkboxChecked,
                            ]}
                        >
                            {termsChecked && (
                                <Ionicons
                                    name="checkmark"
                                    size={14}
                                    color={colors.white}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomArea}>
                <Text style={styles.loginText} onPress={toLoginHandler}>
                    로그인
                </Text>
                <Button onClick={SignupHandler}>회원가입</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: responsive(60),
        backgroundColor: colors.white,
    },
    logo: {
        width: responsive(200),
        height: responsive(200),
        marginBottom: responsive(20),
    },
    inputContainer: {
        width: responsive(350),
        gap: responsive(12),
        marginBottom: responsive(40),
    },
    emailRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 8,
    },
    emailInput: {
        flex: 4,
    },
    emailButton: {
        flex: 1,
    },
    termsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: responsive(4),
    },
    termsLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    termsText: {
        color: colors.gray[600],
        fontSize: 14,
    },
    checkboxWrapper: {
        padding: 4,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.gray[400],
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxChecked: {
        backgroundColor: colors.main[500],
        borderColor: colors.main[500],
    },
    bottomArea: {
        width: responsive(350),
        alignItems: "center",
        gap: responsive(10),
        marginBottom: responsive(50),
    },
    loginText: {
        color: colors.gray[500],
        textDecorationLine: "underline",
    },
})
