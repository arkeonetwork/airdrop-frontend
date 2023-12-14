import { useState, useEffect } from 'react';

export const useClaim = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Start loading
        setIsLoading(true);
        // Make the API call
        const response = await fetch("apiUrl");
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        // Parse the JSON data
        const result = await response.json();
        // Set the data
        setData(result);
      } catch (error) {
        // Set the error if an exception occurs
        setError(error);
      } finally {
        // Stop loading, whether the call was successful or not
        setIsLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Re-run the effect when the apiUrl changes

  // Return the data, loading status, and error
  return { data, isLoading, error };
};
