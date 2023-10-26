import { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {postCreateCL} from '../../service/ChatLieuService'
import {  toast } from 'react-toastify';


const ModalAddNewChatLieu = (props) =>{
    const {show, handleClose} = props;
    const [maChatLieu,setmaChatLieu] = useState("");
    const [tenChatLieu,setTenChatLieu] = useState("");
    const [ngayTao,setNgayTao] = useState("");
    const [ngayCapNhat,setNgayCapNhat] = useState("");



    const handleSaveChatLieu = async () =>{
        let res = await postCreateCL(maChatLieu,tenChatLieu,ngayTao,ngayCapNhat);
        if(res ){
            handleClose();
            setmaChatLieu('');
            setTenChatLieu('');
            setNgayTao('');
            setNgayCapNhat('');
            toast.success("Succes!")
            window.location.reload();
            //success
        }
    }
    

    return(
        <>
         <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                <div className="mb-3">

                    <div className="mb-3">
                        <label className="form-label">Mã chất liệu</label>
                        <input type="text" className="form-control" value={maChatLieu} onChange={(event) => setmaChatLieu(event.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label className="form-label">Tên chất liệu</label>
                        <input type="text" className="form-control" value={tenChatLieu} onChange={(event) => setTenChatLieu(event.target.value)}  />
                    </div>
                    <div class="mb-3">
                        <label className="form-label">Ngày tạo</label>
                        <input type="date" className="form-control" value={ngayTao} onChange={(event) => setNgayTao(event.target.value)}  />
                    </div>
                    <div class="mb-3">
                        <label className="form-label">Ngày cập nhật</label>
                        <input type="date" className="form-control" value={ngayCapNhat} onChange={(event) => setNgayCapNhat(event.target.value)}  />
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveChatLieu()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
        
        </>
    )
}
export default ModalAddNewChatLieu;