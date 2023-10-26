import axios from './axios';


const getAllChatLieu = () => {
    return axios.get('http://localhost:8088/api/chat-lieu/get-all');   
}

const postCreateCL = (maChatLieu, tenChatLieu,ngayTao,ngayCapNhat) =>{
    return axios.post("http://localhost:8088/api/chat-lieu/add",{
        maChatLieu,
        tenChatLieu,
        ngayTao,
        ngayCapNhat
        });
}

    const putUpdateCL = (id, maChatLieu, tenChatLieu, ngayTao, ngayCapNhat) => {
        return axios.put(`http://localhost:8088/api/chat-lieu/update/${id}`, {
          maChatLieu,
          tenChatLieu,
          ngayTao,
          ngayCapNhat,
        });
      };

      const deleteChatLieu = (id) => {
        return axios.delete(`http://localhost:8088/api/chat-lieu/delete/${id}`)

      }



export {getAllChatLieu, postCreateCL,putUpdateCL,deleteChatLieu};