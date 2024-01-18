import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../language/selectLanguage";
import Header from "../common/header/Header";
import Body from "./body/Body";
import Footer from "./footer/footer";
function HomePage() {
  const language = useSelector(selectLanguage);
  return (
    <>
      <Header />
      <Body />
      <Footer/>
    </>
  );
}

export default HomePage;
