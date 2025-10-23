import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { useState } from "react"
import Input from "./src/components/common/Input"
import Button from "./src/components/common/Button"

export default function App() {
    const [password, setPassword] = useState<string>("")

    return (
        <View style={styles.container}>
            <Text>Op!</Text>

            <Input
                label="비밀번호"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={setPassword}
                password
            />

            <Button>main</Button>
            <Button type="gray">gray</Button>
            <Button type="error">error</Button>

            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})
