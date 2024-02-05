import { createContext, useContext, useReducer } from 'react'

interface StateProps {
  step: number
  totalAmount: number
  claimAmount: number
  delegateAmount: number
  voteAmount: number
  cosmosAccount?: string
  arkeoAccount?: string
  ethAccount?: string
}

export interface DispatchProps {
  type: string
  payload: any
}

export const initialState = {
  step: 1,
  totalAmount: 0,
  claimAmount: 0,
  delegateAmount: 0,
  voteAmount: 0,
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
        cosmosAccount: payload,
      }
    case 'SET_ARKEO_ACCOUNT':
      return {
        ...state,
        arkeoAccount: payload,
      }
    case 'SET_ETH_ACCOUNT':
      return {
        ...state,
        ethAccount: payload,
      }
    case 'ADD_TOTAL_AMOUNTS':
      return {
        ...state,
        totalClaimAmount: state.claimAmount += payload.claimAmount,
        totalDelegateAmount: state.delegateAmount += payload.delegateAmount,
        totalVoteAmount: state.voteAmount += payload.voteAmount,
      }
    case 'SUB_TOTAL_AMOUNTS':
      return {
        ...state,
        totalClaimAmount: state.claimAmount -= payload.claimAmount,
        totalDelegateAmount: state.delegateAmount -= payload.delegateAmount,
        totalVoteAmount: state.voteAmount -= payload.voteAmount,
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
