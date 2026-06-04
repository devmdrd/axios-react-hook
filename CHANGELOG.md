# Changelog

All notable changes to `axios-react-hook` are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.0.0] — 2026-06-03

**V2 is built on top of V1** and is now the default export. All V1 behaviour is
preserved. V2 switches to an object-based config API and adds cancellation,
query params, per-request headers, HTTP status codes, and callbacks.

Existing `^1.0.0` users are unaffected — npm never auto-upgrades across majors.

### Added (on top of V1)

- Object-based config — `useAxios({ url, method, body, auto, instance, ... })`
- `params` — URL query parameters serialised automatically
- `headers` — per-request headers merged on top of instance defaults
- `timeout` — per-request timeout in milliseconds
- `onSuccess(data, response)` — success callback
- `onError(error)` — error callback
- `AbortController` cancellation — auto-cancels on config change or unmount
- `status` — HTTP status code exposed in the return value
- `cancel()` — manually abort the in-flight request
- JSDoc annotations on the hook

### Changed

- Default import resolves to V2
- `peerDependencies` declares `react >= 16.8.0`

### Migration

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

## [1.0.0] — 2025-01-01

Initial release.

### Added

- `useAxios(url, method, body, auto, instance)` — positional-argument hook
- Auto-fetch on mount and on URL change when `auto = true`
- Manual trigger via the returned `refetch()` function
- Custom axios instance support via the `instance` argument
- Returns `{ data, loading, error, refetch }`
