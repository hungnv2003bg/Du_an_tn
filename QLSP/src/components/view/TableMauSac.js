import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {  getAllMauSac } from '../../service/MauSacService';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import ModalEditMauSac from '../edit/ModalEditMauSac';
import ModalAddNewMauSac from '../add/ModalAddMauSac';
import _ from "lodash";
import ModalDeleteMS from '../delete/ModalDeleteMS';

const TableMauSac = (props) => {

    const [listMauSac, setListMauSac] = useState([]);
    const[totalMauSac, setTotalMauSac] = useState(0); 
    const[totalPages, setTotalPages] = useState(0); 

    // lấy dữ liệu
    const [isShowMoDalAddNew, setIsShowMoDalAddNew ] = useState(false);

    // update
    const[isShowMoDalEdit, setIsShowMoDalEdit] = useState(false)
    const[dataMauSacEdit, setDataMauSacEdit] = useState({})

    //delete
    const[isShowMoDalDelete, setIsShowMoDalDelete] = useState(false)
    const[dataMauSacDelete, setDataMauSacDelete] = useState({})

    const handleClose=() =>{
      setIsShowMoDalAddNew(false)
      setIsShowMoDalEdit(false)
      setIsShowMoDalDelete(false)
    }



    useEffect(() =>{
        //call api
        getMauSac(0);
        
    }, [])

    const getMauSac = async (page) => {
        let res = await getAllMauSac(page);

        //Dung if de neu data loi
         if( res && res.data){  
           console.log("check 1",res)
           setListMauSac(res.data.content)
             setTotalMauSac(res.totalElements)
             setTotalPages(res.data.totalPages)
            // setTotalPages(res.total)
         } 
      }
      console.log("check 2", listMauSac)

    const handlePageClick = (event) => {
      getMauSac(+event.selected )

    }



    const handleDeleteMauSac = (ms) =>{
      setDataMauSacDelete(ms);
      setIsShowMoDalDelete(true)
   
    }

    const handleDeleteSuccess = () => {
      // Cập nhật danh sách màu sắc sau khi xóa
        getMauSac();

    }


    const handleEditMSFromModal = (MauSac) =>{
      let cloneListMauSac = _.cloneDeep(listMauSac);
      let index = listMauSac.findIndex(item =>item.id === MauSac.id)
      cloneListMauSac[index].maMau = MauSac.maMau;
      cloneListMauSac[index].tenMau = MauSac.tenMau;
      cloneListMauSac[index].ngayTao = MauSac.ngayTao;
      cloneListMauSac[index].ngayCapNhat = MauSac.ngayCapNhat;

      setListMauSac(cloneListMauSac);

    }
    const handleEditMauSac = (MauSac) =>{
      setDataMauSacEdit(MauSac)
      setIsShowMoDalEdit(true)
    }
    return (<>
    
    <Table striped bordered hover >
      <thead>
        <tr>
          <th>ID</th>
          <th>Mã màu</th>
          <th>Tên màu</th>
          <th>Ngày tạo</th>
          <th>Ngày cập nhật</th>
          <th>Actions</th>
    
        </tr>
      </thead>
      <tbody>
        {listMauSac && listMauSac.length > 0 &&
            listMauSac.map((item, index) =>{
            return(
                <tr key = {index}>
                    <td>{item.id}</td>
                    <td>{item.maMau}</td>
                    <td>{item.tenMau}</td>
                    <td>{item.ngayTao}</td>
                    <td>{item.ngayCapNhat}</td>
                    <td>
                      <button className='btn btn-warning mx-3' onClick={() =>handleEditMauSac(item)}>Edit</button>
                      <button className='btn btn-danger' onClick={() =>handleDeleteMauSac(item)}>Delete</button>
                    </td>
                </tr>
            )
        })
        }
        
      </tbody>
    </Table>
    <ReactPaginate
        breakLabel="..."
        nextLabel="Sau >"
        onPageChange={handlePageClick}
        pageRangeDiMauSaclayed={5}
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
        
      />

       <ModalAddNewMauSac
          show = {isShowMoDalAddNew}
          handleClose = {handleClose}
        /> 

       <ModalEditMauSac
            show = {isShowMoDalEdit}
            dataMauSacEdit = {dataMauSacEdit}
            handleClose={handleClose}
            handleEditMSFromModal = {handleEditMSFromModal}
        />  

        <ModalDeleteMS
        show = {isShowMoDalDelete}
        handleClose={handleClose}
        dataMauSacDelete={dataMauSacDelete}
        handleDeleteSuccess={handleDeleteSuccess}
        />


    </>)
}
export default TableMauSac;