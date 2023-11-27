export type OrderItemProps = {
    OrderNo: string,
    CustomerName: string,
    OrderDate: string
}

export type ProductItemData = {
    ItemId: number,
    OrderId: number,
    ItemName: string,
    Quantity: number,
    Price: number
}

export type ProductItemProps = {
    item: ProductItemData,
    onEdit: Function | undefined,
    onDelete: Function | undefined
}

export type AppState = {
    token: string,
    orders: Array<OrderItemProps>,
    items: Array<ProductItemData>
}