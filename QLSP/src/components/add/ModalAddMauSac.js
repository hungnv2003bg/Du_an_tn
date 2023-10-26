import { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap';
import { postCreateMS } from '../../service/MauSacService';
import {  toast } from 'react-toastify';


const ModalAddNewMauSac = (props) =>{
    const {show, handleClose} = props;
    const [maMau,setMaMau] = useState("");
    const [tenMau,setTenMau] = useState("");
    const [ngayTao,setNgayTao] = useState("");
    const [ngayCapNhat,setNgayCapNhat] = useState("");



    const handleSaveMauSac = async () =>{
        let res = await postCreateMS(maMau,tenMau,ngayTao,ngayCapNhat);
        if(res ){
            handleClose();
            setMaMau('');
            setTenMau('');
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
                        <label className="form-label">Mã màu</label>
                        <input type="text" className="form-control" value={maMau} onChange={(event) => setMaMau(event.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label className="form-label">Tên màu</label>
                        <input type="text" className="form-control" value={tenMau} onChange={(event) => setTenMau(event.target.value)}  />
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
          <Button variant="primary" onClick={() => handleSaveMauSac()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
        
        </>
    )
}
export default ModalAddNewMauSac;