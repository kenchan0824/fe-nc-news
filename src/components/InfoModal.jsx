import Modal from 'react-modal';

function InfoModal({ title, message, isOpen, setIsOpen }) {
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      ariaHideApp={false}
    >
      <h3 className="modal-header">{title}</h3>
      <div className="modal-message">{message}</div>
    </Modal>
  ); 
}

export default InfoModal;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: 'min(400px, 70%)',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
    padding: '20px',
    paddingBottom: '50px',
  },
  overlay: {
    backgroundColor: 'rgba(68, 68, 68, 0.8)'
  },
};
