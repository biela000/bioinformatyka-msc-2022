import { createSlice } from "@reduxjs/toolkit";
//TODO: Add protein type or class

export const proteinSlice = createSlice({
    name: "protein",
    initialState: {},
    reducers: {
        addProtein: (state, action) => {
            //TODO: Add code to protein translation, Changing T to U for DNA
            state = action.payload;
        },
        deleteProtein: (state, action) => {
            state = {}
        }
    }
})

export const {addProtein, deleteProtein} = proteinSlice.actions
export default proteinSlice.reducer
