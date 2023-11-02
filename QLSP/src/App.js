import './App.scss';
import TableMauSac from './components/view/TableMauSac';
import TableChatLieu from './components/view/TableChatLieu';
import Container from 'react-bootstrap/Container';
import {Row} from 'react-bootstrap';
import ModalAddNewMauSac from './components/add/ModalAddMauSac';
import ModalAddNewChatLieu from './components/add/ModalAddChatLieu';
// import ModalAddNewChatLieu from './components/add/ModalAddNewChatLieu';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
function App() {

  const [isShowMoDalAddNewMauSac,setIsShowMoDalAddNewMauSac] = useState(false)
  const [isShowMoDalAddNewChatLieu,setIsShowMoDalAddNewChatLieu] = useState(false)

  const handleClose = () =>{
    setIsShowMoDalAddNewMauSac(false)
    setIsShowMoDalAddNewChatLieu(false)

  }

  return (
    <>
    <div className='app-container'>
        <Container>
          <div className='my-3 add-new'>
            <span><b>Danh sách thông tin</b></span>
            <button className='btn btn-success' onClick={() => setIsShowMoDalAddNewMauSac(true) }>Thêm mới</button>
          </div>
          {/* <TableChatLieu /> */}
          <TableMauSac />
        </Container>

        <ModalAddNewMauSac
        show={isShowMoDalAddNewMauSac}
        handleClose={handleClose}
        /> 

        <ModalAddNewChatLieu
        show={isShowMoDalAddNewChatLieu}
        handleClose={handleClose}
        /> 


    </div>

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
/>
    </>
  );
}

export default App;
