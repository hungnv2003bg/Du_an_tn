import { createSlice } from "@reduxjs/toolkit";
const INIT_PRODUCT = {
    isLoading: true,
    data: [{}, {}, {}, {}, {}],
    pageSize: 5,
    pageTotal: 0,
    pageItem: 4,
    pageNumber: 1
}
export default createSlice({
    name: "product",
    initialState: INIT_PRODUCT,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setSanPham: (state, action) => {
            state.data = action.payload.data.data;
            state.pageSize = action.payload.pageSize;
            state.pageTotal = action.payload.pageTotal;
            state.pageItem = action.payload.pageItem;
            state.pageNumber = action.payload.pageNumber;
        }
    }
})