import { useState, useEffect, useCallback } from 'react';

/**
 * Generic data-fetching hook.
 * @param {Function} apiFn  - async function that returns data
 * @param {*}        fallback - value to use when API fails or returns nothing
 * @param {Array}    deps    - dependency array (re-fetch when these change)
 */
const useApi = (apiFn, fallback, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn();
      setData(result ?? fallback);
    } catch (err) {
      setError(err);
      setData(fallback);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data: data ?? fallback, loading, error, refetch: fetch };
};

export default useApi;
