import React from 'react';
import { ConnectProvider } from './ConnectContext';
import { Connect } from './Connect';

export const ConnectWrapper = () => {
  return (
    <ConnectProvider>
      <Connect />
    </ConnectProvider>
  );
};
