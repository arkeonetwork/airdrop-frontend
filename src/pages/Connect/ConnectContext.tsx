import { createContext, useContext, useReducer } from 'react'

interface Info extends ClaimRecord {
  account?: string
}

interface StateProps {
  step: number
  arkeoInfo: Info
  thorInfo: Info & { delegateTx?: string }
  ethInfo: Info & { signature?: string }
}

interface ClaimRecord {
  amountClaim: number
  amountDelegate: number
  amountVote: number
}

type DispatchProps =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_THORCHAIN_ACCOUNT'; payload: string | undefined }
  | { type: 'SET_THORCHAIN_AMOUNT'; payload: ClaimRecord }
  | { type: 'SET_THORCHAIN_DELEGATE_TX'; payload: string | undefined }
  | { type: 'SET_ARKEO_ACCOUNT'; payload: string | undefined }
  | { type: 'SET_ARKEO_AMOUNTS'; payload: ClaimRecord }
  | { type: 'SET_ETH_ACCOUNT'; payload: string }
  | { type: 'SET_ETH_AMOUNT'; payload: ClaimRecord }
  | { type: 'SET_ETH_SIGNATURE'; payload?: string | undefined }
  | { type: 'RESET_ETH'; payload?: undefined }
  | { type: 'RESET_ARKEO'; payload?: undefined }
  | { type: 'RESET_THOR'; payload?: undefined }
  | { type: 'RESET'; payload?: undefined }

const initialState = {
  step: 1,
  arkeoInfo: { amountClaim: 0, amountVote: 0, amountDelegate: 0 },
  ethInfo: { amountClaim: 0, amountVote: 0, amountDelegate: 0 },
  thorInfo: { amountClaim: 0, amountVote: 0, amountDelegate: 0 },
}

const connectReducer = (state: StateProps, action: DispatchProps) => {
  const { type, payload } = action
  switch (type) {
    case 'SET_STEP':
      return {
        ...state,
        step: payload,
      }
    case 'SET_ARKEO_ACCOUNT':
      return {
        ...state,
        arkeoInfo: {
          ...state.arkeoInfo,
          account: payload,
        },
      }
    case 'SET_ARKEO_AMOUNTS':
      return {
        ...state,
        arkeoInfo: {
          ...state.arkeoInfo,
          amountClaim: payload.amountClaim,
          amountVote: payload.amountVote,
          amountDelegate: payload.amountDelegate,
        },
      }
    case 'SET_THORCHAIN_ACCOUNT':
      return {
        ...state,
        thorInfo: {
          ...state.thorInfo,
          account: payload,
        },
      }
    case 'SET_THORCHAIN_AMOUNT':
      return {
        ...state,
        thorInfo: {
          ...state.thorInfo,
          amountClaim: payload.amountClaim,
          amountVote: payload.amountVote,
          amountDelegate: payload.amountDelegate,
        },
      }
    case 'SET_THORCHAIN_DELEGATE_TX':
      return {
        ...state,
        thorInfo: {
          ...state.thorInfo,
          delegateTx: payload,
        },
      }
    case 'SET_ETH_ACCOUNT':
      return {
        ...state,
        ethInfo: {
          ...state.ethInfo,
          account: payload,
        },
      }
    case 'SET_ETH_AMOUNT':
      return {
        ...state,
        ethInfo: {
          ...state.ethInfo,
          amountClaim: payload.amountClaim,
          amountVote: payload.amountVote,
          amountDelegate: payload.amountDelegate,
        },
      }
    case 'SET_ETH_SIGNATURE':
      return {
        ...state,
        ethInfo: {
          ...state.ethInfo,
          signature: payload,
        },
      }
    case 'RESET_ETH':
      return {
        ...state,
        ethInfo: { amountClaim: 0, amountVote: 0, amountDelegate: 0 },
      }
    case 'RESET_THOR':
      return {
        ...state,
        thorInfo: { amountClaim: 0, amountVote: 0, amountDelegate: 0 },
      }
    case 'RESET_ARKEO':
      return {
        ...state,
        arkeoInfo: { amountClaim: 0, amountVote: 0, amountDelegate: 0 },
      }
    case 'RESET':
      return {
        ...initialState,
      }
    default:
      return state
  }
}
interface ContextProps {
  state: StateProps
  dispatch: React.Dispatch<DispatchProps>
}
const ClaimContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
})

export const ConnectProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(connectReducer, initialState)

  return (
    <ClaimContext.Provider value={{ state, dispatch }}>
      {children}
    </ClaimContext.Provider>
  )
}

export const useConnect = (): ContextProps => {
  const context = useContext(ClaimContext)
  if (!context) {
    throw new Error('useConnect must be used within an ConnectProvider')
  }
  return context
}
