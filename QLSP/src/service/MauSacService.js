import axios from './axios';


const getAllMauSac = (page) => {
    return axios.get(`http://localhost:8088/api/mau-sac/get-page/${page}`);   
}

const postCreateMS = (maMau, tenMau,ngayTao,ngayCapNhat) =>{
    return axios.post("http://localhost:8088/api/mau-sac/add",{
        maMau,
         tenMau,
         ngayTao,
         ngayCapNhat
        });
}

    const putUpdateMS = (id, maMau, tenMau, ngayTao, ngayCapNhat) => {
        return axios.put(`http://localhost:8088/api/mau-sac/update/${id}`, {
          maMau,
          tenMau,
          ngayTao,
          ngayCapNhat,
        });
      };

      const deleteMauSac = (id) => {
        return axios.delete(`http://localhost:8088/api/mau-sac/delete/${id}`)

      }



export {getAllMauSac, postCreateMS,putUpdateMS,deleteMauSac};