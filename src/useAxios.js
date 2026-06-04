import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * useAxios
 *
 * A lightweight React hook for making HTTP requests with axios.
 * Accepts positional arguments and returns reactive state.
 *
 * @param {string}        url              - The request URL (required)
 * @param {string}        [method='get']   - HTTP method: get | post | put | patch | delete
 * @param {any}           [body=null]      - Request body / payload sent with the request
 * @param {boolean}       [auto=true]      - When true, fires the request on mount and on URL change
 * @param {AxiosInstance} [instance=axios] - Custom axios instance (e.g. with interceptors or base URL)
 *
 * @returns {{ data: any, loading: boolean, error: Error|null, refetch: Function }}
 *
 * @example
 * // Auto GET on mount
 * const { data, loading, error } = useAxios('https://api.example.com/posts');
 *
 * @example
 * // Manual POST trigger
 * const { data, loading, error, refetch } = useAxios(
 *   'https://api.example.com/posts',
 *   'post',
 *   { title: 'Hello', body: 'World' },
 *   false
 * );
 */
export default function useAxios(
  url,
  method = 'get',
  body = null,
  auto = true,
  instance = axios
) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(auto);
  const [error,   setError]   = useState(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await instance[method](url, body);
      setData(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auto) fetch();
  }, [url]); // eslint-disable-line

  return { data, loading, error, refetch: fetch };
}
