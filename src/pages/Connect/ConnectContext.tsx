import { createContext, useContext, useReducer } from 'react';

interface StateProps {
  step: number;
  cosmosAccount?: string;
  arkeoAccount?: string;
  ethAccount?: string;
}
interface DispatchProps {
  type: string;
  payload: any;
}

export const initialState = {
  step: 1,
};

const connectReducer = (state: StateProps, action: DispatchProps) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_STEP':
      return {
        ...state,
        step: payload,
      };
    case 'SET_COSMOS_ACCOUNT':
      return {
        ...state,
        cosmosAccount: payload,
      };
    case 'SET_ARKEO_ACCOUNT':
      return {
        ...state,
        arkeoAccount: payload,
      };
    case 'SET_ETH_ACCOUNT':
      return {
        ...state,
        ethAccount: payload,
      };
    default:
      return state;
  }
};
interface ContextProps {
  state: StateProps;
  dispatch: React.Dispatch<DispatchProps>;
}
const ConnectContext = createContext<ContextProps>({ state: initialState, dispatch: () => null });

export const ConnectProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(connectReducer, initialState);

  return <ConnectContext.Provider value={{ state, dispatch }}>{children}</ConnectContext.Provider>;
};

export const useConnect = (): ContextProps => {
  const context = useContext(ConnectContext);
  if (!context) {
    throw new Error('useConnect must be used within an ConnectProvider');
  }
  return context;
};
