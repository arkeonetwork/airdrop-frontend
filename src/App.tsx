import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Flex, Image } from '@chakra-ui/react';
import BackgroundImage from './assets/planet.jpeg';
import Logo from './assets/arkeo-logo.svg';
import { Section } from './components/Section';
import { Check } from './pages/Check/Check';
import { Claim } from './pages/Claim/Claim';

function App() {
  return (
    <Flex direction="column" flex="1" overflow="hidden" height="100vh">
      <Section
        id="app"
        textAlign="center"
        containerProps={{ maxWidth: 'container.lg', display: 'flex', flexDir: 'column', gap: 2, height: '100vh' }}
      >
        <Image src={BackgroundImage} position="absolute" top={0} right="-20%" bottom="auto" zIndex="-1" />
        <Image src={Logo} position="absolute" top={10} />
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<Check />} />
              <Route path="claim" element={<Claim />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Section>
    </Flex>
  );
}

export default App;
