# axios-react-hook

A simple and customizable React hook for making HTTP requests using Axios.

## Features

- ✅ Supports GET, POST, PUT, DELETE, PATCH, etc.
- ✅ Auto and manual fetching
- ✅ Refetch support
- ✅ Pass your own Axios instance

## Installation

```bash
npm install axios-react-hook
```

## Usage

```js
import useAxios from 'axios-react-hook';
import axiosInstance from './axiosInstance'; // Optional custom instance

const { data, loading, error, refetch } = useAxios(
  'https://jsonplaceholder.typicode.com/posts',
  'get',
  null,
  true,
  axiosInstance
);
```

## API

### Parameters

| Param         | Type     | Default | Description                            |
|---------------|----------|---------|----------------------------------------|
| `url`         | `string` | —       | Request URL                            |
| `method`      | `string` | `'get'` | HTTP method                            |
| `data`        | `object` | `null`  | Request payload or query params        |
| `auto`        | `boolean`| `true`  | Auto execute request on mount          |
| `instance`    | `AxiosInstance` | `axios` | Custom Axios instance (optional) |

## License

MIT
