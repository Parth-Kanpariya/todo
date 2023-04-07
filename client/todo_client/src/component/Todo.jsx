/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardText } from 'reactstrap';
import Icon from './Icon';
import CustomModal from './CustomModal';
import InputModal from './InputModal';

function Todo(props) {
  const { description, todo_id, completed } = props.todoData;
  const [showInputModal, setShowInputModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [descriptionPopUp, setDescriptionPopUp] = useState('');
  const [dataToUpdate, setDataToUpdate] = useState({});
  const [isStriked, setIsStriked] = useState(true);
  const handleInputModal = (e) => {
    setShowInputModal(!showInputModal);
  };
  const handleUpdatePopUp = (data) => {
    setDescriptionPopUp('Are you sure about values?');
    setModalActionButton('Confirm');
    setShowModal(true);
    setDataToUpdate(data);
  };
  const [modalActionButton, setModalActionButton] = useState('');
  const handleDeleteClick = (e) => {
    props.onDelete(todo_id);
  };
  const handleToggle = (e) => {
    setShowModal(!showModal);
  };
  const handleCheck = async (e) => {
    setIsStriked(!isStriked);
    console.log(isStriked);
    props.onUpdate({ completed: isStriked }, todo_id);
    console.log(isStriked);
  };
  const handleUpdateClick = (e) => {
    setShowInputModal(true);
  };
  const handleDeleteUpdateItem = (args) => {
    if (args === 'Delete') {
    } else if (args === 'Confirm') {
      props.onUpdate(dataToUpdate, todo_id);
      setShowInputModal(!true);
      setShowModal(!showModal);
    }
  };
  return (
    <Card style={{ margin: '20px', width: '100%' }}>
      <CardBody style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardBody style={{ width: '70%', textAlign: 'left' }}>
          <CardText
            style={{
              fontWeight: 'bold',
              fontSize: '20px',
              textDecoration: completed ? 'line-through' : 'none'
            }}>
            {description}
          </CardText>
        </CardBody>

        <CardBody>
          <Icon
            style={{ marginLeft: '5px', color: 'blue', cursor: 'pointer' }}
            name="Check"
            onClick={handleCheck}
            icon={isStriked === false ? 'faXmark' : 'faCheck'}
            size={'1x'}
            fixedWidth
          />
          <Icon
            style={{ marginLeft: '5px', color: 'blue', cursor: 'pointer' }}
            name="Update"
            onClick={handleUpdateClick}
            icon={'faPenToSquare'}
            size={'1x'}
            fixedWidth
          />
          <Icon
            style={{ marginLeft: '5px', color: 'red', cursor: 'pointer' }}
            name="delete"
            onClick={handleDeleteClick}
            icon={'faTrash'}
            size={'1x'}
            fixedWidth
          />
        </CardBody>
      </CardBody>

      <CustomModal
        onDeleteOrUpdate={handleDeleteUpdateItem}
        isOpen={showModal}
        toggle={handleToggle}
        description={descriptionPopUp}
        actionButton={modalActionButton}
      />
      <InputModal
        todoData={props.todoData}
        toggle={handleInputModal}
        togglePopUp={handleUpdatePopUp}
        isOpen={showInputModal}
      />
    </Card>
  );
}

export default Todo;
