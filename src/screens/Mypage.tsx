import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Input, Button, Header } from "../components/common"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import responsive from "../utils/responsive"

export function Mypage() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        before: "",
        after: "",
    })
    const insets = useSafeAreaInsets()

    const changeHandler = (name: keyof typeof values, text: string) => {
        setValues({ ...values, [name]: text })
    }

    const requestEmailVerify = () => {
        // 이메일 인증 로직
    }

    const editInform = () => {
        // 정보 수정 로직
    }

    const exitUser = () => {
        // 회원탈퇴 로직
    }

    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    paddingBottom: insets.bottom,
                }}
                edges={["top", "left", "right", "bottom"]}
            >
                <Header title="마이페이지" />

                <View style={styles.container}>
                    <Input
                        label="이름"
                        placeholder="이름을 입력해주세요"
                        value={values.username}
                        onChange={(text) => changeHandler("username", text)}
                    />
                    <View style={styles.emailRow}>
                        <View style={styles.emailInput}>
                            <Input
                                label="이메일"
                                placeholder="이메일을 입력해주세요"
                                value={values.email}
                                onChange={(text) =>
                                    changeHandler("email", text)
                                }
                            />
                        </View>
                        <View style={styles.emailButton}>
                            <Button onClick={requestEmailVerify}>
                                인증요청
                            </Button>
                        </View>
                    </View>
                    <Input
                        label="현재 비밀번호"
                        placeholder="현재 비밀번호를 입력해주세요"
                        value={values.before}
                        type="password"
                        onChange={(text) => changeHandler("before", text)}
                    />
                    <Input
                        label="새 비밀번호"
                        placeholder="새 비밀번호를 입력해주세요"
                        value={values.after}
                        type="password"
                        onChange={(text) => changeHandler("after", text)}
                    />
                    <View style={styles.button}>
                        <Button onClick={editInform}>정보 저장</Button>
                    </View>

                    <View style={styles.exit}>
                        <Button onClick={exitUser} type="error">
                            회원탈퇴
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: responsive(10),
        width: "90%",
        height: "100%",
        alignSelf: "center",
        gap: responsive(4),
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
    button: {
        marginTop: responsive(20),
    },
    exit: {
        width: responsive(150),
        marginTop: "auto",
        marginLeft: "auto",
    },
})
