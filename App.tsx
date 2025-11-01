import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Alarm, Area, Device, Login, Mypage, Signup } from "./src/screens/index"

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    contentStyle: { backgroundColor: "white" },
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Device" component={Device} />
                <Stack.Screen name="Alarm" component={Alarm} />
                <Stack.Screen name="Mypage" component={Mypage} />
                <Stack.Screen name="Area" component={Area} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
