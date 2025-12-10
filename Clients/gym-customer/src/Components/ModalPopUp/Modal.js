import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onConfirm, message, isLoading = false }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <p className="modal-message">{message}</p>
                <div className="modal-buttons">
                    <button 
                        onClick={onConfirm} 
                        className="modal-button confirm"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Please wait...' : 'Yes'}
                    </button>
                    <button 
                        onClick={onClose} 
                        className="modal-button cancel"
                        disabled={isLoading}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
