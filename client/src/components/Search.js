// client/src/components/Search.js

import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import { Formik } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { color, maxHeight } from "@mui/system";
import { styled } from "@mui/material/styles";

const SignupSchema = Yup.object().shape({
  variant: Yup.string()
    .matches(
      /[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,X]-([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?-[A,C,G,T]+-[A,C,G,T]+$/,
      "Incorrect variant information, please check the example below"
    )
    .required("Required"),
});

function Search({ search }) {
  // changed
  const onSubmit = async (values, actions) => {
    await search(values.variant, values.genome);
  };

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .MuiTooltip-tooltip`]: {
      backgroundColor: "#FFFFFF",
      color: "#000000",
      border: "1px solid #902B43",
      fontSize: "14px",
      padding: "5px 10.83px",
      borderRadius: "5px",
      maxWidth: "430px",
    },
    [`& .MuiTooltip-arrow`]: {
      color: "#902B43",
    },
  });

  return (
    <Formik
      initialValues={{
        variant: "",
        genome: "",
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
        touched,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          {/* <Form.Group controlId="country"> */}
          <Form.Group>
            <Row>
              <Col lg={8} className="variant" style={{ marginBottom: "-10px" }}>
                <Form.Label>
                  <b style={{ marginRight: "40px" }}>Variant</b>
                  <CustomTooltip
                    title="Type your variant or copy from Excel with this specific structure: chr / position / ref. base / alt. base"
                    placement="right"
                    arrow
                  >
                    <b className="infovariant" style={{ cursor: "pointer" }}>
                      i
                    </b>
                  </CustomTooltip>
                </Form.Label>
                <Form.Control
                  type="search"
                  name="variant"
                  className="input-field variant-field shadow-none"
                  style={{
                    marginBottom: "20px",
                    borderColor: touched.variant && errors.variant ? "red" : "",
                  }}
                  placeholder="Insert your variant"
                  value={values.variant}
                  onChange={handleChange}
                />
              </Col>
              <Col className="refgenome">
                <Form.Label htmlFor="points">
                  <b>Ref Genome</b>
                </Form.Label>

                <Form.Select
                  name="genome"
                  onChange={handleChange}
                  className="input-field genome-field shadow-none"
                  value={values.genome}
                >
                  <option value="GRCh37">GRCh37</option>
                </Form.Select>
              </Col>
              {/* Search button */}
              <div style={{ width: "150px", display: "inline" }}>
                <button
                  className="button1"
                  type="submit"
                  variant="primary"
                  disabled={errors.variant}
                >
                  <div className="lupared"></div>Search
                </button>
              </div>
            </Row>
          </Form.Group>
          <Form.Group as={Row}></Form.Group>
          {/* Example */}
          {touched.variant && errors.variant && (
            <div className="errors">{errors.variant}</div>
          )}

          <div style={{ marginTop: "10px" }}>
            <span>Example: </span>
            <a
              type="reset"
              onClick={() => setFieldValue("variant", "3-45864731-T-C")}
            >
              <u style={{ color: "blue" }}>3-45864731-T-C</u>
            </a>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Search;
