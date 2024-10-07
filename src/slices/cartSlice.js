import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addCart:(state,action) => {
            state.cart = [...state.cart,action.payload]
        },
        removeCart:(state,action) => {
            state.cart = state.cart.filter((item)=>item.id !== action.payload)
        },
        incrementItem:(state,action) => {
            state.cart = state.cart.map((item)=>item.id === action.payload ? {...item,quantity:item.quantity + 1}:item)
        },
        decrementItem:(state,action) => {
            state.cart = state.cart.map((item)=>item.id === action.payload && item.quantity > 1? {...item,quantity:item.quantity - 1}:item)
        },
    }
})

export const {addCart, removeCart, incrementItem, decrementItem} = cartSlice.actions;

export default cartSlice.reducer;