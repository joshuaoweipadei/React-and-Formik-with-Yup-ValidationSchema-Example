import React from 'react';
import { Container, Row, Col, FormText } from 'reactstrap'; // Reactstrap for responsive layout
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function App() {
  const initialValues = {
    firstName: '',
    lastName: '',
    gender: '',
    amount: '',
    mobile: '',
    department: '',
    email: '',
    password: '',
    verifyPassword: '',
    acceptTermsAndConditions: false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[a-zA-Z]*$/, 'Invalid character')
      .min(3, 'First name must be at least 3 characters')
      .max(25, 'Maximum of 25 characters')
      .required('First Name is required'),
    lastName: Yup.string()
      .matches(/^[a-zA-Z]*$/, 'Invalid character')
      .min(3, 'Last name must be at least 3 characters')
      .max(25, 'Maximum of 25 characters')
      .required('Last Name is required'),
    gender: Yup.string()
      .required('Gender is required'),
    amount: Yup.number()
      .max(99000000, 'Max is $99,000,000')
      .min(10000, 'Min is $10,000')
      .integer()
      .required("Amount is required"),
    mobile: Yup.string()
      .matches(/^[+]234[ ]*[0-9]{10}$/, 'Mobile number is not valid') //
      .required('Mobile number is required'),
    department: Yup.string()
      .required('Department is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    verifyPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTermsAndConditions: Yup.bool()
      .oneOf([true], 'Accept Terms & Conditions is required')
  });

  function onSubmit(fields, { setSubmitting }) {
    alert(JSON.stringify(fields, null, 2));
    setSubmitting(false)
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md="10" lg="8" className="m-auto">
            <div className="mt-5">
              <h3 className="text-center">React and Formik with Yup Validation Schema Example</h3>
              <p>This also includes radio, checkbox and selection input validations.</p>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ values, errors, touched, setFieldValue, submitCount, handleReset, dirty, isSubmitting }) => (
                  <Form>
                    <div className="card-body">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>First Name</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Last Name</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Gender</label>
                          <div className="form-check ml-1">
                            <Field render={() => (
                              <>
                                <div className="d-inline mr-5">
                                  <input
                                    id="radio-a1"
                                    type="radio"
                                    name="gender"
                                    checked={values.gender === "male"}
                                    onChange={() => setFieldValue("gender", "male")}
                                    className={'form-check-input ' + (errors.gender && touched.gender ? ' is-invalid' : '')}
                                  />
                                  <label htmlFor="radio-a1" className="form-check-label">Male</label>
                                </div>
                                <div className="d-inline">
                                  <input
                                    id="radio-a2"
                                    type="radio"
                                    name="gender"
                                    checked={values.gender === "female"}
                                    onChange={() => setFieldValue("gender", "female")}
                                    className={'form-check-input ' + (errors.gender && touched.gender ? ' is-invalid' : '')}
                                  />
                                  <label htmlFor="radio-a2" className="form-check-label">Female</label>
                                  <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                                </div>
                              </>
                            )} />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <label>Amount</label>
                          <Field name="amount" type="number" className={'form-control' + (errors.amount && touched.amount ? ' is-invalid' : '')} />
                          <ErrorMessage name="amount" component="div" className="invalid-feedback" />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Mobile No.</label>
                          <Field name="mobile" type="text" className={'form-control' + (errors.mobile && touched.mobile ? ' is-invalid' : '')} placeholder="+234 9077444485" />
                          <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Department</label>
                          <Field name="department" as="select" className={'form-control' + (errors.department && touched.department ? ' is-invalid' : '')} >
                            <option value=""></option>
                            <option value="Software Web Developer">Software Web Developer</option>
                            <option value="Front-End Web Designer">Front-End Web Designer</option>
                            <option value="System Consultant">System Consultant</option>
                          </Field>
                          <ErrorMessage name="department" component="div" className="invalid-feedback" />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label>Email address</label>
                          <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                          <FormText className="font-italic">Enter any email address</FormText>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Password</label>
                          <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                          <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Confirm Password</label>
                          <Field name="verifyPassword" type="password" className={'form-control' + (errors.verifyPassword && touched.verifyPassword ? ' is-invalid' : '')} />
                          <ErrorMessage name="verifyPassword" component="div" className="invalid-feedback" />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="form-check">
                          <Field type="checkbox" name="acceptTermsAndConditions" id="checkbox-a1" className={'form-check-input ' + (errors.acceptTermsAndConditions && touched.acceptTermsAndConditions ? ' is-invalid' : '')} />
                          <label htmlFor="checkbox-a1" className="form-check-label">Accept Terms & Conditions</label>
                        </div>
                      </div>

                      <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-4"> {submitCount} {' '}
                          {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                          Register
                        </button>
                        <button type="reset" className="btn btn-secondary" onClick={handleReset} disabled={!dirty || isSubmitting} >
                          Reset
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="mt-5 mb-5 text-center">
              <a href="https://www.joshuaoweipadei.com">joshuaoweipadei.com</a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
