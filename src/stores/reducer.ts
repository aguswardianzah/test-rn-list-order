import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState, OrderItemProps } from "../types";
import { apiRequest } from "../utils/api";
import { RootState } from "./store";

const initState: AppState = {
    token: '',
    orders: [],
    items: []
}

export const getOrder = createAsyncThunk(
    'fetchOrder', 
    async () => apiRequest.get('Order/GetOrderList')
)

export const getItems = createAsyncThunk(
    'fetchItems', 
    async () => apiRequest.get('Order/GetItems', {
        headers: {
            state: '12345'
        }
    })
)

export const createItems = createAsyncThunk(
    'createItems', 
    async (payload) => apiRequest.post('Order/CreateItem', payload, {
        headers: {
            state: '12345'
        }
    })
)

export const updateItems = createAsyncThunk(
    'updateItems', 
    async (payload) => apiRequest.post('Order/UpdateItem', payload, {
        headers: {
            state: '12345'
        }
    })
)

export const deleteItems = createAsyncThunk(
    'deleteItems', 
    async (payload) => apiRequest.post('Order/DeleteItem', payload, {
        headers: {
            state: '12345'
        }
    })
)

export const storeSlice = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setOrder: (state, action) => {
            state.orders = action.payload
        },
        setItems: (state, action) => {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOrder.pending, (state) => {
            state.orders = []
        })

        builder.addCase(getOrder.fulfilled, (state, action) => {
            if (!action.payload.error)
                state.orders = action.payload ?? []
        })

        builder.addCase(getItems.pending, (state) => {
            state.items = []
        })

        builder.addCase(getItems.fulfilled, (state, action) => {
            if (!action.payload.error)
                state.items = action.payload
        })
    }
})

export const { setToken, setOrder, setItems } = storeSlice.actions
export const storeToken = (state: RootState) => state.data.token
export default storeSlice.reducer