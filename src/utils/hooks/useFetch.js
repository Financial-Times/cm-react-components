import { useState, useEffect } from 'react';
import { BASE_URL } from '../constants';

export const useFetch = (initialEndpoint, initialOptions = {}, initialSkip = false) => {
  const [endpoint, updateEndpoint] = useState(initialEndpoint);
  const [options, setOptions] = useState(initialOptions);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [skip, setSkip] = useState(initialSkip);
  const [reFetchIndex, setReFetchIndex] = useState(0);

  const onError = () => {
    setHasError(true);
  };

  const reFetch = () => setReFetchIndex(prevReFetchIndex => prevReFetchIndex + 1);

  useEffect(() => {
    const fetchData = async () => {
      if (skip) {
        return;
      }

      setIsLoading(true);

      try {
        const requestOptions = {
          ...options,
          headers: {
            ...options.headers
          }
        };

        const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);

        if (response.ok) {
          setIsSuccessful(true);
          const result = await response.json();
          setData(result);
        } else {
          onError();
        }
      } catch (error) {
        onError();
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [endpoint, reFetchIndex, JSON.stringify(options)]);

  return {
    data,
    setData,
    isLoading,
    hasError,
    updateEndpoint,
    setOptions,
    setSkip,
    reFetch,
    isSuccessful,
    setIsSuccessful
  };
};
