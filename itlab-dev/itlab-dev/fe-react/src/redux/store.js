import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "../language/languageSlice";
import notiSlice from "./notiSlice";
import productSlice from "../component/home/body/product/productSlice";
import userSlice from "../component/login/userSlice";

const store = configureStore({
    reducer: {
        language: languageSlice.reducer,
        noti: notiSlice.reducer,
        product: productSlice.reducer,
        user: userSlice.reducer
    }
});

export default store;