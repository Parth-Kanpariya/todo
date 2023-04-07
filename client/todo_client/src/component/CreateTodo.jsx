import React from 'react';
import { Form, Formik, Field } from 'formik';
import CustomInput from './CustomInput';
// import { jobInputSchema } from './jobInputSchema';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { createJobService } from '../../services/jobServices';
import { successToast, errorToast } from '../helper/ToastComponent';

function CreateTodo(props) {
  //   const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    props.onAdd(values);
    actions.resetForm();
    //   try {
    //     const resp = await createJobService(values);
    //     if (resp.status === 201) {
    //       successToast('Job created successfully!');
    //       await new Promise((resolve) => setTimeout(resolve, 1000));
    //       actions.resetForm();
    //     }
    //     navigate('/', { replace: true });
    //   } catch (error) {
    //     errorToast('Job is not created!');
    //   }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}></h2>
      <Formik
        initialValues={{
          description: ''
        }}
        onSubmit={onSubmit}
        // validationSchema={jobInputSchema}
      >
        {({ errors, touched }) => (
          <Form
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: '100%',
              justifyContent: 'center',
              marginTop: '20px',
              padding: 0
            }}>
            <Field
              style={{ width: '60%', height: '50px' }}
              name="description"
              type="text"
              placeholder="Add your tasks"
              component={CustomInput}
              errors={errors}
              touched={touched}
            />

            <Button
              style={{
                marginLeft: '20px',
                width: '10%',
                height: '50px',
                marginTop: 0,
                padding: 0
              }}
              type="submit"
              text="Add"
            />
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}

export default CreateTodo;
