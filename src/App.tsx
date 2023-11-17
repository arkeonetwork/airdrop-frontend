import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Image } from '@chakra-ui/react';
import PlanetBg from './assets/planet.jpeg';

function App() {
  return (
    <>
      <Image src={PlanetBg} position="absolute" top={0} right="-20%" bottom="auto" />
      <BrowserRouter>
        <Routes>
          <Route element={<div />}>
            <Route path="/" element={<div />} />
            <Route path="claim" element={<div />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
