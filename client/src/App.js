// client/src/App.js
import axios from 'axios';
import React, { useState } from 'react'; // changed

import './App.css';

import { Col, Container, Row} from 'react-bootstrap';

import ResultList from './components/ResultList';
import Search from './components/Search';

import SignInForm from './components/SignIn/SignInForm'

import { useAuth } from 'oidc-react'

import Navbar from 'react-bootstrap/Navbar';

import Footer from './components/Footer.js'

function App () {
  // new
  const [results, setResults] = useState([]);
  const [metaresults, setMetaResults] = useState([]);
  const [finalstart, setFinalStart] = useState([]);
  const [error, setError] = useState(false);
  const [isQuizePageVisible, setIsQuizePageVisible] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const auth = useAuth()

  const onClickHandler = () => {
    // Set the visibility flag to true when the button is clicked
    setIsQuizePageVisible(true)
  }


  // new
  const search = async (cohort, variant, genome) => {
    setLoading(true)
    let jsonData1 = {}
    var arr = variant.split("-");
    if (arr[2].length === 1){var end = parseInt(arr[1]) + 1}else{var end = parseInt(arr[1]) + arr[2].length}
    var finalend = end.toString()
    var finalstart = parseInt(arr[1])
    setFinalStart(finalstart)
    //console.log(auth.userData.access_token);
    // console.log(auth)

    try {
      let metaresponse;
      metaresponse = await axios({
        method: 'get',
        url: `https://af-gdi-bn-api-demo.ega-archive.org/beacon-network/v2.0.0/`,
        //url: `https://af-gdi-bn-api-demo.ega-archive.org/beacon-network/v2.0.0/beacon-network/v2.0.0/g_variants`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: jsonData1
      })
      console.log(metaresponse.data.responses)
      setMetaResults(metaresponse.data.responses);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    try {
      jsonData1 = {
        meta: {
          apiVersion: '2.0'
        },
        query: {
          requestParameters: {
        "alternateBases": arr[3],
    "referenceBases": arr[2],
"start": arr[1],
"end": finalend,
            "referenceName": arr[0]
},
          filters: [],
          includeResultsetResponses: 'HIT',
          pagination: {
            skip: 0,
            limit: 10
          },
          testMode: false,
          requestedGranularity: 'record'
        }
      }
      let response;
      
      if (auth && auth.userData){
        // console.log(auth)
      response = await axios({
        method: 'post',
        url: `https://af-gdi-bn-api-demo.ega-archive.org/beacon-network/v2.0.0/g_variants`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.userData.access_token}`
        },
        data: jsonData1
      }
      )
    } else {
      response = await axios({
        method: 'get',
        url: `https://af-gdi-bn-api-demo.ega-archive.org/beacon-network/v2.0.0/g_variants?start=${arr[1]}&alternateBases=${arr[3]}&referenceBases=${arr[2]}&referenceName=${arr[0]}&limit=1&assemblyId=GRCh37`,
        //url: `https://af-gdi-bn-api-demo.ega-archive.org/beacon-network/v2.0.0/g_variants`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: jsonData1
      })
    }
      console.log(response)
      setResults(response.data.response.resultSets);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div class="bigparent">
    <div class="parentwrapper">
      <Navbar style={{backgroundImage:"url('/../HeaderBackgroundsvg.svg')",backgroundSize:"cover",height:"111px",width:"100vw",borderWidth:"0", position: "sticky", top: "0", zIndex: "2"}}>
      <a class="gdilogo" onClick={() => {window.location.href="/"}}><img src="/../GDILogowhite.png" class="gdilogo" alt="gdilogo"></img></a>
      <h1 class="allele">Allele Frequency Browser</h1></Navbar>
    <Container>

      <Row>
      <Col lg={3}></Col>

      <Col lg={7}>
      

      </Col>
      <Col>
      {/*<button onClick={onClickHandler} style={{backgroundImage:"url('/../ls-login.png')",backgroundSize:"cover",backgroundColor:"transparent",height:"35px",width:"160px",borderWidth:"0"}}></button>*/}
      {/*<button></button>*/}

      {/* When the flag is true, the page will be shown */}
      
      {auth && auth.userData && <SignInForm/>}
      {!auth.userData && isQuizePageVisible && <SignInForm/>}
      </Col>
      <p className='lead mt-5'>
        Search for your variant:
      </p>

          <Search search={search} /> {/* changed */}
          

          </Row>

      {isLoading === true && error === false && <div class="loader"></div>}
          {isLoading === false && error === false && <ResultList results={results} metaresults={metaresults} finalstart={finalstart} error={error}/>} {/* changed */}
          {error !== false && <ResultList results={results} metaresults={metaresults} finalstart={finalstart} error={error}/>} {/* changed */}
    </Container>
    </div>
    <Footer/>
    </div>
    
    
  );
}

export default App;