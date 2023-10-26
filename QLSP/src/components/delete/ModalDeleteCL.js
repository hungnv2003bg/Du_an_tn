import {Modal, Button} from 'react-bootstrap';
import { deleteChatLieu, getAllChatLieu } from '../../service/ChatLieuService';
import { toast } from 'react-toastify';

const ModalDeleteCL = (props) =>{
    const {show, handleClose,dataChatLieuDelete,handleDeleteSuccess} = props;

    const confirmDeleteCL = async(id) => { 
      let res = await deleteChatLieu(id)
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
               {/* <b> Mã màu: {dataChatLieuSacDelete.maChatLieu} </b> */}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDeleteCL(dataChatLieuDelete.id)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        
        </>
    )
}
export default ModalDeleteCL;