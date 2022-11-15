import { Fragment, Suspense, useRef, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Modal from 'react-modal';

import './App.css';

import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Engine from './engine/Engine';

Modal.setAppElement('#root');

function App() {

  

  return ( <Fragment>


    <Routes>
    <Route exact path="/" element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="game" element={<Engine />} />
      </Routes>


    </Fragment>

  );
}

export default App;
