import  { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table ,FloatButton } from 'antd';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const RapportAdmin = () => {
  const [RapportAdmin, setRapportAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userId = currentUser.user_id;
  const pdfRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/rapportAdmin`);
        setRapportAdmin(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du rapport', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgx = (pdfWidth - imgWidth * ratio) / 2;
      const imgy = 30;
      pdf.addImage(imgData, 'PNG', imgx, imgy, imgWidth * ratio, imgHeight * ratio);
      pdf.save('RapportAdmin.pdf');
    });
  };

  const columns = [
    {
      title: <strong>Usrname</strong>,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: <strong>Car ID</strong>,
      dataIndex: 'car_id',
      key: 'car_id',
    },
    {
      title: <strong>Event</strong>,
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: <strong>Timestamp</strong>,
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px',
        }}
        ref={pdfRef}
      >
        <h1 style={{ marginBottom: '30px', textAlign: 'center', fontWeight: 'bold' , fontSize: '24px' }}>Report</h1>
        <Table dataSource={RapportAdmin} columns={columns} loading={loading} />
      </div>
      <div style={{ textAlign: 'center' }}>
        {/* <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          
          onClick={downloadPDF}
        >
          Télécharger le rapport en PDF
        </button> */}
        <FloatButton.BackTop visibilityHeight={0} onClick={downloadPDF}/> 

      </div>
    </div>
  );
};

export default RapportAdmin;