import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrBarcodeScanner = () => {


  const [scanResult, setScanResult] = useState('');

  const onScanSuccess = (decodedText, decodedResult) => {
    console.log(`Code: ${decodedText}`, decodedResult);
    setScanResult(decodedText);
  };

  const onScanFailure = (error) => {
    console.warn(`Quét thất bại: ${error}`);
  };

  useEffect(() => {
    const html5QrCode = new Html5QrcodeScanner(
      "qr-reader", 
      { fps: 10, qrbox: 250 },
      false
    );
    html5QrCode.render(onScanSuccess, onScanFailure);
  
    return () => {
      html5QrCode.clear(); 
    };
  }, []);

  return (
    <div>
      <div id="qr-reader" style={{ width: '500px', height: '500px' }}></div>
      {scanResult && <p>Kết quả: {scanResult}</p>}
    </div>
  );
};

export default QrBarcodeScanner;