# Changelog

All notable changes to `axios-react-hook` v1 are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

> **This is the v1 branch** — maintained for critical bug fixes only.
> New features are on [`main`](https://github.com/devmdrd/axios-react-hook) (V2).

---

## [1.0.0] — 2025-01-01

Initial release.

### Added
- `useAxios(url, method, body, auto, instance)` — positional-argument hook
- Auto-fetch on mount and on URL change when `auto=true`
- Manual trigger via the returned `refetch()` function
- Custom axios instance support via the `instance` argument
- Returns `{ data, loading, error, refetch }`
