import React, { useState, useEffect, useCallback } from "react"
import { View, Text, Image, Button, FlatList, Modal, Pressable, KeyboardAvoidingView, TextInput, Keyboard } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native"

import { useAppDispatch, useAppSelector } from "../hooks"
import styles from './styles'
import ProductItem from "../components/productItem"
import Divider from "../components/divider"
import { ProductItemData } from "../types"
import { createItems, deleteItems, getItems, updateItems } from "../stores/reducer"
import { RootState } from "../stores/store"

export default function Items() {

    const nav = useNavigation()
    const dispatch = useAppDispatch()

    const [modalShown, setModalShown] = useState(false)
    const [inputName, setInputName] = useState('')
    const [inputPrice, setInputPrice] = useState('')
    const [inputQty, setInputQty] = useState(1)
    const [itemId, setItemId] = useState(0)
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => { dispatch(getItems()) }, [])

    // handle keyboard
    const [keyboardShown, setKeyboardShown] = useState(false)
    useEffect(() => {
        const keyboardShownListener = Keyboard.addListener(
            'keyboardDidShow', () => setKeyboardShown(true)
        )

        const keyboardHiddenListener = Keyboard.addListener(
            'keyboardDidHide', () => setKeyboardShown(false)
        )

        return () => {
            keyboardShownListener.remove()
            keyboardHiddenListener.remove()
        }
    }, [])

    const hideDialog = useCallback(() => {
        if (keyboardShown)
            Keyboard.dismiss()
        else
            setModalShown(false)
    }, [keyboardShown])

    const saveItem = useCallback(
        async () => {
            if (keyboardShown) Keyboard.dismiss()
            setModalShown(false)

            const payload = {
                ItemId: itemId,
                OrderId: -99,
                ItemName: inputName,
                Quantity: inputQty,
                Price: inputPrice
            }

            await dispatch(isUpdate ? updateItems(payload) : createItems(payload))

            dispatch(getItems())

            setInputName('')
            setInputPrice('')
            setInputQty(1)
        },
        [inputName, inputPrice, inputQty, keyboardShown]
    )

    const cancelItem = () => {
        if (keyboardShown) Keyboard.dismiss()
        setModalShown(false)

        setInputName('')
        setInputPrice('')
        setInputQty(1)
    }

    const data = useAppSelector((state: RootState) => state.data.items)

    // const [data, setData] = React.useState<Array<ProductItemData>>([
    //     {
    //         ItemId: 0,
    //         OrderId: 0,
    //         ItemName: 'Barang 1',
    //         Quantity: 1,
    //         Price: 1000
    //     },
    //     {
    //         ItemId: 1,
    //         OrderId: 0,
    //         ItemName: 'Barang 2',
    //         Quantity: 2,
    //         Price: 2000
    //     },
    //     {
    //         ItemId: 3,
    //         OrderId: 0,
    //         ItemName: 'Barang 3',
    //         Quantity: 3,
    //         Price: 3000
    //     },
    //     // {
    //     //     itemId: 4,
    //     //     orderId: 0,
    //     //     itemName: 'Barang 1',
    //     //     quantity: 1,
    //     //     price: 1000
    //     // },
    //     // {
    //     //     itemId: 5,
    //     //     orderId: 0,
    //     //     itemName: 'Barang 2',
    //     //     quantity: 2,
    //     //     price: 2000
    //     // },
    //     // {
    //     //     itemId: 6,
    //     //     orderId: 0,
    //     //     itemName: 'Barang 3',
    //     //     quantity: 3,
    //     //     price: 3000
    //     // },
    // ])

    return (
        <View style={styles.root}>

            <View style={styles.header}>
                <Image style={styles.profileImage} source={{
                    uri: 'https://dummyimage.com/32x32/b81bb8/fff.png&text=A'
                }} />

                <Icon name="menu" size={32} color='white' />
            </View>

            <Text style={styles.title}>Sales Order Input</Text>

            <View style={styles.body}>

                <View style={styles.bodyTitle}>
                    <Text style={styles.bodyTitleLabel}>Detail Sales</Text>
                    <Button title="Add Item" color='green' onPress={() => {
                        setIsUpdate(false)
                        setItemId(Date.now())
                        setModalShown(true)
                    }} />
                </View>

                <FlatList
                    data={data}
                    renderItem={({ item }) => (<ProductItem
                        item={item}
                        onEdit={(item) => {
                            setIsUpdate(true)
                            setItemId(item.ItemId)
                            setInputName(item.ItemName)
                            setInputPrice(item.Price.toString())
                            setInputQty(item.Quantity)
                            setModalShown(true)
                        }}
                        onDelete={async (item) => {
                            await dispatch(deleteItems(item))
                            dispatch(getItems())
                        }} />
                    )}
                    keyExtractor={item => item.ItemId.toString()}
                    ItemSeparatorComponent={() => (<Divider />)}
                    scrollEnabled
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.listContainerStyle}
                />

                <View style={{ flex: 0, backgroundColor: 'white', padding: 16, marginHorizontal: -16, marginBottom: -16 }}>
                    <Text style={styles.totalLabel}>Order Summary</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                        <Text style={styles.totalLabel}>Sub total:</Text>
                        <Text style={styles.totalLabel}>{
                            data && data.map((d) => d.Price * d.Quantity)
                                .reduce((prev, curr) => prev = prev + curr, 0)
                        }</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.totalLabel}>Total Product:</Text>
                        <Text style={styles.totalLabel}>{
                            data && data.map((d) => d.Quantity)
                                .reduce((prev, curr) => prev = prev + curr, 0)
                        } Product</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 16 }}>
                        <Button title="Process order" color='green' onPress={nav.goBack} />
                        <Button title="Cancel" color='red' onPress={nav.goBack} />
                    </View>
                </View>
            </View>

            <Modal
                transparent
                // animationType="fade"
                visible={modalShown}
                onRequestClose={() => setModalShown(!modalShown)}>

                <KeyboardAvoidingView
                    behavior={'padding'}
                    style={styles.modalRoot}
                >

                    <Pressable
                        style={styles.modalBg}
                        onPress={hideDialog}
                    />

                    <View style={styles.modalBody}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...styles.bodyTitleLabel, textAlign: 'center' }}>New Item</Text>

                            <Text style={{ color: 'black' }}>Item Name</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setInputName}
                                value={inputName}
                            />

                            <Text style={{ color: 'black' }}>Price</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setInputPrice}
                                value={inputPrice}
                                keyboardType="numeric"
                            />

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: 'black' }}>QTY</Text>
                                <Pressable onPress={() => {
                                    if (inputQty > 0) setInputQty(inputQty - 1)
                                }}>
                                    <Icon name="remove" size={24} color='black' />
                                </Pressable>
                                <Text style={{ color: 'black', marginHorizontal: 8 }}>{`${inputQty}`}</Text>
                                <Pressable onPress={() => setInputQty(inputQty + 1)}>
                                    <Icon name="add" size={24} color='black' />
                                </Pressable>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 24 }}>
                                <Text style={styles.totalLabel}>Total:</Text>
                                <Text style={styles.totalLabel}>{`${parseInt(inputPrice) * inputQty}`}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Button title="Save" color='green' onPress={saveItem} />
                                <Button title="Cancel" color='red' onPress={cancelItem} />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}