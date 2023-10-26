import {Modal, Button} from 'react-bootstrap';
import { deleteMauSac, getAllMauSac } from '../../service/MauSacService';
import { toast } from 'react-toastify';

const ModalDeleteMS = (props) =>{
    const {show, handleClose,dataMauSacDelete,handleDeleteSuccess} = props;

    const confirmDelete = async(id) => { 
      let res = await deleteMauSac(id)
      if(res){
        handleDeleteSuccess();
        handleClose();
        toast.success("Delete success")

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
          <Modal.Title>Delete Màu sắc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                Bạn chắc chắn muốn xóa ?
                <br/>
               <b> Mã màu: {dataMauSacDelete.maMau} </b>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete(dataMauSacDelete.id)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        
        </>
    )
}
export default ModalDeleteMS;