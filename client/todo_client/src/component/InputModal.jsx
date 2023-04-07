import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Form, Formik, Field } from 'formik';
import CustomInput, { CustomTextArea } from './CustomInput';
// import { jobInputSchema } from './jobInputSchema';

function InputModal(props) {
  const { title, description } = props.todoData;
  function handleUpdate(values, actions) {
    props.togglePopUp(values);
  }

  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Update Task</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              description: description
            }}
            onSubmit={handleUpdate}
            // validationSchema={jobInputSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="description"
                  label="Description"
                  component={CustomTextArea}
                  type="text"></Field>
                {/* <CustomButton type="submit" text="Update Job" /> */}
                <Button style={{ marginTop: '20px' }} color="primary" type="submit">
                  Update Task
                </Button>
                <Button style={{ marginTop: '20px' }} color="secondary" onClick={props.toggle}>
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={handleUpdate}>Update Job</Button>{' '} */}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default InputModal;
