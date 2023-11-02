import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import MenuAdmin from "../layout/menu/MenuAdmin";
import Header from "../layout/header/Header";
function DashBoard() {
  const language = useSelector(selectLanguage);
  return (
    <>
      <div>
        <Header />
        <MenuAdmin />
        <div className="dashboard-container">
          <div className="content">sss</div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
