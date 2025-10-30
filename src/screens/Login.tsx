import { View, Image, Text, StyleSheet } from "react-native"
import { Button, Input } from "../components/common"
import { useState } from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import { useNavigation } from "@react-navigation/native"
import { colors } from "../styles/colors"
import responsive from "../utils/responsive"

type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>

export function Login() {
    const navigation = useNavigation<LoginScreenNavigationProp>()

    const [email, setEmail] = useState<string>("")
    const [passowrd, setPassword] = useState<string>("")

    const LoginHandler = () => {
        // 로그인 로직
        navigation.navigate("Device")
    }

    const toSignupHandler = () => {
        navigation.navigate("Signup")
    }

    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/icon.png")}
                />

                <View style={styles.inputContainer}>
                    <Input
                        label="이메일"
                        placeholder="이메일을 입력해주세요"
                        value={email}
                        onChange={setEmail}
                    />
                    <Input
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요"
                        value={passowrd}
                        onChange={setPassword}
                        type="password"
                    />
                </View>
                <View style={styles.button}>
                    <Text style={styles.signup} onPress={toSignupHandler}>
                        회원가입
                    </Text>
                    <Button onClick={LoginHandler}>로그인</Button>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: responsive(60),
        paddingTop: responsive(60),
        height: "100%",
    },
    logo: {
        width: responsive(200),
        height: responsive(200),
    },
    inputContainer: {
        width: responsive(350),
    },
    button: {
        width: responsive(350),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: responsive(7),
        marginTop: "auto",
        marginBottom: responsive(50),
    },
    signup: {
        color: colors.gray[500],
        textDecorationLine: "underline",
    },
})
