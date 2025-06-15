import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAxios(
  url,
  method = 'get',
  body = null,
  auto = true,
  instance = axios
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState(null);

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
  }, [url]);

  return { data, loading, error, refetch: fetch };
}
