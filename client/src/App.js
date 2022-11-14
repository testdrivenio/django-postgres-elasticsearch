import React, { useState } from 'react';

import './App.css';

import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';

import Paginator from './components/Paginator';
import ResultList from './components/ResultList';
import Search from './components/Search';

function App () {
  console.log('App loaded');
  const [params, setParams] = useState({
    country: '',
    limit: 10,
    offset: 0,
    points: '',
    query: '',
  });
  const [results, setResults] = useState({});

  const loadPreviousPage = async () => {
    if (params.offset > 0) {
      const newParams = { ...params, offset: params.offset - params.limit };
      console.log(newParams);
      setParams(newParams);
      // setParams({ ...params, offset: params.offset - params.limit });
      await search();
    }
  };

  const loadNextPage = async () => {
    if ((params.offset + params.limit) < results?.count ?? 0) {
      setParams({ ...params, offset: params.offset + params.limit });
      await search();
    }
  };

  const search = async () => {
    console.log('During search:', params);
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:8003/api/v1/catalog/wines/',
        params,
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className='pt-3'>
      <h1>Perusable</h1>
      <p className='lead'>
        Use the controls below to peruse the wine catalog and filter the results.
      </p>
      <Row>
        <Col lg={4}>
          <Search 
            params={params} 
            search={search}
            setParams={setParams} 
          />
        </Col>
        <Col lg={8}>
          {(results?.count ?? 0) > 0 && (
            <Paginator 
              loadNextPage={loadNextPage}
              loadPreviousPage={loadPreviousPage}
              params={params}
              results={results}
            />
          )}
          <ResultList results={results?.results} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
