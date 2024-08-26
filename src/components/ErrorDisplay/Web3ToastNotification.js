import React, { useState, useEffect } from 'react';

// Styles
const styles = `
  .toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
  .toast {
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px 15px;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 200px;
  }
  .toast-close {
    background: none;
    border: none;
    color: #721c24;
    cursor: pointer;
    font-size: 20px;
    line-height: 1;
    padding: 0;
    margin-left: 10px;
  }
  .toast-close:before {
    content: '\\00d7'; /* Unicode for '×' */
  }
  .button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 4px;
    cursor: pointer;
  }
  .button:hover {
    background-color: #0056b3;
  }
`;

export const Web3ToastNotification = ({ showToast = false,  toastMessage =''}) => {
  //console.log('Rendering toast:', { showToast, toastMessage }); // Add this log

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (showToast && toastMessage) {
      addToast(toastMessage);
    }
  }, [showToast, toastMessage]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message }]);
    setTimeout(() => removeToast(id), 5000); // Auto-remove after 5 seconds
  };

  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast">
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="toast-close"></button>
          </div>
        ))}
      </div>
    </>
  );
};

