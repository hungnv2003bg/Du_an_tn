import axios from './axios';


const getAllBrand = () => {
    return axios.get('http://localhost:8088/api/brand/get-all');   
}

const postCreateBrand = (maBrand, tenBrand,ngayTao,ngayCapNhat) =>{
    return axios.post("http://localhost:8088/api/brand/add",{
        maBrand,
        tenBrand,
        ngayTao,
        ngayCapNhat
        });
}

    const putUpdateBrand = (id, maBrand, tenBrand, ngayTao, ngayCapNhat) => {
        return axios.put(`http://localhost:8088/api/brand/update/${id}`, {
          maBrand,
          tenBrand,
          ngayTao,
          ngayCapNhat,
        });
      };

      const deleteBrand= (id) => {
        return axios.delete(`http://localhost:8088/api/brand/delete/${id}`)

      }



export {getAllBrand, postCreateBrand,putUpdateBrand,deleteBrand};