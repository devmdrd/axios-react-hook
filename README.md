# axios-react-hook

A simple and customizable React hook for making HTTP requests using Axios.

[![npm](https://img.shields.io/npm/v/axios-react-hook/v1)](https://www.npmjs.com/package/axios-react-hook)
[![license](https://img.shields.io/npm/l/axios-react-hook)](./LICENSE)

> **You are on the v1 branch.**
> For the latest version (V2 — object config, cancellation, params, callbacks) see the [`main` branch](https://github.com/devmdrd/axios-react-hook).

---

## Features

- ✅ Supports GET, POST, PUT, DELETE, PATCH and more
- ✅ Auto-fetch on mount and on URL change
- ✅ Manual trigger via `refetch()`
- ✅ Pass your own Axios instance

---

## Installation

```bash
# Latest (V2)
npm install axios-react-hook

# Pin to V1
npm install axios-react-hook@1
```

---

## Quick Start

```js
import useAxios from 'axios-react-hook';

function Posts() {
  const { data, loading, error } = useAxios(
    'https://jsonplaceholder.typicode.com/posts'
  );

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
```

---

## API

### Parameters

| Parameter  | Type            | Default  | Description                                          |
|------------|-----------------|----------|------------------------------------------------------|
| `url`      | `string`        | —        | Request URL *(required)*                             |
| `method`   | `string`        | `'get'`  | HTTP method: `get` `post` `put` `patch` `delete`     |
| `body`     | `any`           | `null`   | Request body / payload                               |
| `auto`     | `boolean`       | `true`   | Auto-fire on mount and URL change                    |
| `instance` | `AxiosInstance` | `axios`  | Custom axios instance                                |

### Return value

| Key       | Type       | Description                          |
|-----------|------------|--------------------------------------|
| `data`    | `any`      | Response payload                     |
| `loading` | `boolean`  | `true` while a request is in flight  |
| `error`   | `Error`    | Error from the last failed request   |
| `refetch` | `Function` | Manually trigger the request         |

---

## Examples

### POST request

```js
import useAxios from 'axios-react-hook';

function CreatePost() {
  const { data, loading, error, refetch } = useAxios(
    'https://jsonplaceholder.typicode.com/posts',
    'post',
    { title: 'Hello', body: 'World', userId: 1 },
    false
  );

  return (
    <div>
      <button onClick={refetch} disabled={loading}>
        {loading ? 'Creating…' : 'Create Post'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data  && <p>Created ID: {data.id}</p>}
    </div>
  );
}
```

### Custom Axios instance

```js
import axios    from 'axios';
import useAxios from 'axios-react-hook';

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: { Authorization: `Bearer ${token}` },
});

function Profile() {
  const { data, loading } = useAxios('/me', 'get', null, true, api);

  if (loading) return <p>Loading…</p>;
  return <p>Hello, {data?.name}</p>;
}
```

---

## Upgrading to V2

```bash
npm install axios-react-hook@latest
```

```js
// V1
import useAxios from 'axios-react-hook';
const { data, loading, error, refetch } = useAxios(url, method, body, auto, instance);

// V2
import useAxios from 'axios-react-hook';
const { data, loading, error, status, refetch, cancel } = useAxios({
  url, method, body, auto, instance,
});
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

---

## License

MIT © [Muhammed Rashid](https://github.com/devmdrd)
