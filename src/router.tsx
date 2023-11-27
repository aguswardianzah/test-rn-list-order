import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Order from "./pages/order"
import Items from "./pages/items"

const Stack = createNativeStackNavigator()

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Order" screenOptions={{ headerShown: false }}>

                <Stack.Screen name="Order" component={Order} />
                <Stack.Screen name="Items" component={Items} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}