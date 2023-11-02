import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './component/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import languageSlice from './language/languageSlice';
import { vi } from './language/vi';
import { en } from './language/en';
import { notification } from 'antd';
import notiSlice from './redux/notiSlice';
import { openNotification } from './plugins/notificationProvider';
import { selectLanguage } from './language/selectLanguage';
import { selectNotiApi } from './redux/selectNoti';
import NotFound from './component/notfound/NotFound';
import HomePage from './component/home/HomePage';
import DashBoard from './component/admin/dashboard/DashBoard';
import ProductDetail from './component/home/productdetail/ProductDetail';
import userSlice from './component/login/userSlice';
import { selectUser } from './component/login/selectUser';
import { useEffect } from 'react';

function App() {
  const dispath = useDispatch()
  const [api, contextHolder] = notification.useNotification();
  const notiApi = useSelector(selectNotiApi)
  const languageSystem = useSelector(selectLanguage)
  const disPath = useDispatch()
  useEffect(() => {
    let language = localStorage.getItem("language");
    if (language === null) {
      language = "vi";
      dispath(languageSlice.actions.setLanguage(vi))
      localStorage.setItem("language", "vi")
    } else {
      switch (language) {
        case "vi":
          dispath(languageSlice.actions.setLanguage(vi))
          break;
        case "en":
          dispath(languageSlice.actions.setLanguage(en))
          break;
        default:
      }
    }
    const user = localStorage.getItem('user');
    dispath(notiSlice.actions.setApi(api))
    if (user) {
      disPath(userSlice.actions.dangNhap(JSON.parse(user).data))
    }
  }, [])
  return (
    <>
      {contextHolder}
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/sanpham/:id" element={<ProductDetail />} />
      </Routes>
      {/* <button type="" onClick={() => {
        openNotification(languageSystem.systemNotification.system, languageSystem.systemNotification.disconnect, 'error', notiApi.noti)

      }}>sss</button> */}
    </>
  );
}

export default App;
