import { createSlice } from "@reduxjs/toolkit";
export default createSlice({
    name: "thanhToan",
    initialState: {
        isLoading: false,
       
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