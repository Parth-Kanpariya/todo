import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './customModal.css';

function CustomModal(props) {
  // const [modal, setModal] = useState(true);

  // const toggle = () => setModal(!modal);
  const handleClick = (e) => {
    props.onDeleteOrUpdate(props.actionButton);
  };

  return (
    <div>
      <Modal className="custom-modal-style" isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>{props.actionButton} task</ModalHeader>
        <ModalBody>{props.description}</ModalBody>
        <ModalFooter>
          <Button style={{ width: '100px', color: 'wheat' }} color="primary" onClick={handleClick}>
            {props.actionButton}
          </Button>{' '}
          <Button
            style={{ width: '100px' }}
            color="secondary"
            name="delete"
            onClick={(e) => props.toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CustomModal;
