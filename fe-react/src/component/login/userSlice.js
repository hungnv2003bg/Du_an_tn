import { createSlice } from "@reduxjs/toolkit";
export default createSlice({
    name: "user",
    initialState: {
        token: "",
        quyenList: [''],
        nguoiDung: { id: -1 }
    },
    reducers: {
        dangNhap: (state, action) => {
            localStorage.setItem("token", action.payload.token)
            state.token = action.payload.token
            state.quyenList = action.payload.quyenList
            state.nguoiDung = action.payload.nguoiDung
        }
    }
})