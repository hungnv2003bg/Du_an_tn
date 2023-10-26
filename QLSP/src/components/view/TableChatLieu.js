import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {  getAllChatLieu } from '../../service/ChatLieuService';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import ModalEditChatLieu from '../edit/ModalEditChatLieu';
import ModalAddNewChatLieu from '../add/ModalAddChatLieu';
import _ from "lodash";
import ModalDeleteCL from '../delete/ModalDeleteCL';

const TableChatLieu = (props) => {

    const [listChatLieu, setListChatLieu] = useState([]);
    // const[totalChatLieu, setTotalChatLieu] = useState(0); 
    // const[totalPages, setTotalPages] = useState(0); 

    // lấy dữ liệu
    const [isShowMoDalAddNew, setIsShowMoDalAddNew ] = useState(false);

    // update
    const[isShowMoDalEdit, setIsShowMoDalEdit] = useState(false)
    const[dataChatLieuEdit, setDataChatLieuEdit] = useState({})

    //delete
    const[isShowMoDalDelete, setIsShowMoDalDelete] = useState(false)
    const[dataChatLieuDelete, setDataChatLieuDelete] = useState({})

    const handleClose=() =>{
      setIsShowMoDalAddNew(false)
      setIsShowMoDalEdit(false)
      setIsShowMoDalDelete(false)
    }


    useEffect(() =>{
        //call api
        getChatLieu();
        
    }, [])

    const getChatLieu = async () => {
        let res = await getAllChatLieu();
        //Dung if de neu data loi
        if(res && res.data){  
            setListChatLieu(res.data)
            // setTotalChatLieu(res.total)
            // setTotalPages(res.total)
        } 
      }
    // const handlePageClick = (event) => {
    //   getChatLieu(+event.selected + 1)

    // }



    const handleDeleteChatLieu = (cl) =>{
      setDataChatLieuDelete(cl);
      setIsShowMoDalDelete(true)
   
    }

    const handleDeleteSuccess = () => {
      // Cập nhật danh sách màu sắc sau khi xóa
        getChatLieu();

    }


    const handleEditCLFromModal = (ChatLieu) =>{
      let cloneListChatLieu = _.cloneDeep(listChatLieu);
      let index = listChatLieu.findIndex(item =>item.id === ChatLieu.id)
      cloneListChatLieu[index].maChatLieu = ChatLieu.maChatLieu;
      cloneListChatLieu[index].tenChatLieu = ChatLieu.tenChatLieu;
      cloneListChatLieu[index].ngayTao = ChatLieu.ngayTao;
      cloneListChatLieu[index].ngayCapNhat = ChatLieu.ngayCapNhat;

      setListChatLieu(cloneListChatLieu);

    }
    const handleEditChatLieu = (ChatLieu) =>{
      setDataChatLieuEdit(ChatLieu)
      setIsShowMoDalEdit(true)
    }
    return (<>
    
    <Table striped bordered hover >
      <thead>
        <tr>
          <th>ID</th>
          <th>Mã chất liệu</th>
          <th>Tên chất liệu</th>
          <th>Ngày tạo</th>
          <th>Ngày cập nhật</th>
          <th>Actions</th>
    
        </tr>
      </thead>
      <tbody>
        {listChatLieu && listChatLieu.length > 0 &&
            listChatLieu.map((item, index) =>{
            return(
                <tr key = {index}>
                    <td>{item.id}</td>
                    <td>{item.maChatLieu}</td>
                    <td>{item.tenChatLieu}</td>
                    <td>{item.ngayTao}</td>
                    <td>{item.ngayCapNhat}</td>
                    <td>
                      <button className='btn btn-warning mx-3' onClick={() =>handleEditChatLieu(item)}>Edit</button>
                      <button className='btn btn-danger' onClick={() =>handleDeleteChatLieu(item)}>Delete</button>
                    </td>
                </tr>
            )
        })
        }
        
      </tbody>
    </Table>
    {/* <ReactPaginate
        breakLabel="..."
        nextLabel="Sau >"
        onPageChange={handlePageClick}
        pageRangeDiChatLieulayed={5}
        pageCount={totalPages}
        previousLabel="< Trước"

        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
        
      /> */}

       <ModalAddNewChatLieu
          show = {isShowMoDalAddNew}
          handleClose = {handleClose}
        /> 

       <ModalEditChatLieu
            show = {isShowMoDalEdit}
            dataChatLieuEdit = {dataChatLieuEdit}
            handleClose={handleClose}
            handleEditCLFromModal = {handleEditCLFromModal}
        />  

        <ModalDeleteCL
        show = {isShowMoDalDelete}
        handleClose={handleClose}
        dataChatLieuDelete={dataChatLieuDelete}
        handleDeleteSuccess={handleDeleteSuccess}
        />


    </>)
}
export default TableChatLieu;