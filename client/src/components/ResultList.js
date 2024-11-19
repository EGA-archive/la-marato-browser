// client/src/components/ResultList.js

import React from "react";
import { Box } from "@mui/system";
import { Row } from "react-bootstrap";

// changed
function ResultList({ results, metaresults, finalstart, error }) {
  // console.log("Results", results);
  // console.log("Metaresults", metaresults);
  var i = 0;
  var dataset = "";
  var rows = [];
  const addedBeacons = [];
  var isresponse = "";
  var exists = "";
  var total_count = 0;
  var populationrow = "";
  var beaconized = "";
  var beaconName = "";
  var alleleC = "";
  var alleleCHet = "";
  var alleleCHom = "";
  var popu = "";
  if (results !== undefined) {
    const resultItems = results.map((result) => {
      if (result.results) {
        isresponse = "True";
        rows = [];
        // dataset = result.id;
        dataset = result.id;
        result.results.map((variant) => {
          if (variant.variation.location.interval.start.value === finalstart) {
            if (variant.frequencyInPopulations) {
              exists = "True";
              isresponse = "True";
              variant.frequencyInPopulations.map((frequencyInPopulation) =>
                frequencyInPopulation.frequencies.map((frequency) => {
                  if (frequency.alleleCount instanceof Array) {
                    alleleC = frequency.alleleCount[0];
                  } else {
                    alleleC = frequency.alleleCount;
                  }
                  if (frequency.alleleCountHeterozygous instanceof Array) {
                    alleleCHet = frequency.alleleCountHeterozygous[0];
                  } else {
                    alleleCHet = frequency.alleleCountHeterozygous;
                  }
                  if (frequency.alleleCountHomozygous instanceof Array) {
                    alleleCHom = frequency.alleleCountHomozygous[0];
                  } else {
                    alleleCHom = frequency.alleleCountHomozygous;
                  }
                  if (frequency.population === "COVID_pop11_fin_2") {
                    popu = "Finnish";
                  } else if (frequency.population === "COVID_pop11_fin_1") {
                    popu = "Finnish";
                  } else if (frequency.population === "COVID_pop12_ita_1") {
                    popu = "Italian";
                  } else if (frequency.population === "COVID_pop12_ita_2") {
                    popu = "Italian";
                  } else if (frequency.population === "COVID_pop13_ger_1") {
                    popu = "German";
                  } else if (frequency.population === "COVID_pop13_ger_2") {
                    popu = "German";
                  }
                  rows.push({
                    id: (i += 1),
                    population: popu,
                    alleleCount: alleleC,
                    alleleNumber: frequency.alleleNumber,
                    alleleCountHomozygous: alleleCHom,
                    alleleCountHeterozygous: alleleCHet,
                    alleleFrequency: parseFloat(
                      frequency.alleleFrequency.toString().substring(0, 6)
                    ),
                  });
                })
              );
            }
          }
        });
      }
      if (isresponse === "True") {
        populationrow = rows.map((pr) => (
          <tr key={pr.id}>
            <td></td>
            {/* Here will go the ID */}
            <td>{dataset}</td>
            <td className="centered-header">{pr.alleleCount}</td>
            <td className="centered-header">{pr.alleleCountHeterozygous}</td>
            <td className="centered-header">{pr.alleleCountHomozygous}</td>
            {/* Here will go the Gene Associated */}
            <td className="centered-header">
              {result.molecularAttributes?.geneIds?.length > 0
                ? result.molecularAttributes.geneIds.map((geneId, idx) => (
                    <span key={idx}>
                      {geneId}
                      <br />
                    </span>
                  ))
                : "No genes associated"}
            </td>
            {/* Here will go the contact */}
            {/* <td className="centered-header">
              <img src="/../mail.svg" alt="Mail Icon" className="mail-icon" />
            </td> */}
          </tr>
        ));
        // The beaconName is in the metaresponse
        metaresults.map((meta) => {
          if (meta.response.id === result.beaconId) {
            beaconName = meta.response.name;
          }
        });
        beaconized = (
          <tr>
            <td className="beaconized" colSpan="6">
              {/* Here will go the name of the hospitals where the data comes from. Will be in the metaresponse */}
              <b>{beaconName}</b>
            </td>
            {/* Here will go the contact */}
            <td className="beaconized centered-header">
              <img src="/../mail.svg" alt="Mail Icon" className="mail-icon" />
            </td>
          </tr>
        );
        addedBeacons.push(beaconized);
        addedBeacons.push(populationrow);
        total_count += 1;
        isresponse = "True";
      }
    });
  } else {
    exists = "False";
    isresponse = "False";
  }
  //const arrayDataItems = addedBeacons.map((course) => <div>{course}</div>);
  // document.getElementById('clickme').onclick = sort_by_key(results, 'id');
  // document.getElementById('clickme2').onclick = sort_by_key(results, 'id');
  // changed
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
          <p className="lead mt-2">
            <b>Results</b>
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", marginBottom: "32px" }}>
              <tr>
                <th>Beacon</th>
                <th style={{ width: "20%" }}>ID</th>
                <th className="centered-header" style={{ width: "11%" }}>
                  Allele Count
                </th>
                {/* <th style={{ width: "11%" }}>Allele Number</th> */}
                <th className="centered-header" style={{ width: "16%" }}>
                  Heterozygous Count
                </th>
                <th className="centered-header" style={{ width: "16%" }}>
                  Homozygous/ Hemizygous Count
                </th>
                <th className="centered-header" style={{ width: "11%" }}>
                  Gene Associated
                </th>
                <th className="centered-header" style={{ width: "11%" }}>
                  Contact
                </th>
              </tr>
              {addedBeacons}
            </table>
          </div>
        </Box>
      )}
      {rows.length === 0 && dataset !== "" && (
        <p class="exclamation">No results found.</p>
      )}
      {isresponse !== "" && rows.length === 0 && dataset === "" && (
        <p class="exclamation">No results found.</p>
      )}
      {error !== false && (
        <p class="bi bi-exclamation-triangle exclamation">
          {" "}
          There is a problem connecting to the Beacon Network, please try again
          later.
        </p>
      )}
    </Row>
  );
}

export default ResultList;
