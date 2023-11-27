import React, { useEffect } from "react"
import { View, Text, Image, Button, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useAppDispatch, useAppSelector } from "../hooks"
import { RootState } from "../stores/store"
import { getOrder } from "../stores/reducer"

import styles from './styles'
import Divider from "../components/divider"
import OrderItem from "../components/orderItem"

export default function Order() {

    const nav = useNavigation()
    const data = useAppSelector((state: RootState) => state.data.orders)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getOrder())
    }, [])

    const addOrder = () => nav.navigate('Items')

    return (
        <View style={styles.root}>

            <View style={styles.header}>
                <Image style={styles.profileImage} source={{
                    uri: 'https://dummyimage.com/32x32/b81bb8/fff.png&text=A'
                }} />

                <Icon name="menu" size={32} color='white' />
            </View>

            <Text style={styles.title}>Sales Order List</Text>

            <View style={styles.body}>
                <View style={styles.bodyTitle}>
                    <Text style={styles.bodyTitleLabel}>Order List</Text>
                    <Text style={styles.totalLabel}>Total Items: {data.length}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20 }}>
                    <Button title="Add" color='green' onPress={addOrder} />
                </View>

                <FlatList
                    data={data}
                    renderItem={({ item }) => (<OrderItem {...item} />)}
                    keyExtractor={item => item.OrderNo}
                    ItemSeparatorComponent={() => (<Divider />)}
                    contentContainerStyle={styles.listContainerStyle}
                />
            </View>
        </View>
    );
}