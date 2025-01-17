import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import { Formik } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ThemeProvider } from "@mui/material/styles";
import CustomTheme from "../components/CustomTheme";

const SignupSchema = Yup.object().shape({
  variant: Yup.string()
    .matches(
      /[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,X]-([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?-[A,C,G,T]+-[A,C,G,T]+$/,
      "Incorrect variant information, please check the example below"
    )
    .required("Required"),
  genome: Yup.string().required("Required"),
});

// Dropdown Menu
const refGenome = [{ label: "GRCh37" }, { label: "GRCh38" }];

function Search({ search, setVariant }) {
  const onSubmit = async (values, actions) => {
    setVariant(values.variant);
    await search(values.variant, values.genome);
  };

  // Tooltip
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
      transform: "translate(0px, 0px) !important",
    },
  });

  return (
    <ThemeProvider theme={CustomTheme}>
      <Formik
        initialValues={{
          variant: "",
          genome: "GRCh37", // Preselect GRCh37
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
        }) => {
          const handlePaste = (event) => {
            event.preventDefault();
            const pastedData = event.clipboardData.getData("text");

            // Apply text cleanup rules
            const cleanedData = pastedData
              .trim()
              .replace(/\./g, "") // Remove all periods
              .replace(/\s+/g, " ") // Replace multiple spaces with a single space
              .replace(/\t/g, "-") // Replace tabs with a single hyphen
              .replace(/\s/g, "-") // Replace remaining spaces with a single hyphen
              .replace(/-+/g, "-"); // Replace multiple consecutive hyphens with a single hyphen

            // Get input field selection range
            const inputElement = event.target;
            const start = inputElement.selectionStart;
            const end = inputElement.selectionEnd;

            if (start !== null && end !== null) {
              // Preserve surrounding text and insert the cleaned pasted data
              const newValue =
                values.variant.substring(0, start) +
                cleanedData +
                values.variant.substring(end);

              setFieldValue("variant", newValue);

              // Move cursor to the end of the pasted text
              setTimeout(() => {
                inputElement.setSelectionRange(
                  start + cleanedData.length,
                  start + cleanedData.length
                );
              }, 0);
            }
          };

          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Row className="search-row">
                  <Col lg={8} className="col-variant">
                    <Form.Label>
                      <b className="variant-query">Variant query</b>
                      <CustomTooltip
                        title={
                          <ul className="tooltip-list">
                            <li>
                              Type your variant or copy from Excel with this
                              specific structure: chr / position / ref. base /
                              alt. base.
                            </li>
                            <li>Queries need to be in 0-based format.</li>
                          </ul>
                        }
                        placement="top-start"
                        arrow
                      >
                        <b className="infovariant">i</b>
                      </CustomTooltip>
                    </Form.Label>

                    <Autocomplete
                      freeSolo
                      options={[]}
                      value={values.variant}
                      onInputChange={(event, newValue) => {
                        if (event && event.type !== "paste") {
                          setFieldValue("variant", newValue);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Insert your variant"
                          size="small"
                          onPaste={handlePaste}
                          error={Boolean(touched.variant && errors.variant)}
                          helperText={
                            touched.variant && errors.variant
                              ? errors.variant
                              : ""
                          }
                          sx={{
                            marginBottom: "20px",
                            "& .MuiOutlinedInput-root": {
                              borderColor:
                                touched.variant && errors.variant ? "red" : "",
                            },
                          }}
                        />
                      )}
                    />
                  </Col>

                  <Col className="refgenome">
                    <Form.Label htmlFor="points">
                      <b>Ref Genome</b>
                    </Form.Label>
                    <Autocomplete
                      disablePortal
                      options={refGenome}
                      name="genome"
                      value={refGenome.find(
                        (option) => option.label === values.genome
                      )}
                      onChange={(event, newValue) => {
                        setFieldValue("genome", newValue ? newValue.label : "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          error={Boolean(errors.genome && touched.genome)}
                          helperText={
                            errors.genome && touched.genome ? errors.genome : ""
                          }
                        />
                      )}
                    />
                  </Col>

                  {/* Search button */}
                  <div className="col-searchbutton">
                    <button
                      className="searchbutton"
                      type="submit"
                      variant="primary"
                      disabled={errors.variant || errors.genome}
                    >
                      <div className="lupared"></div>Search
                    </button>
                  </div>
                </Row>
              </Form.Group>

              <div className="example-span">
                <span>Example: </span>
                <a
                  type="reset"
                  onClick={() => setFieldValue("variant", "17-43045703-G-A")}
                >
                  <u className="example">17-43045703-G-A</u>
                </a>
              </div>
            </Form>
          );
        }}
      </Formik>
    </ThemeProvider>
  );
}

export default Search;
