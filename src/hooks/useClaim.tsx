import axios from 'axios'
import { useState, useEffect } from 'react'

const arkeoEndpoint = import.meta.env.VITE_ARKEO_ENDPOINT

type UseClaim = {
  path: string
  address: string
  chain: number
}

export const useClaim = ({ path, address, chain }: UseClaim) => {
  const [claimRecord, setClaimRecord] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | unknown>(null)

  const fetchData = async () => {
    try {
      console.info('Fetching data', arkeoEndpoint)
      setIsLoading(true)
      const params = { chain }
      const url = arkeoEndpoint + path + '/' + address
      const response = await axios
        .get(url, { params })
        .then((res) => res.data())
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const result = await response.json()
      setClaimRecord(result)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [arkeoEndpoint, address])

  return { claimRecord, isLoading, error }
}
