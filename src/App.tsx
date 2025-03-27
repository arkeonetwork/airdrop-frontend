import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Flex, Image } from '@chakra-ui/react';
import BackgroundImage from './assets/planet.jpeg';
import Logo from './assets/arkeo-logo.svg';
import { Section } from './components/Section';
import { Check, AddressCheck } from './pages/Check';
import { ConnectWrapper } from './pages/Connect';

function App() {
  return (
    <Flex direction="column" flex="1" overflow="hidden" height="100vh">
      <Section id="app" textAlign="center" containerProps={{ maxWidth: 'container.lg', display: 'flex', flexDir: 'column', gap: 2, height: '100vh' }}>
        <Image src={BackgroundImage} position="absolute" top={0} bottom="auto" zIndex="-1" />
        <Image src={Logo} position="absolute" top={10} />
        <BrowserRouter>
          <Routes>
            <Route path="/check" element={<Check />} />
            <Route path="/check/:address" element={<AddressCheck />} />
            <Route path="/" element={<ConnectWrapper />} />
            <Route path="*" element={<Navigate to="/check" />} />
          </Routes>
        </BrowserRouter>
      </Section>
    </Flex>
  );
}

export default App;
