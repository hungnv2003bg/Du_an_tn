import React from "react"; // Import React
import { Button } from "antd";
import ReactToPrint from "react-to-print";

const PrintButton = ({ invoiceRef }) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <ReactToPrint
        trigger={() => <Button type="link">In hóa đơn</Button>}
        content={() => invoiceRef.current}
      />
    </div>
  );
};

export default PrintButton;
