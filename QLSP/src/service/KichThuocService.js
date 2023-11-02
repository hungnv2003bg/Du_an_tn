import axios from './axios';


const getAllKichThuoc = () => {
    return axios.get('http://localhost:8088/api/kich-thuoc/get-all');   
}

const postCreateKT = (maKichThuoc, tenKichThuoc,ngayTao,ngayCapNhat) =>{
    return axios.post("http://localhost:8088/api/kich-thuoc/add",{
        maKichThuoc,
         tenKichThuoc,
         ngayTao,
         ngayCapNhat
        });
}

    const putUpdateKT = (id, maKichThuoc, tenKichThuoc, ngayTao, ngayCapNhat) => {
        return axios.put(`http://localhost:8088/api/kich-thuoc/update/${id}`, {
          maKichThuoc,
          tenKichThuoc,
          ngayTao,
          ngayCapNhat,
        });
      };

      const deleteKichThuoc = (id) => {
        return axios.delete(`http://localhost:8088/api/kich-thuoc/delete/${id}`)

      }



export {getAllKichThuoc, postCreateKT,putUpdateKT,deleteKichThuoc};