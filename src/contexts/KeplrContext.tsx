import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { Keplr } from '@keplr-wallet/provider-extension'

// Define the context type
interface KeplrContextType {
  keplr: any // Replace with proper Keplr type if available
  isKeplrAvailable: boolean
}

// Create the context with a default value
const KeplrContext = createContext<KeplrContextType>({
  keplr: null,
  isKeplrAvailable: false,
})

// Provider component
export const KeplrProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [keplrInstance, setKeplrInstance] = useState<any>(null)
  const [isKeplrAvailable, setIsKeplrAvailable] = useState(false)

  useEffect(() => {
    // Initialize Keplr
    const initKeplr = () => {
      let keplrToUse = window.keplr

      // Apply override if needed
      if (window.keplr?.version === '0.0.1' && window.ctrlKeplrProviders) {
        console.log('Overriding Keplr with Ctrl Keplr')
        keplrToUse = window.ctrlKeplrProviders.Keplr
      }

      setKeplrInstance(new Keplr())
      setIsKeplrAvailable(!!Keplr)
    }

    initKeplr()

    // Optional: Listen for Keplr changes
    const handleKeplrChange = () => {
      console.log('Keplr availability changed')
      initKeplr()
    }

    window.addEventListener('keplr_keystorechange', handleKeplrChange)

    return () => {
      window.removeEventListener('keplr_keystorechange', handleKeplrChange)
    }
  }, [])

  return (
    <KeplrContext.Provider value={{ keplr: keplrInstance, isKeplrAvailable }}>
      {children}
    </KeplrContext.Provider>
  )
}

// Custom hook for using the Keplr context
export const useKeplr = () => useContext(KeplrContext)


