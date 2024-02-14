import { createContext, useContext, useReducer } from 'react'

interface Info {
  amount: number
  account?: string
}
interface StateProps {
  step: number
  totalClaimAmount: number
  totalDelegateAmount: number
  totalVoteAmount: number
  cosmosInfo: Info
  arkeoInfo: Info
  ethInfo: Info & { signature?: string }
}

interface ClaimRecord {
  amountClaim: number
  amountDelegate: number
  amountVote: number
}

type DispatchProps =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_COSMOS_ACCOUNT'; payload: string | undefined }
  | { type: 'SET_COSMOS_AMOUNT'; payload: number }
  | { type: 'SET_ARKEO_ACCOUNT'; payload: string }
  | { type: 'SET_ARKEO_AMOUNT'; payload: number }
  | { type: 'SET_ETH_ACCOUNT'; payload: string }
  | { type: 'SET_ETH_AMOUNT'; payload: number }
  | { type: 'SET_ETH_SIGNATURE'; payload: string | undefined }
  | { type: 'RESET_ETH'; payload?: undefined }
  | { type: 'ADD_TOTAL_AMOUNTS'; payload: ClaimRecord }
  | { type: 'SUB_TOTAL_AMOUNTS'; payload: ClaimRecord }
  | { type: 'RESET'; payload?: undefined }

const initialState = {
  step: 1,
  totalClaimAmount: 0,
  totalDelegateAmount: 0,
  totalVoteAmount: 0,
  cosmosInfo: { amount: 0 },
  arkeoInfo: { amount: 0 },
  ethInfo: { amount: 0 },
}

const connectReducer = (state: StateProps, action: DispatchProps) => {
  const { type, payload } = action
  switch (type) {
    case 'SET_STEP':
      return {
        ...state,
        step: payload,
      }
    case 'SET_COSMOS_ACCOUNT':
      return {
        ...state,
        cosmosInfo: {
          ...state.cosmosInfo,
          account: payload,
        },
      }
    case 'SET_COSMOS_AMOUNT':
      return {
        ...state,
        cosmosInfo: {
          ...state.cosmosInfo,
          amount: payload,
        },
      }
    case 'SET_ARKEO_ACCOUNT':
      return {
        ...state,
        arkeoInfo: {
          ...state.arkeoInfo,
          account: payload,
        },
      }
    case 'SET_ARKEO_AMOUNT':
      return {
        ...state,
        arkeoInfo: {
          ...state.arkeoInfo,
          amount: payload,
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
          amount: payload,
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
        ethInfo: {
          amount: 0,
        },
      }
    case 'ADD_TOTAL_AMOUNTS':
      return {
        ...state,
        totalClaimAmount: (state.totalClaimAmount += payload?.amountClaim),
        totalDelegateAmount: (state.totalDelegateAmount +=
          payload?.amountDelegate),
        totalVoteAmount: (state.totalVoteAmount += payload?.amountVote),
      }
    case 'SUB_TOTAL_AMOUNTS':
      return {
        ...state,
        totalClaimAmount: (state.totalClaimAmount -= payload.amountClaim),
        totalDelegateAmount: (state.totalDelegateAmount -=
          payload.amountDelegate),
        totalVoteAmount: (state.totalVoteAmount -= payload.amountVote),
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
