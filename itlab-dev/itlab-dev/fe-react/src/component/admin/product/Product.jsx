import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
function Product() {
  const language = useSelector(selectLanguage);
  return (
    <>
      <div className="body-container"></div>
    </>
  );
}

export default Product;
