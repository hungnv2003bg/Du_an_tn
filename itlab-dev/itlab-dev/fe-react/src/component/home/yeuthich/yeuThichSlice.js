import { createSlice } from "@reduxjs/toolkit";
const INIT_DATA = [{
    id: 1,
    name: "Áo choàng póng tối",
    img: "https://routine.vn/media/catalog/product/cache/e78fcb931fd36e972f6051c94f188557/1/0/10f22jacw012_beige-ao-khoac-nu_4__2.jpg"
}]
export default createSlice({
    name: "yeuThich",
    initialState: INIT_DATA,
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload)
        }
    }
})