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

export const Web3ToastNotification = ({ showError = false, errorMessage =''}) => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (showError && errorMessage) {
      addToast(errorMessage);
    }
  }, [showError, errorMessage]);

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

// Example usage
const ExampleApp = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const triggerError = (message) => {
    setErrorMessage(message);
    setShowError(true);
    // Reset showError after a brief delay to allow for repeated triggers
    setTimeout(() => setShowError(false), 100);
  };

  return (
    <div>
      <Web3ToastNotification showError={showError} errorMessage={errorMessage} />
      <button className="button" onClick={() => triggerError('Transaction failed. Please try again.')}>
        Show Transaction Error
      </button>
      <button className="button" onClick={() => triggerError('Network error. Check your connection.')}>
        Show Network Error
      </button>
      <button className="button" onClick={() => triggerError('Insufficient funds for gas fee.')}>
        Show Gas Fee Error
      </button>
    </div>
  );
};

export default ExampleApp;