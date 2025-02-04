import React, { useState } from "react";
import { Box } from "@mui/system";
import { Row } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import MailDialog from "./MailDialog.js";

function ResultList({
  results,
  metaresults,
  finalstart,
  queriedVariant,
  error,
}) {
  // console.log("Results from RL", results);
  // console.log("Raw Results from RL", results);
  // results.forEach((result, index) => {
  //   console.log(`Result ${index}:`, result);
  // });
  // console.log("Metaresults from RL", metaresults);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleDialogOpen = (email) => {
    setDialogOpen(true);
    setEmail(email);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  var i = 0;
  var dataset = "";
  var rows = [];
  const addedBeacons = [];
  var isresponse = "";
  var exists = "";
  var total_count = 0;
  var populationrow = "";
  // Changed to original code beaconized and beaconName
  var beaconized = "";
  var beaconName = "";
  var alleleC = "";
  var alleleCHet = "";
  var alleleCHom = "";
  var popu = "";
  var geneAssociated = "No genes associated";
  if (results !== undefined) {
    const resultItems = results.map((result, index) => {
      // console.log(`Processing result at index ${index}:`, result);
      if (result.results) {
        isresponse = "True";
        rows = [];
        dataset = result.id;

        result.results.map((variant) => {
          let geneAssociated = "No genes associated";
          if (variant.molecularAttributes) {
            geneAssociated = variant.molecularAttributes.geneIds.join(", ");
          }
          if (variant.variation.location.interval.start.value === finalstart) {
            if (variant.frequencyInPopulations) {
              exists = "True";
              isresponse = "True";

              variant.frequencyInPopulations.map((frequencyInPopulation) => {
                frequencyInPopulation.frequencies.map((frequency) => {
                  alleleC = Array.isArray(frequency.alleleCount)
                    ? frequency.alleleCount[0]
                    : frequency.alleleCount;

                  alleleCHet = Array.isArray(frequency.alleleCountHeterozygous)
                    ? frequency.alleleCountHeterozygous[0]
                    : frequency.alleleCountHeterozygous;

                  alleleCHom = Array.isArray(frequency.alleleCountHomozygous)
                    ? frequency.alleleCountHomozygous[0]
                    : frequency.alleleCountHomozygous;

                  if (
                    frequency.population === "COVID_pop11_fin_2" ||
                    frequency.population === "COVID_pop11_fin_1"
                  ) {
                    popu = "Finnish";
                  } else if (
                    frequency.population === "COVID_pop12_ita_1" ||
                    frequency.population === "COVID_pop12_ita_2"
                  ) {
                    popu = "Italian";
                  } else if (
                    frequency.population === "COVID_pop13_ger_1" ||
                    frequency.population === "COVID_pop13_ger_2"
                  ) {
                    popu = "German";
                  }

                  rows.push({
                    id: (i += 1),
                    population: popu,
                    alleleCount: alleleC,
                    alleleNumber: frequency.alleleNumber,
                    alleleCountHomozygous: alleleCHom,
                    alleleCountHeterozygous: alleleCHet,
                    geneAssociated,
                    alleleFrequency: parseFloat(
                      frequency.alleleFrequency.toString().substring(0, 6)
                    ),
                  });
                  // console.log("All pushed rows so far:", rows);
                });
              });
            }
          }
        });
      }
      if (isresponse === "True") {
        populationrow = rows.map((pr) => (
          <tr key={pr.id}>
            <td></td>
            <td>{dataset}</td>
            <td className="centered-header">{pr.alleleCount}</td>
            <td className="centered-header">
              {pr.alleleCountHeterozygous || 0}
            </td>
            <td className="centered-header">
              {pr.alleleCountHomozygous || pr.alleleCount}{" "}
            </td>
            <td className="centered-header">{pr.geneAssociated}</td>
            <td></td>
          </tr>
        ));

        metaresults.map((meta) => {
          if (
            meta.response &&
            dataset !== "" &&
            meta.response.id === result.beaconId
          ) {
            beaconName = meta.response.organization.name;
            let beaconEmail = meta.response.organization.contactUrl;
            beaconized = (
              <tr>
                <td className="beaconized" colSpan="6">
                  <b>{beaconName}</b>
                </td>
                <td className="beaconized beaconized-email">
                  <IconButton onClick={() => handleDialogOpen(beaconEmail)}>
                    <MailOutlineRoundedIcon
                      sx={{
                        color: "#902b43",
                      }}
                    />
                  </IconButton>
                </td>
              </tr>
            );
            addedBeacons.push(beaconized);
            addedBeacons.push(populationrow);
            isresponse = "True";
          }
        });
      }

      rows = [];
      dataset = "";
      beaconized = "";
      total_count += 1;
    });
  } else {
    exists = "False";
    isresponse = "False";
  }

  return (
    <Row>
      {results && exists === "True" && (
        <Box
          sx={{
            marginTop: "50px",
            backgroundColor: "white",
            "& .super-app-theme--header": {
              backgroundColor: "#7B1B58",
              width: "2000px",
              color: "white",
            },
          }}
        >
          <p className="lead mt-2 mb-2">
            <b>Results </b>
          </p>
          <p>
            {queriedVariant && <span> Queried Variant: {queriedVariant}</span>}
          </p>
          <div className="table-container">
            <table className="data-table">
              <tr>
                <th>Beacon</th>
                <th className="dataset-column">Dataset</th>
                <th className="centered-header allele-count-column">
                  Allele Count
                </th>
                <th className="centered-header homozygous-count-column">
                  Heterozygous Count
                </th>
                <th className="centered-header heterozygous-count-column">
                  Homozygous/ Hemizygous Count
                </th>
                <th className="centered-header geneassociated-column">
                  Gene Associated
                </th>
                <th className="centered-header contact-column">Contact</th>
              </tr>
              {addedBeacons}
            </table>
          </div>
        </Box>
      )}

      {rows.length === 0 && dataset !== "" && (
        <p className="exclamation">No results found.</p>
      )}
      {addedBeacons.length === 0 && total_count !== 0 && (
        <p className="exclamation">No results found.</p>
      )}
      {(!results || results?.[0]?.results.length === 0) && (
        <p className="exclamation">No results found.</p>
      )}

      {error !== false && (
        <p className="bi bi-exclamation-triangle exclamation">
          There is a problem connecting to the Beacon Network, please try again
          later.
        </p>
      )}
      {/* {console.log("Debugging Info:", {
        "Rows Length": rows.length,
        Dataset: dataset,
        "Added Beacons Length": addedBeacons.length,
        "Total Count": total_count,
        Results: results,
        Error: error,
      })}

      {rows.length === 0 && dataset !== "" && (
        <>
          {console.log(
            "Condition Met: Rows are empty and dataset is not empty."
          )}
          <p className="exclamation">No results found.</p>
        </>
      )}

      {addedBeacons.length === 0 && total_count !== 0 && (
        <>
          {console.log(
            "Condition Met: No beacons added but total count is not zero."
          )}
          <p className="exclamation">No results found.</p>
        </>
      )}

      {!results ||
        (results?.[0]?.results.length === 0 && (
          <>
            {console.log("Condition Met: Results are undefined or null.")}
            <p className="exclamation">No results found.</p>
          </>
        ))}

      {error !== false && (
        <>
          {console.log("Condition Met: Error is not false.", { Error: error })}
          <p className="bi bi-exclamation-triangle exclamation">
            There is a problem connecting to the Beacon Network, please try
            again later.
          </p>
        </>
      )} */}

      <MailDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        beaconEmail={email}
      />
    </Row>
  );
}

export default ResultList;
