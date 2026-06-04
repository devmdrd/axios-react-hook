import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

/**
 * useAxios v2
 *
 * An improved React hook for HTTP requests with object-based config,
 * automatic request cancellation, per-request headers/params/timeout,
 * and success/error callbacks.
 *
 * @param {object}        options
 * @param {string}        options.url                - The request URL (required)
 * @param {string}        [options.method='get']     - HTTP method: get | post | put | patch | delete
 * @param {any}           [options.body=null]        - Request body / payload (POST, PUT, PATCH, DELETE)
 * @param {object}        [options.params=null]      - URL query parameters e.g. { page: 1, limit: 10 }
 * @param {object}        [options.headers=null]     - Per-request headers merged on top of instance defaults
 * @param {number}        [options.timeout=0]        - Request timeout in milliseconds (0 = no timeout)
 * @param {boolean}       [options.auto=true]        - When true, fires on mount and whenever config changes
 * @param {AxiosInstance} [options.instance=axios]   - Custom axios instance (e.g. with interceptors or base URL)
 * @param {Function}      [options.onSuccess]        - Called with (data, response) on a successful request
 * @param {Function}      [options.onError]          - Called with (error) when the request fails
 *
 * @returns {{ data: any, loading: boolean, error: Error|null, status: number|null, refetch: Function, cancel: Function }}
 *
 * @example
 * // Auto GET on mount
 * const { data, loading, error, status } = useAxios({
 *   url: 'https://api.example.com/posts',
 * });
 *
 * @example
 * // GET with query params
 * const { data } = useAxios({
 *   url: 'https://api.example.com/posts',
 *   params: { userId: 1, _limit: 5 },
 * });
 *
 * @example
 * // Manual POST with callbacks
 * const { refetch } = useAxios({
 *   url: 'https://api.example.com/posts',
 *   method: 'post',
 *   body: { title: 'Hello', body: 'World' },
 *   auto: false,
 *   onSuccess: (data) => console.log('Created:', data),
 *   onError:   (err)  => console.error('Failed:', err.message),
 * });
 */
export default function useAxios(options = {}) {
  const {
    url,
    method    = 'get',
    body      = null,
    params    = null,
    headers   = null,
    timeout   = 0,
    auto      = true,
    instance  = axios,
    onSuccess = null,
    onError   = null,
  } = options;

  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(auto && !!url);
  const [error,   setError]   = useState(null);
  const [status,  setStatus]  = useState(null);

  const abortRef = useRef(null);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const fetch = useCallback(async () => {
    if (!url) return;

    cancel();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    const config = {
      url,
      method: method.toLowerCase(),
      signal: controller.signal,
    };
    if (params)      config.params   = params;
    if (body)        config.data     = body;
    if (headers)     config.headers  = headers;
    if (timeout > 0) config.timeout  = timeout;

    try {
      const res = await instance.request(config);
      setData(res.data);
      setStatus(res.status);
      onSuccess?.(res.data, res);
    } catch (err) {
      if (err.name === 'CanceledError' || err.name === 'AbortError') return;
      setError(err);
      setStatus(err.response?.status ?? null);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, params, headers, timeout, instance, onSuccess, onError, cancel]);

  useEffect(() => {
    if (!url || !auto) return;
    fetch();
    return () => cancel();
  }, [fetch]); // eslint-disable-line

  return { data, loading, error, status, refetch: fetch, cancel };
}
