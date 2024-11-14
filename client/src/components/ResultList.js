// client/src/components/ResultList.js

import React from 'react';
import { Box } from '@mui/system';
import { Row } from 'react-bootstrap';

// changed
function ResultList ({ results, metaresults, finalstart, error}) {
  // console.log(results)
  console.log(metaresults)
  var i =0
  var dataset = ''
  var rows = []
  const addedBeacons = []
  var isresponse = ''
  var exists = ''
  var total_count = 0
  var populationrow = ''
  var beaconized = ''
  var beaconName= ''
  var alleleC=''
  var alleleCHet=''
  var alleleCHom=''
  var popu =''
  if (results !== undefined){
  const resultItems = results.map(result => {if (result.results) {isresponse='True';rows=[]; dataset=result.id;result.results.map(variant => {if (variant.variation.location.interval.start.value === finalstart){if (variant.frequencyInPopulations) {exists='True';isresponse='True';variant.frequencyInPopulations.map(frequencyInPopulation => frequencyInPopulation.frequencies.map(frequency =>
    {if (frequency.alleleCount instanceof Array){alleleC=frequency.alleleCount[0]}else{alleleC=frequency.alleleCount};if (frequency.alleleCountHeterozygous instanceof Array){alleleCHet=frequency.alleleCountHeterozygous[0]}else{alleleCHet=frequency.alleleCountHeterozygous};if (frequency.alleleCountHomozygous instanceof Array){alleleCHom=frequency.alleleCountHomozygous[0]}else{alleleCHom=frequency.alleleCountHomozygous};if (frequency.population === 'COVID_pop11_fin_2'){popu='Finnish'}else if(frequency.population === 'COVID_pop11_fin_1'){popu='Finnish'}else if(frequency.population === 'COVID_pop12_ita_1'){popu='Italian'}else if(frequency.population === 'COVID_pop12_ita_2'){popu='Italian'}else if(frequency.population === 'COVID_pop13_ger_1'){popu='German'}else if(frequency.population === 'COVID_pop13_ger_2'){popu='German'};rows.push({
      id: i+=1,
      population: popu, 
      alleleCount: alleleC, 
      alleleNumber: frequency.alleleNumber,
      alleleCountHomozygous: alleleCHom,
      alleleCountHeterozygous: alleleCHet,
      alleleFrequency: parseFloat(frequency.alleleFrequency.toString().substring(0,6)), })}

  ))}}})}if (isresponse === 'True'){populationrow = rows.map((pr) => <tr><td></td><td>{dataset}</td><td>{pr.population}</td><td>{pr.alleleCount}</td><td>{pr.alleleNumber}</td><td>{pr.alleleCountHomozygous}</td><td>{pr.alleleCountHeterozygous}</td><td>{pr.alleleFrequency}</td></tr>);metaresults.map((meta) => {if (meta.response.id === result.beaconId){beaconName=meta.response.name}});beaconized = <tr><td class="beaconized" colspan="8"><b>{beaconName}</b></td></tr>; addedBeacons.push(beaconized); addedBeacons.push(populationrow); total_count+=1;isresponse='True'};});
}else{exists='False';isresponse='False'}
  //const arrayDataItems = addedBeacons.map((course) => <div>{course}</div>);
 // document.getElementById('clickme').onclick = sort_by_key(results, 'id');
  // document.getElementById('clickme2').onclick = sort_by_key(results, 'id');
  // changed
  return (
    <Row>
    {results && exists === 'True' &&
    
    <Box sx={{marginTop: '50px',backgroundColor: 'white',
      '& .super-app-theme--header': {
        backgroundColor: '#7B1B58',width: '2000px',
        color: 'white'
      }, }}>
              <p className='lead mt-2'>
        <b>Results</b>
      </p>
      <div style={{overflowX: "auto"}}>
      <table style={{width: "100%", marginBottom: "32px"}}>
        <tr><th>Beacon</th><th style={{width: "20%"}}>Dataset</th><th style={{width: "11%"}}>Population</th><th style={{width: "11%"}}>Allele Count</th><th style={{width: "11%"}}>Allele Number</th><th style={{width: "16%"}}>Homozygous/ Hemizygous Count</th><th style={{width: "16%"}}>Heterozygous Count</th><th style={{width: "11%"}}>Allele Frequency</th></tr>
        {addedBeacons}</table></div></Box>}
      {rows.length === 0 && dataset !== '' && <p class="exclamation">No results found.</p>}
      {isresponse !== '' && rows.length === 0 && dataset === '' && <p class="exclamation">No results found.</p>}
      {error !== false && <p class="bi bi-exclamation-triangle exclamation"> There is a problem connecting to the Beacon Network, please try again later.</p>}
      </Row>
    
  );
}

export default ResultList;