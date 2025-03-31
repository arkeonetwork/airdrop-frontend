import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { Keplr } from '@keplr-wallet/provider-extension'

interface KeplrContextType {
  keplr: Keplr | null
  isKeplrAvailable: boolean
}

const KeplrContext = createContext<KeplrContextType>({
  keplr: null,
  isKeplrAvailable: false,
})

export const KeplrProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [keplrInstance, setKeplrInstance] = useState<Keplr | null>(null)
  const [isKeplrAvailable, setIsKeplrAvailable] = useState(false)

  useEffect(() => {

    const initKeplr = () => {
      let keplrToUse = window.keplr

      if (window.keplr?.version === '0.0.1' && window.ctrlKeplrProviders) {
        keplrToUse = window.ctrlKeplrProviders.Keplr
      }

      setKeplrInstance(new Keplr())
      setIsKeplrAvailable(!!Keplr)
    }

    initKeplr()

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


