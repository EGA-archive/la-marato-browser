// client/src/App.js
import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import ResultList from './components/ResultList';
import Search from './components/Search';
import SignInForm from './components/SignIn/SignInForm';
import { useAuth } from 'oidc-react';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './components/Footer.js';
import LoggedIn from './components/SignIn/LoggedIn.js'; 
import NetworkMembers from './components/NetworkMembers.js';


function App() {
  const [results, setResults] = useState([]);
  const [metaresults, setMetaResults] = useState([]);
  const [finalstart, setFinalStart] = useState([]);
  const [error, setError] = useState(false);
  const [isQuizePageVisible, setIsQuizePageVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const auth = useAuth();

  const onClickHandler = () => {
    setIsQuizePageVisible(true);
  };


  const search = async (variant, genome) => {
    setLoading(true);
    let jsonData1 = {};
    var arr = variant.split("-");
    if (arr[2].length === 1) {
      var end = parseInt(arr[1]) + 1;
    } else {
      var end = parseInt(arr[1]) + arr[2].length;
    }
    var finalend = end.toString();
    var finalstart = parseInt(arr[1]);
    setFinalStart(finalstart);
    console.log(auth.userData.access_token);
    console.log("Auth object:", auth);

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
      console.log(metaresponse.data.responses);
      setMetaResults(metaresponse.data.responses);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    try {
      jsonData1 = {
        meta: { apiVersion: '2.0' },
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
          pagination: { skip: 0, limit: 10 },
          testMode: false,
          requestedGranularity: 'record'
        }
      }
      let response;
      
      if (auth && auth.userData) {
        console.log(auth)
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
          // url: `https://af-gdi-bn-api-demo.ega-archive.org/beacon-network/v2.0.0/g_variants`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: jsonData1
        })
      }
      setResults(response.data.response.resultSets);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bigparent">
      <div className="parentwrapper">
      <Navbar style={{background: "#902B43",height:"77px",width:"100vw",borderWidth:"0", position: "sticky", top: "0", zIndex: "2"}}>
      <a class="lamaratologo" onClick={() => {window.location.href="/"}}><img src="/../lamaratologo.png" class="lamaratologo" alt="lamaratologo"></img></a>
      <h1 class="beacon">Beacon Frequency Browser</h1>
          <LoggedIn onClickHandler={onClickHandler} />
        </Navbar>
        <Container className="logos-founders">
          <img src="/../lamaratologogrey.png" className="lamaratologogrey" alt="lamaratologogrey" />
          <img src="/../institutcatalasalutgrey.png" className="institutcatalasalutgrey" alt="institutcatalasalutgrey" />
          <img src="/../lacaixalogogrey.png" className="lacaixalogogrey" alt="lacaixalogogrey" />
        </Container>

        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={7}></Col>
            <Col>
              {auth && auth.userData && <SignInForm />}
              {!auth.userData && isQuizePageVisible && <SignInForm />}
            </Col>
            <p className="lead mt-5 mb-4">Search for your variant:</p>
            <Search search={search} />
          </Row>
          {isLoading === true && error === false && <div class="loader"></div>}
          {isLoading === false && error === false && <ResultList results={results} metaresults={metaresults} finalstart={finalstart} error={error}/>}
          {error !== false && <ResultList results={results} metaresults={metaresults} finalstart={finalstart} error={error}/>}
        </Container>
        <Container>
          <NetworkMembers />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default App;
