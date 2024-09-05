import React from 'react';
import './Modal.css'; // Assuming you have some basic styles for the modal

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <p className="modal-message">{message}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm} className="modal-button confirm">Yes</button>
                    <button onClick={onClose} className="modal-button cancel">No</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
