import { createSlice } from "@reduxjs/toolkit";
export default createSlice({
    name: "noti",
    initialState: {
    },
    reducers: {
        setApi: (state, action) => {
            state.noti = action.payload;
        }
    }
})