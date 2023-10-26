import { useEffect,useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import { putUpdateMS } from '../../service/MauSacService';
import { toast } from 'react-toastify';


const ModalEditMauSac = (props) =>{
  const {show, handleClose, dataMauSacEdit, handleEditMSFromModal} = props;
  const [maMau,setMaMau] = useState("");
  const [tenMau,setTenMau] = useState("");
  const [ngayTao,setNgayTao] = useState("");
  const [ngayCapNhat,setNgayCapNhat] = useState("");
    
const handleEditMauSac = async(id) =>{
  let res = await putUpdateMS(id,maMau, tenMau,ngayTao,ngayCapNhat)
  if(res){
    handleEditMSFromModal({
      maMau: maMau,
      tenMau: tenMau,
      ngayTao: ngayTao,
      ngayCapNhat: ngayCapNhat,
      id: dataMauSacEdit.id
    })
    handleClose();
    toast.success("Update success")
  }
}
useEffect(() =>{
  if(show){
    setMaMau(dataMauSacEdit.maMau)
    setTenMau(dataMauSacEdit.tenMau)
    setNgayTao(dataMauSacEdit.ngayTao)
    setNgayCapNhat(dataMauSacEdit.ngayCapNhat)
  }

},[dataMauSacEdit])

    return(
        <>
         <Modal show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title>Edit màu sắc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                <div className="mb-3">

                <div className="mb-3">
                        <label className="form-label">Mã màu</label>
                        <input type="text" className="form-control" value={maMau} onChange={(event) => setMaMau(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tên màu</label>
                        <input type="text" className="form-control" value={tenMau} onChange={(event) => setTenMau(event.target.value)}  />
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
          <Button variant="primary" onClick={() => handleEditMauSac(dataMauSacEdit.id)}>
          {/* <Button variant="secondary" > */}
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

        </>
    )
}
export default ModalEditMauSac;