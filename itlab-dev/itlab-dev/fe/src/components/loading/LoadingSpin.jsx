import React from "react";
import loading from "../../assets/css/loading.module.css";
const LoadingSpin = () => {
    return (
        <div className={loading.loadingOverlay}>
            <div className={loading.spinner}></div>
        </div>
    );
};

export default LoadingSpin;
