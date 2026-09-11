import { useCallback, useEffect, useState } from "react";

const useFetch = (fetchFunction, options = {}) => {
  const {
    immediate = true,
    initialData = null,
  } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFunction(...args);

        setData(result);

        return result;
      } catch (err) {
        const errorMessage =
          err?.response?.data?.detail ||
          err?.message ||
          "Something went wrong while fetching data.";

        setError(errorMessage);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction]
  );

  useEffect(() => {
    if (!immediate) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFunction();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage =
            err?.response?.data?.detail ||
            err?.message ||
            "Something went wrong while fetching data.";

          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFunction, immediate]);

  const refetch = useCallback(
    (...args) => {
      return execute(...args);
    },
    [execute]
  );

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setLoading(false);
  }, [initialData]);

  return {
    data,
    loading,
    error,
    refetch,
    execute,
    reset,
  };
};

export default useFetch;