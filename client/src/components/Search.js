// client/src/components/Search.js

import React from 'react';

import { Formik } from 'formik';
import { Col, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  variant: Yup.string()
    .matches(
      /[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,X]-([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?-[A,C,G,T]+-[A,C,G,T]+$/,
          "Incorrect variant information, please check the example below"
        )
    .required('Required'),
});


function Search ({ search }) { // changed
    const onSubmit = async (values, actions) => {
        await search(
          values.cohort,
          values.variant,
          values.genome
        );
      };
      
  
    return (
      <Formik
        initialValues={{
          cohort: '',
          variant: '',
          genome: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >

      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
        errors, 
        touched
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          
            <Form.Group controlId="country">
            <Row>
                
                <Col lg={5} class="variant" style={{marginBottom:"-10px"}}>
                <Form.Label><b>Variant</b></Form.Label>
                    <Form.Control
                    type="search"
                    name="variant"
                    style={{marginBottom: "20px"}}
                    className="shadow-none"
                    placeholder="Search for a variant"
                    value={values.variant}
                    onChange={handleChange}
                    />
                    
                </Col>
                
                <Col class="refgenome">
                <Form.Label htmlFor="points"><b>Ref Genome</b></Form.Label>
                
                <Form.Select
                    name='genome'
                    onChange={handleChange}
                    className="shadow-none"
                    value={values.genome}
                  >
                    <option value='GRCh37'>GRCh37</option>
                  </Form.Select>
                    </Col>
                    <Col class="cohort">
                    <Form.Label><b style={{marginRight:"10px"}}>Cohort </b><span class="hovertext"><span class="hiddenspan">a group of people with a shared characteristic</span><b class="infocohort">i</b></span></Form.Label>
            
                    <Form.Select 
                    name='cohort'
                    className="shadow-none"
                    onChange={handleChange}
                    value={values.cohort}>
                      <option value="All">All</option>
                      <option value="COVID">COVID</option>
                      </Form.Select>

                    </Col>
                    <div style={{width:"150px", display:"inline"}}>
              <button className="button1" type='submit' variant='primary' disabled={errors.variant}><div class='lupared'></div>Search</button>
              {/*<button className="button2 mt-3 ms-2" type='submit' variant='primary' onClick={() => {window.location.href="/"}}>
      Reset
    </button>*/}
            </div>

                    </Row>


          </Form.Group>
          <Form.Group as={Row}>

          </Form.Group>
        {touched.variant && errors.variant && <div class="errors">{errors.variant}</div>}
        <div style={{marginTop:"10px"}}><span>Example: </span><a type="reset" onClick={() => setFieldValue('variant', '3-45864731-T-C')}>
        <u style={{color:"blue"}}>3-45864731-T-C</u>
        </a></div>
        </Form>
        
      )}


    </Formik>
  );
}

export default Search;