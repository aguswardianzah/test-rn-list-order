import React from "react"
import { Pressable, Text, View } from "react-native"

import styles from "./styles"
import Icon from "react-native-vector-icons/MaterialIcons"
import { ProductItemProps } from "../types"

const ProductItem = ({ item, onEdit, onDelete }: ProductItemProps) => (
    <View style={styles.orderItem}>
        <View style={{ flex: 1 }}>
            <Text style={styles.orderItemLabel}>{item.ItemName}</Text>
            <Text style={styles.orderItemLabel}>{item.Price}</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.orderItemLabel}>QTY</Text>
            <Text style={styles.orderItemLabel}>{item.Quantity}</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.orderItemLabel}>Total</Text>
            <Text style={styles.orderItemLabel}>{item.Price * item.Quantity}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable onPress={() => onEdit && onEdit(item)}>
                <Icon name="edit" size={20} color='black' />
            </Pressable>

            <Pressable onPress={() => onDelete && onDelete(item)}>
                <Icon name="delete" size={20} color='black' />
            </Pressable>
        </View>
    </View>
)

export default React.memo(
    ProductItem,
    (prev, next) => prev.item.Quantity == next.item.Quantity
)