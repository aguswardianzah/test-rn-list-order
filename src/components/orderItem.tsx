import React from "react"
import { Text, View } from "react-native"

import styles from "./styles"
import { OrderItemProps } from "../types"

const parseDate = (date: string) => {
    const ms = Date.parse(date)
    return new Date(ms).toLocaleDateString()
}

const OrderItem = (item: OrderItemProps) => (
    <View style={styles.orderItem} key={item.OrderNo}>
        <Text style={styles.orderItemLabel}>{item.CustomerName}</Text>
        <Text style={styles.orderItemLabel}>{item.OrderNo}</Text>
        <Text style={styles.orderItemLabel}>{parseDate(item.OrderDate)}</Text>
    </View>
)

export default React.memo(OrderItem)