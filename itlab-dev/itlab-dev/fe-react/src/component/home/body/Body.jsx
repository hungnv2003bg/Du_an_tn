import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import Fillter from "./filter/Filter";
import Product from "./product/Product";
import userSlice from "../../login/userSlice";
function Body() {
  const language = useSelector(selectLanguage);
  const disPath = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    disPath(userSlice.actions.dangNhap(user.data))
  }
  return (
    <>
      <div className="header-banner">
        <img
          src="https://routine.vn/media/catalog/category/SALE_UP_TO_50_-_T1023_1__1.jpg"
          alt="anh"
        />
      </div>
      <div className="header-title">
        <h3>{language.header.title}</h3>
      </div>
      <div className="body-container">
        {/* <Fillter /> */}
        <Product />
      </div>
    </>
  );
}

export default Body;
