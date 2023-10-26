import { useEffect,useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import { putUpdateCL } from '../../service/ChatLieuService';
import { toast } from 'react-toastify';


const ModalEditChatLieu = (props) =>{
  const {show, handleClose, dataChatLieuEdit, handleEditCLFromModal} = props;
  const [maChatLieu,setMaChatLieu] = useState("");
  const [tenChatLieu,setTenChatLieu] = useState("");
  const [ngayTao,setNgayTao] = useState("");
  const [ngayCapNhat,setNgayCapNhat] = useState("");
    
const handleEditChatLieu = async(id) =>{
  let res = await putUpdateCL(id,maChatLieu, tenChatLieu,ngayTao,ngayCapNhat)
  if(res){
    handleEditCLFromModal({
      maChatLieu: maChatLieu,
      tenChatLieu: tenChatLieu,
      ngayTao: ngayTao,
      ngayCapNhat: ngayCapNhat,
      id: dataChatLieuEdit.id
    })
    handleClose();
    toast.success("Update success")
  }
}
useEffect(() =>{
  if(show){
    setMaChatLieu(dataChatLieuEdit.maChatLieu)
    setTenChatLieu(dataChatLieuEdit.tenChatLieu)
    setNgayTao(dataChatLieuEdit.ngayTao)
    setNgayCapNhat(dataChatLieuEdit.ngayCapNhat)
  }

},[dataChatLieuEdit])

    return(
        <>
         <Modal show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title>Edit chất liệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                <div className="mb-3">

                <div className="mb-3">
                        <label className="form-label">Mã chất liệu</label>
                        <input type="text" className="form-control" value={maChatLieu} onChange={(event) => setMaChatLieu(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tên chất liệu</label>
                        <input type="text" className="form-control" value={tenChatLieu} onChange={(event) => setTenChatLieu(event.target.value)}  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ngày tạo</label>
                        <input type="date" className="form-control" value={ngayTao} onChange={(event) => setNgayTao(event.target.value)}  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ngày cập nhật</label>
                        <input type="date" className="form-control" value={ngayCapNhat} onChange={(event) => setNgayCapNhat(event.target.value)}  />
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handleEditChatLieu(dataChatLieuEdit.id)}>
          {/* <Button variant="secondary" > */}
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

        </>
    )
}
export default ModalEditChatLieu;