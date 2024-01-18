import React, { useEffect, useState, useCallback } from "react";

import "./style.css";
import { useDashBoardStore } from "./useDashBoardStore";
import { fixMoney } from "../../../extensions/fixMoney";

function DoanhSoNgay() {
    const [data, setData] = useState(undefined)
    async function handleLayDoanhSoNgay() {
        const data = await useDashBoardStore.actions.layDoanhSoNgay()
        setData(data.data)
    }
    useEffect(() => {
        handleLayDoanhSoNgay()
    }, [])
    return (
        <>
            <h5>Doanh thu hôm nay: {data && fixMoney(data)}</h5>
        </>
    );
}

export default DoanhSoNgay;
