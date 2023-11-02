import { createSlice } from "@reduxjs/toolkit";
import { vi } from "./vi";
export default createSlice({
    name: "language",
    initialState: { language: vi },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
})