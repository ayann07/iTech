import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderItems: []
    },
    reducers: {
        setOrderItems: (state, action) => {
            state.orderItems = action.payload;
        },
        clearOrder: (state) => {
            state.orderItems = [];
        }
    }
});

export const { setOrderItems, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;


