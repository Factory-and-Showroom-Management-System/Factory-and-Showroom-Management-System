import React from 'react';

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <p style={messageStyle}>{message}</p>
        <button style={buttonStyle} onClick={onConfirm}>Confirm</button>
        <button style={buttonStyle} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

const modalStyle = {
  position: 'fixed',
  top: 10,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', /* semi-transparent black overlay */
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '50px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};

const messageStyle = {
  color: 'black',
  fontSize: '18px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  

};

const buttonStyle = {
  marginTop: '20px',
  marginRight: '12px',
  marginLeft: '12px',
  padding: '10px 20px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: '#f0f0f0',
  transition: 'background-color 0.3s ease',
};




export default Modal;
