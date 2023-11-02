import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2"

const ShopSearch = ({ setFilterSortName }) => {
    const [dataInput, setDataInput] = useState("");

    const handleInputChange = (e) => {
        setDataInput(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault(); // Ngăn chặn việc gửi form và reload trang
        setFilterSortName(dataInput);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Ngăn chặn việc gửi form và reload trang
            handleSearch(e); // Gọi hàm tìm kiếm khi bấm Enter
        }
    };

    const resetData = () => {
        setFilterSortName("");
        setDataInput("");
    };

    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Tìm kiếm sản phẩm</h4>
            <div className="pro-sidebar-search mb-50 mt-25">
                <form className="pro-sidebar-search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Nhập tên sản phẩm"
                        value={dataInput}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button type="button" onClick={resetData}>
                        <HiOutlineXMark />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShopSearch;
