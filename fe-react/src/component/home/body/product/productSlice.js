import { createSlice } from "@reduxjs/toolkit";
import sapXepTheoGiaTien from "../../../../extensions/sapXepSanPham";
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
            state.pageSize = action.payload.data.pageSize;
            state.pageTotal = action.payload.data.pageTotal;
            state.pageItem = action.payload.data.pageItem;
            state.pageNumber = action.payload.data.pageNumber;
        },
        setSapXep: (state, action) => {
            state.data = sapXepTheoGiaTien([...action.payload.data], action.payload.type)
        }
    }
})