# axios-react-hook

A lightweight React hook for Axios-based API calls with support for all HTTP methods.

[![npm](https://img.shields.io/npm/v/axios-react-hook)](https://www.npmjs.com/package/axios-react-hook)
[![license](https://img.shields.io/npm/l/axios-react-hook)](./LICENSE)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/devmdrd/axios-react-hook/tree/playground)

> **v2.0.0** — V2 is now the default import. V2 is built on top of V1 — all V1
> behaviour is preserved and the positional-arg API remains available via the
> published V1 package (`npm install axios-react-hook@1`).
> Existing `^1.0.0` users are **not affected** — npm never auto-upgrades across major versions.

---

## V1 vs V2 at a glance

| | V1 | V2 |
|---|---|---|
| Install | `npm install axios-react-hook@1` | `npm install axios-react-hook` |
| Import | `import useAxios from 'axios-react-hook'` | `import useAxios from 'axios-react-hook'` |
| Config | Positional args | Object config |
| Returns | `data, loading, error, refetch` | `data, loading, error, status, refetch, cancel` |
| Query params | ✗ | `params` |
| Per-request headers | ✗ | `headers` |
| Timeout | ✗ | `timeout` |
| Callbacks | ✗ | `onSuccess`, `onError` |
| Cancellation | ✗ | `AbortController` — auto + manual |
| Status code | ✗ | `status` |

---

## Installation

```bash
# V2 (latest)
npm install axios-react-hook

# V1 (pin to old major)
npm install axios-react-hook@1
```

---

## Quick Start

### V2 (default)

```js
import useAxios from 'axios-react-hook';

function Posts() {
  const { data, loading, error, status } = useAxios({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: { _limit: 10 },
  });

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>{status} — {error.message}</p>;

  return (
    <ul>
      {data.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
```

### V1

```js
import useAxios from 'axios-react-hook'; // npm install axios-react-hook@1

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

## Features

### V2

- ✅ Object-based config — readable, no positional-arg juggling
- ✅ Query `params` serialised into the URL automatically
- ✅ Per-request `headers` and `timeout`
- ✅ `onSuccess` / `onError` callbacks
- ✅ `AbortController` cancellation — prevents race conditions and unmount warnings
- ✅ HTTP `status` code in return value
- ✅ `cancel()` to abort in-flight requests manually
- ✅ Auto-fetch on mount, manual trigger via `refetch()`
- ✅ Supports GET, POST, PUT, PATCH, DELETE and more
- ✅ Pass your own Axios instance

### V1

- ✅ Positional-argument API — `useAxios(url, method, body, auto, instance)`
- ✅ Auto-fetch on mount and on URL change
- ✅ Manual trigger via `refetch()`
- ✅ Custom Axios instance support

---

## API Reference

### V2 Options

| Option      | Type            | Default  | Description                                             |
|-------------|-----------------|----------|---------------------------------------------------------|
| `url`       | `string`        | —        | Request URL *(required)*                                |
| `method`    | `string`        | `'get'`  | HTTP method: `get` `post` `put` `patch` `delete`        |
| `body`      | `any`           | `null`   | Request body (POST / PUT / PATCH / DELETE)              |
| `params`    | `object`        | `null`   | URL query parameters e.g. `{ page: 1, limit: 10 }`     |
| `headers`   | `object`        | `null`   | Per-request headers                                     |
| `timeout`   | `number`        | `0`      | Request timeout in ms (`0` = no timeout)                |
| `auto`      | `boolean`       | `true`   | Auto-fire on mount and whenever config changes          |
| `instance`  | `AxiosInstance` | `axios`  | Custom axios instance                                   |
| `onSuccess` | `Function`      | `null`   | Called with `(data, response)` on success               |
| `onError`   | `Function`      | `null`   | Called with `(error)` on failure                        |

### V2 Return value

| Key       | Type       | Description                                  |
|-----------|------------|----------------------------------------------|
| `data`    | `any`      | Response payload                             |
| `loading` | `boolean`  | `true` while a request is in flight          |
| `error`   | `Error`    | Error from the last failed request           |
| `status`  | `number`   | HTTP status code (`200`, `404`, …) or `null` |
| `refetch` | `Function` | Manually trigger the request                 |
| `cancel`  | `Function` | Cancel the currently in-flight request       |

### V1 Parameters

| Parameter  | Type            | Default  | Description                                    |
|------------|-----------------|----------|------------------------------------------------|
| `url`      | `string`        | —        | Request URL *(required)*                       |
| `method`   | `string`        | `'get'`  | HTTP method                                    |
| `body`     | `any`           | `null`   | Request body / payload                         |
| `auto`     | `boolean`       | `true`   | Auto-fire on mount and URL change              |
| `instance` | `AxiosInstance` | `axios`  | Custom axios instance                          |

### V1 Return value

| Key       | Type       | Description                          |
|-----------|------------|--------------------------------------|
| `data`    | `any`      | Response payload                     |
| `loading` | `boolean`  | `true` while a request is in flight  |
| `error`   | `Error`    | Error from the last failed request   |
| `refetch` | `Function` | Manually trigger the request         |

---

## Migrating V1 → V2

```js
// Before (V1)
import useAxios from 'axios-react-hook'; // @1
const { data, loading, error, refetch } = useAxios(
  url, method, body, auto, instance
);

// After (V2)
import useAxios from 'axios-react-hook'; // @latest
const { data, loading, error, status, refetch, cancel } = useAxios({
  url, method, body, auto, instance,
});
```

---

## Examples

### POST request (V2)

```js
import useAxios from 'axios-react-hook';

function CreatePost() {
  const { data, loading, error, status, refetch } = useAxios({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'post',
    body: { title: 'Hello', body: 'World', userId: 1 },
    auto: false,
    onSuccess: data => console.log('Created:', data),
  });

  return (
    <div>
      <button onClick={refetch} disabled={loading}>
        {loading ? 'Creating…' : 'Create Post'}
      </button>
      {error && <p>{status} — {error.message}</p>}
      {data  && <p>Created ID: {data.id}</p>}
    </div>
  );
}
```

### Custom Axios instance (V2)

```js
import axios    from 'axios';
import useAxios from 'axios-react-hook';

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: { Authorization: `Bearer ${token}` },
});

function Profile() {
  const { data, loading, status } = useAxios({ url: '/me', instance: api });

  if (loading) return <p>Loading…</p>;
  return <p>Hello, {data?.name}</p>;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

---

## License

MIT © [Muhammed Rashid](https://github.com/devmdrd)
