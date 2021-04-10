import React, { useEffect } from 'react';
import {Container,Row} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Posts from './components/Posts/Posts';
import Navigation from './components/Navbar/Navbar';
import { getPosts } from './actions/posts';
import './App.scss';
import {NavigationProvider} from './context/naviagtionContext';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container fluid="lg">
      <NavigationProvider>
        <Row>
          <Navigation/>
        </Row>
        <Row className="postContainer">
          <Posts/>
        </Row>
      </NavigationProvider>
    </Container>
  );
};

export default App;
